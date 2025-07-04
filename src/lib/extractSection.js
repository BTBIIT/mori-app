export const extractSection = (text, marker) => {
  const regex = new RegExp(`${marker}([^📘💬❤️]+)`);
  const match = text.match(regex);
  return match ? match[1].trim() : "";
};
