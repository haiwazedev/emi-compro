import "server-only";

import type { Locale } from "@/i18n/routing";
import type {
  ContactDetail,
  ContactDetailIcon,
  ContactPageSettings,
  CompanyLocationCoordinates,
  InboxSubject,
} from "@/module/contact/content/contact";
import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";

type ApiSocialMedia = {
  icon_filepath: string | null;
  id: number;
  platform_name: string;
  platform_url_or_account_name: string;
  sort_order: number;
  status: "DRAFT" | "PUBLISHED";
};

type ApiSiteSettings = {
  company_address: string | null;
  company_location_lat: number | null;
  company_location_long: number | null;
  company_phone_number: string | null;
  company_whatsapp_number: string | null;
  main_email: string | null;
  marketing_email: string | null;
  operational_day: string | null;
  operational_end_time: string | null;
  operational_start_time: string | null;
  social_medias: ApiSocialMedia[];
};

type ApiSiteSettingsResponse = {
  site_settings: ApiSiteSettings;
};

type ApiInboxSubjectsResponse = {
  inbox_subjects: InboxSubject[];
};

function getSettingValue(value: string | null | undefined) {
  const trimmedValue = value?.trim();

  return trimmedValue || null;
}

function createDetail(
  icon: ContactDetailIcon,
  label: string,
  values: (string | null)[],
): ContactDetail | null {
  const value = values
    .filter((item): item is string => item !== null)
    .join("\n");

  if (!value) {
    return null;
  }

  return { icon, label, value };
}

function getLocationCoordinates(
  latitude: number | null,
  longitude: number | null,
): CompanyLocationCoordinates | null {
  if (
    latitude === null ||
    longitude === null ||
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return { latitude, longitude };
}

function mapSiteSettings(
  settings: ApiSiteSettings,
): ContactPageSettings | null {
  const address = getSettingValue(settings.company_address);
  const mapCoordinates = getLocationCoordinates(
    settings.company_location_lat,
    settings.company_location_long,
  );
  const phone = getSettingValue(settings.company_phone_number);
  const whatsapp = getSettingValue(settings.company_whatsapp_number);
  const mainEmail = getSettingValue(settings.main_email);
  const marketingEmail = getSettingValue(settings.marketing_email);
  const operationalDay = getSettingValue(settings.operational_day);
  const startTime = getSettingValue(settings.operational_start_time);
  const endTime = getSettingValue(settings.operational_end_time);
  const operatingHours = [
    operationalDay,
    startTime && endTime ? `${startTime} – ${endTime}` : null,
  ]
    .filter((value): value is string => value !== null)
    .join(", ");

  const details = [
    createDetail("office", "HEAD OFFICE", [address]),
    createDetail("phone", "PHONE / WHATSAPP", [
      phone,
      whatsapp ? `WA ${whatsapp}` : null,
    ]),
    createDetail("email", "EMAIL", [mainEmail, marketingEmail]),
    createDetail("hours", "OFFICE HOURS", [operatingHours || null]),
  ].filter((detail): detail is ContactDetail => detail !== null);

  const socialLinks = (settings.social_medias ?? [])
    .filter((social) => social.status === "PUBLISHED")
    .sort((left, right) => left.sort_order - right.sort_order)
    .flatMap((social) => {
      const label = getSettingValue(social.platform_name);
      const href = getSettingValue(social.platform_url_or_account_name);

      if (!label || !href) {
        return [];
      }

      return [
        {
          id: social.id,
          iconUrl: social.icon_filepath
            ? resolveApiAssetUrl(social.icon_filepath)
            : null,
          label,
          href,
        },
      ];
    });

  if (
    details.length === 0 &&
    socialLinks.length === 0 &&
    mapCoordinates === null
  ) {
    return null;
  }

  return {
    details,
    mapCoordinates,
    mapLabel: address,
    socialLinks,
  };
}

export async function getContactPageSettings(
  locale: Locale,
): Promise<ContactPageSettings | null> {
  const response = await apiGet<ApiSiteSettingsResponse>("/site_settings", {
    language_id: locale,
  });

  return mapSiteSettings(response.site_settings);
}

export async function getInboxSubjects(): Promise<InboxSubject[]> {
  const response = await apiGet<ApiInboxSubjectsResponse>("/inbox-subjects");

  return response.inbox_subjects;
}
