export const getIusseNum = (): string | null => {
  const title = document.getElementById("page-title")?.textContent;
  const match = title?.match(/第\s?(\d+)\s?期/);

  return match ? match[1] : null;
};

export const isSectionItem = (item: Element): boolean => {
  const text = item.textContent?.trim();
  const regex = /^(\d+)、(.*)$/;
  if (!text) return false;
  return regex.test(text);
};

export const isSection = (item: Element): boolean => {
  return item.tagName.toLowerCase() === "h2";
};
