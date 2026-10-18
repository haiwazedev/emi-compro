export function getCopyKey(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
  let hash = 2166136261;

  for (const character of value) {
    hash = Math.imul(hash ^ character.codePointAt(0)!, 16777619);
  }

  return `${slug}_${(hash >>> 0).toString(36)}`;
}
