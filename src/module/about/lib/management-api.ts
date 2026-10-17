import "server-only";

import { apiGet, resolveApiAssetUrl } from "@/shared/lib/api-client";

type ApiBoardMemberType = {
  id: number;
  type: string;
};

type ApiBoardMember = {
  board_member_type_id: number;
  id: number;
  name: string;
  photo: string | null;
  role: string;
};

type ApiBoardMemberTypesResponse = {
  board_member_types: ApiBoardMemberType[];
};

type ApiBoardMembersResponse = {
  board_members: ApiBoardMember[];
};

export type ManagementMember = {
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

export async function getManagementData(): Promise<ManagementData> {
  const [typesResponse, membersResponse] = await Promise.all([
    apiGet<ApiBoardMemberTypesResponse>("/board_member_types"),
    apiGet<ApiBoardMembersResponse>("/board_members"),
  ]);
  const membersByType = new Map<number, ManagementMember[]>();

  for (const member of membersResponse.board_members) {
    const members = membersByType.get(member.board_member_type_id) ?? [];
    members.push({
      id: member.id,
      imageUrl: member.photo ? resolveApiAssetUrl(member.photo) : null,
      name: member.name,
      role: member.role,
    });
    membersByType.set(member.board_member_type_id, members);
  }

  return {
    types: typesResponse.board_member_types.map((type) => ({
      ...type,
      members: membersByType.get(type.id) ?? [],
    })),
  };
}
