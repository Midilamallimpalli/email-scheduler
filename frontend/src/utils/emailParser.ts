export const extractEmails = (text: string): string[] => {
  const emailRegex =
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

  const matches = text.match(emailRegex) || [];

  // normalize + deduplicate
  const uniqueEmails = Array.from(
    new Set(matches.map(email => email.toLowerCase().trim()))
  );

  return uniqueEmails;
};
