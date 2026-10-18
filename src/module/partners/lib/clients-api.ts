import "server-only";

import type { Partner } from "@/module/partners/content/partners";
import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";

type ApiClient = {
  id: number;
  logo_filepath: string;
  logo_metadata: {
    height: number;
    width: number;
  };
  name: string;
};

type ApiClientsResponse = {
  clients: ApiClient[];
};

export async function getPartners(): Promise<Partner[]> {
  const { clients } = await apiGet<ApiClientsResponse>("/clients");

  return clients.map((client) => ({
    id: client.id,
    logoHeight: client.logo_metadata.height,
    logoUrl: resolveApiAssetUrl(client.logo_filepath),
    logoWidth: client.logo_metadata.width,
    name: client.name,
  }));
}
