export const FormatStatus = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-CA").replace(/-/g, "/");
};

export const checkIfInputHasNumbers = (string) => /[0-9]/.test(string);
export const checkIfInputHasSpecialCharacters = (string) =>
  /[^a-zA-Z\s]/.test(string);
