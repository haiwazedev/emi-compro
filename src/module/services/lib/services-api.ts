import "server-only";

import sanitizeHtml from "sanitize-html";

import type { Locale } from "@/i18n/routing";
import type {
  ServiceDetailImage,
  ServiceDivision,
  ServiceOffering,
} from "@/module/services/content/services";
import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";

type ApiDivisionContent = {
  abbr: string;
  description: string | null;
  language_id: string;
  name: string;
  slug: string;
};

type ApiDivision = {
  contents: ApiDivisionContent[];
  icon_svg: string | null;
  id: number;
  status: "DRAFT" | "PUBLISHED";
};

type ApiDivisionsResponse = {
  divisions: ApiDivision[];
};

type ApiServiceContent = {
  description: string | null;
  language_id: string;
  name: string;
};

type ApiServiceMedia = {
  filename: string;
  path: string;
  type: "PICTURE" | string;
};

type ApiService = {
  contents: ApiServiceContent[];
  division_id: number;
  id: number;
  media?: ApiServiceMedia[];
};

type ApiServicesResponse = {
  services: ApiService[];
};

const iconTones: ServiceDivision["iconTone"][] = [
  "blue",
  "yellow",
  "green",
  "slate",
];
const safeIconColor =
  /^(?:none|currentcolor|transparent|#[\da-f]{3,8}|[a-z]{1,20})$/i;

function getLocalizedContent<T extends { language_id: string }>(
  contents: T[],
  locale: Locale,
) {
  return contents.find((content) => content.language_id === locale);
}

function getDivisionHref(slug: string) {
  return `/services#${encodeURIComponent(slug)}`;
}

function sanitizeDivisionIcon(iconSvg: string | null) {
  if (!iconSvg) {
    return null;
  }

  const sanitizedIcon = sanitizeHtml(iconSvg, {
    allowedAttributes: {
      circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
      ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width"],
      g: ["fill", "stroke", "stroke-width"],
      line: ["x1", "x2", "y1", "y2", "stroke", "stroke-width"],
      path: [
        "d",
        "fill",
        "stroke",
        "stroke-width",
        "stroke-linecap",
        "stroke-linejoin",
      ],
      polygon: ["points", "fill", "stroke", "stroke-width"],
      polyline: ["points", "fill", "stroke", "stroke-width"],
      rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke"],
      svg: [
        "xmlns",
        "viewBox",
        "width",
        "height",
        "fill",
        "stroke",
        "stroke-width",
      ],
    },
    allowedTags: [
      "svg",
      "path",
      "circle",
      "rect",
      "line",
      "polyline",
      "polygon",
      "ellipse",
      "g",
    ],
    allowedSchemes: [],
    parser: {
      lowerCaseAttributeNames: false,
      lowerCaseTags: false,
    },
    transformTags: {
      "*": (tagName, attributes) => {
        for (const attribute of ["fill", "stroke"]) {
          const color = attributes[attribute];

          if (color && !safeIconColor.test(color)) {
            delete attributes[attribute];
          }
        }

        return { attribs: attributes, tagName };
      },
    },
  });

  return /^<svg(?:\s|>)/i.test(sanitizedIcon) &&
    /<(?:path|circle|rect|line|polyline|polygon|ellipse)\b/i.test(sanitizedIcon)
    ? sanitizedIcon
    : null;
}

function mapServiceOffering(
  service: ApiService,
  locale: Locale,
): ServiceOffering | null {
  const content = getLocalizedContent(service.contents, locale);

  if (!content) {
    return null;
  }

  const images: ServiceDetailImage[] = (service.media ?? [])
    .filter((media) => media.type === "PICTURE" && media.path)
    .map((media, index) => ({
      alt: `${content.name} ${index + 1}`,
      src: resolveApiAssetUrl(media.path),
    }));

  return {
    description: content.description?.trim() || null,
    id: service.id,
    images,
    label: content.name,
  };
}

export async function getServiceDivisionFooterLinks(
  locale: Locale,
): Promise<{ href: string; label: string }[]> {
  const { divisions } = await apiGet<ApiDivisionsResponse>("/divisions", {
    status: "PUBLISHED",
  });

  return divisions.flatMap((division) => {
    const content = getLocalizedContent(division.contents, locale);

    return content
      ? [{ href: getDivisionHref(content.slug), label: content.name }]
      : [];
  });
}

export async function getServiceDirectoryData(
  locale: Locale,
): Promise<ServiceDivision[]> {
  const [divisionsResponse, servicesResponse] = await Promise.all([
    apiGet<ApiDivisionsResponse>("/divisions", { status: "PUBLISHED" }),
    apiGet<ApiServicesResponse>("/services"),
  ]);
  const offeringsByDivision = new Map<number, ServiceOffering[]>();

  for (const service of servicesResponse.services) {
    const offering = mapServiceOffering(service, locale);

    if (!offering) {
      continue;
    }

    const offerings = offeringsByDivision.get(service.division_id) ?? [];
    offerings.push(offering);
    offeringsByDivision.set(service.division_id, offerings);
  }

  return divisionsResponse.divisions.flatMap((division) => {
    const content = getLocalizedContent(division.contents, locale);

    if (!content) {
      return [];
    }

    const slug = content.slug;

    return [
      {
        code: content.abbr,
        description: content.description?.trim() || null,
        href: getDivisionHref(slug),
        iconSvg: sanitizeDivisionIcon(division.icon_svg),
        iconTone: iconTones[(division.id - 1) % iconTones.length],
        id: division.id,
        offerings: offeringsByDivision.get(division.id) ?? [],
        slug,
        title: content.name,
      },
    ];
  });
}
