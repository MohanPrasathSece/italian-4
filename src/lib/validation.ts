export const COUNTRY_PHONE_PATTERNS: Record<string, { code: string; pattern: RegExp; example: string }> = {
  IE: { code: "+353", pattern: /^8\d{8}$/, example: "87 123 4567" },
  CH: { code: "+41", pattern: /^(\+41|0041|0)?[1-9]\d{8}$/, example: "079 123 45 67" },
  FR: { code: "+33", pattern: /^(\+33|0033|0)?[1-9]\d{8}$/, example: "06 12 34 56 78" },
  BE: { code: "+32", pattern: /^(\+32|0032|0)?[1-9]\d{8}$/, example: "0471 12 34 56" },
  CA: { code: "+1", pattern: /^(\+1|001)?[2-9]\d{9}$/, example: "416 555 0123" },
  US: { code: "+1", pattern: /^(\+1|001)?[2-9]\d{9}$/, example: "212 555 0123" },
  GB: { code: "+44", pattern: /^(\+44|0044|0)?[1-9]\d{9,10}$/, example: "07700 900123" },
  DE: { code: "+49", pattern: /^(\+49|0049|0)?[1-9]\d{8,11}$/, example: "0152 12345678" },
  ES: { code: "+34", pattern: /^(\+34|0034|0)?[6-9]\d{8}$/, example: "612 345 678" },
  IT: { code: "+39", pattern: /^(\+39|0039|0)?[3]\d{8,9}$/, example: "312 3456789" },
  NL: { code: "+31", pattern: /^(\+31|0031|0)?[6]\d{8}$/, example: "06 12345678" },
  SE: { code: "+46", pattern: /^(\+46|0046|0)?[7-9]\d{8}$/, example: "070 123 45 67" },
  AU: { code: "+61", pattern: /^(\+61|0061|0)?[4]\d{8}$/, example: "0412 345 678" },
  IN: { code: "+91", pattern: /^(\+91|0091|0)?[6-9]\d{9}$/, example: "98765 43210" },
  AE: { code: "+971", pattern: /^(\+971|00971)?[5]\d{8}$/, example: "50 123 4567" },
  SG: { code: "+65", pattern: /^(\+65|0065)?[8-9]\d{7}$/, example: "8123 4567" },
  ZA: { code: "+27", pattern: /^(\+27|0027|0)?[6-8]\d{8}$/, example: "082 123 4567" },
  BR: { code: "+55", pattern: /^(\+55|0055)?[1-9]\d{10}$/, example: "11 91234 5678" },
  MX: { code: "+52", pattern: /^(\+52|0052)?[1-9]\d{10}$/, example: "55 1234 5678" },
  OTHER: { code: "", pattern: /^\+?[1-9]\d{6,14}$/, example: "+1 234 567 8900" }
};

export const validatePhone = (phone: string, countryCode: string): string | null => {
  if (!phone || phone.trim() === "") {
    return "Si prega di inserire un numero di telefono";
  }
  const cleanNum = phone.replace(/\s+/g, "");
  const patternKey = Object.keys(COUNTRY_PHONE_PATTERNS).includes(countryCode) ? countryCode : "OTHER";
  const countryPattern = COUNTRY_PHONE_PATTERNS[patternKey];
  
  if (!countryPattern.pattern.test(cleanNum)) {
    return `Inserire un numero valido (es: ${countryPattern.example})`;
  }
  return null;
};
