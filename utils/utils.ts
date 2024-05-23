export const getFormattedTime = (updatedDate = new Date()) => {
  return updatedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const getFormattedDate = (updatedDate = new Date()) => {
  return new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  }).format(updatedDate);
};

export const humanCase = (
  str: string,
  charReplaced = "-",
  replacedChar = " "
) =>
  str
    .toLowerCase()
    .split(charReplaced)
    .join(replacedChar)
    .replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
