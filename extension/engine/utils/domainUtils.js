export function getDomain(email) {
  if (!email || !email.includes("@")) return "";
  return email.split("@")[1].toLowerCase();
}
