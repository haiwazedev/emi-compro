import sanitizeHtml from "sanitize-html";

export function sanitizeRichText(content: string) {
  return sanitizeHtml(content, {
    allowedAttributes: {
      a: ["href", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedTags: [
      "a",
      "b",
      "blockquote",
      "br",
      "div",
      "em",
      "h2",
      "h3",
      "h4",
      "hr",
      "i",
      "li",
      "ol",
      "p",
      "span",
      "strong",
      "u",
      "ul",
    ],
  });
}
