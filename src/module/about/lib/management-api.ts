import "server-only";

import type { Locale } from "@/i18n/routing";
import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";

type ApiBoardMemberType = {
  id: number;
  language_id: string;
  type: string;
};

type ApiBoardMemberContent = {
  board_member_type_id: number;
  description: string | null;
  language_id: string;
  role: string;
};

type ApiBoardMember = {
  company_name: string | null;
  contents: ApiBoardMemberContent[];
  id: number;
  name: string;
  photo: string | null;
};

type ApiBoardMemberTypesResponse = {
  board_member_types: ApiBoardMemberType[];
};

type ApiBoardMembersResponse = {
  board_members: ApiBoardMember[];
};

export type ManagementMember = {
  companyName: string | null;
  description: string | null;
  id: number;
  imageUrl: string | null;
  name: string;
  role: string;
};

export type ManagementBoardType = {
  id: number;
  members: ManagementMember[];
  type: string;
};

export type ManagementData = {
  types: ManagementBoardType[];
};

export async function getManagementData(
  locale: Locale,
): Promise<ManagementData> {
  const [typesResponse, membersResponse] = await Promise.all([
    apiGet<ApiBoardMemberTypesResponse>("/board_member_types"),
    apiGet<ApiBoardMembersResponse>("/board_members"),
  ]);
  const localizedTypes = typesResponse.board_member_types.filter(
    (type) => type.language_id === locale,
  );
  const membersByType = new Map<number, ManagementMember[]>();

  for (const member of membersResponse.board_members) {
    const content = member.contents.find((item) => item.language_id === locale);

    if (!content) {
      continue;
    }

    const members = membersByType.get(content.board_member_type_id) ?? [];
    members.push({
      companyName: member.company_name?.trim() || null,
      description: content.description?.trim() || null,
      id: member.id,
      imageUrl: member.photo ? resolveApiAssetUrl(member.photo) : null,
      name: member.name,
      role: content.role,
    });
    membersByType.set(content.board_member_type_id, members);
  }

  return {
    types: localizedTypes.map((type) => ({
      id: type.id,
      members: membersByType.get(type.id) ?? [],
      type: type.type,
    })),
  };
}
