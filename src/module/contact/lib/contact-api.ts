import "server-only";

import { cache } from "react";

import type { Locale } from "@/i18n/routing";
import type {
  ContactDetail,
  ContactDetailIcon,
  CompanyLocationCoordinates,
  InboxSubject,
  PublicSiteSettings,
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
  company_name: string | null;
  company_location_lat: number | null;
  company_location_long: number | null;
  company_phone_number: string | null;
  company_whatsapp_number: string | null;
  danantara_logo_filepath: string | null;
  main_email: string | null;
  marketing_email: string | null;
  operational_day: string | null;
  operational_end_time: string | null;
  operational_start_time: string | null;
  pln_logo_filepath: string | null;
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

function getEmailValue(value: string | null | undefined) {
  const email = getSettingValue(value);

  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function getInternationalPhoneDigits(value: string | null) {
  if (!value) {
    return null;
  }

  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return null;
  }

  let internationalDigits: string;

  if (digits.startsWith("0")) {
    internationalDigits = `62${digits.slice(1)}`;
  } else if (digits.startsWith("62") || value.trim().startsWith("+")) {
    internationalDigits = digits;
  } else if (digits.startsWith("8")) {
    internationalDigits = `62${digits}`;
  } else {
    return null;
  }

  return /^\d{8,15}$/.test(internationalDigits) ? internationalDigits : null;
}

function getSocialUrl(platformName: string, value: string) {
  try {
    const url = new URL(value);

    if (
      ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    ) {
      return url.toString();
    }
  } catch {
    // Account names are supported for known platforms below.
  }

  const platform = platformName.toLowerCase().replace(/[^a-z]/g, "");
  const account = value
    .trim()
    .replace(/^@/, "")
    .replace(/^\/+|\/+$/g, "");

  if (!account || /\s/.test(account)) {
    return null;
  }

  const encodedAccount = account
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  switch (platform) {
    case "facebook":
      return `https://www.facebook.com/${encodedAccount}`;
    case "instagram":
      return `https://www.instagram.com/${encodedAccount}`;
    case "linkedin":
      return `https://www.linkedin.com/${/^(company|in|school)\//i.test(account) ? encodedAccount : `company/${encodedAccount}`}`;
    case "twitter":
    case "x":
      return `https://x.com/${encodedAccount}`;
    case "youtube":
      return `https://www.youtube.com/${/^(channel|c|user)\//i.test(account) ? encodedAccount : `@${encodedAccount}`}`;
    default:
      return null;
  }
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

function mapSiteSettings(settings: ApiSiteSettings): PublicSiteSettings | null {
  const companyName = getSettingValue(settings.company_name);
  const address = getSettingValue(settings.company_address);
  const danantaraLogoPath = getSettingValue(settings.danantara_logo_filepath);
  const danantaraLogoUrl = danantaraLogoPath
    ? resolveApiAssetUrl(danantaraLogoPath)
    : null;
  const mapCoordinates = getLocationCoordinates(
    settings.company_location_lat,
    settings.company_location_long,
  );
  const phone = getSettingValue(settings.company_phone_number);
  const whatsapp = getSettingValue(settings.company_whatsapp_number);
  const phoneDigits = getInternationalPhoneDigits(phone);
  const whatsappDigits = getInternationalPhoneDigits(whatsapp);
  const mainEmail = getEmailValue(settings.main_email);
  const marketingEmail = getEmailValue(settings.marketing_email);
  const emailAddresses = [...new Set([mainEmail, marketingEmail])].filter(
    (email): email is string => email !== null,
  );
  const primaryEmail = marketingEmail ?? mainEmail;
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
    createDetail("email", "EMAIL", emailAddresses),
    createDetail("hours", "OFFICE HOURS", [operatingHours || null]),
  ].filter((detail): detail is ContactDetail => detail !== null);

  const plnLogoPath = getSettingValue(settings.pln_logo_filepath);
  const plnLogoUrl = plnLogoPath ? resolveApiAssetUrl(plnLogoPath) : null;

  const socialLinks = (settings.social_medias ?? [])
    .filter((social) => social.status === "PUBLISHED")
    .sort((left, right) => left.sort_order - right.sort_order)
    .flatMap((social) => {
      const label = getSettingValue(social.platform_name);
      const value = getSettingValue(social.platform_url_or_account_name);

      if (!label || !value) {
        return [];
      }

      const href = getSocialUrl(label, value);

      if (!href) {
        return [];
      }

      const iconPath = getSettingValue(social.icon_filepath);

      return [
        {
          id: social.id,
          iconUrl: iconPath ? resolveApiAssetUrl(iconPath) : null,
          label,
          href,
        },
      ];
    });

  if (
    companyName === null &&
    address === null &&
    danantaraLogoUrl === null &&
    phone === null &&
    plnLogoUrl === null &&
    whatsapp === null &&
    emailAddresses.length === 0 &&
    details.length === 0 &&
    socialLinks.length === 0 &&
    mapCoordinates === null
  ) {
    return null;
  }

  return {
    address,
    companyName,
    danantaraLogoUrl,
    details,
    emailAddresses,
    mapCoordinates,
    mapLabel: address,
    phone,
    phoneHref: phoneDigits ? `tel:+${phoneDigits}` : null,
    plnLogoUrl,
    primaryEmail,
    socialLinks,
    whatsappHref: whatsappDigits ? `https://wa.me/${whatsappDigits}` : null,
  };
}

export const getPublicSiteSettings = cache(async (locale: Locale) => {
  const response = await apiGet<ApiSiteSettingsResponse>("/site_settings", {
    language_id: locale,
  });

  return mapSiteSettings(response.site_settings);
});

export async function getInboxSubjects(): Promise<InboxSubject[]> {
  const response = await apiGet<ApiInboxSubjectsResponse>("/inbox-subjects");

  return response.inbox_subjects;
}
