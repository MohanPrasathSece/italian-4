import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const COUNTRIES = [
  { code: "CH", name: "Schweiz", dial: "+41", regex: /^(\+41|0041|0)?\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/, example: "079 123 45 67" },
  { code: "FR", name: "Frankreich", dial: "+33", regex: /^(\+33|0033|0)[1-9](\s?\d{2}){4}$/, example: "06 12 34 56 78" },
  { code: "BE", name: "Belgien", dial: "+32", regex: /^(\+32|0032|0)[1-9](\s?\d{2,3}){3}$/, example: "04 123 45 67" },
  { code: "CA", name: "Kanada", dial: "+1", regex: /^(\+1|001)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, example: "416-123-4567" },
  { code: "US", name: "USA", dial: "+1", regex: /^(\+1|001)?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, example: "212-123-4567" },
  { code: "GB", name: "Großbritannien", dial: "+44", regex: /^(\+44|0044|0)7\d{3}\s?\d{6}$/, example: "07123 456789" },
  { code: "DE", name: "Deutschland", dial: "+49", regex: /^(\+49|0049|0)[1-9]\d{1,14}$/, example: "0151 12345678" },
  { code: "ES", name: "Spanien", dial: "+34", regex: /^(\+34|0034)?[67]\d{8}$/, example: "612 34 56 78" },
  { code: "IT", name: "Italien", dial: "+39", regex: /^(\+39|0039)?3\d{8,9}$/, example: "312 345 6789" },
  { code: "NL", name: "Niederlande", dial: "+31", regex: /^(\+31|0031|0)6\s?\d{8}$/, example: "06 12345678" },
  { code: "SE", name: "Schweden", dial: "+46", regex: /^(\+46|0046|0)7\d{8}$/, example: "070 123 45 67" },
  { code: "AU", name: "Australien", dial: "+61", regex: /^(\+61|0061|0)4\d{8}$/, example: "0412 345 678" },
  { code: "IN", name: "Indien", dial: "+91", regex: /^(\+91|0091)?[6789]\d{9}$/, example: "98765 43210" },
  { code: "AE", name: "VAE", dial: "+971", regex: /^(\+971|00971|0)5\d{7}$/, example: "050 123 4567" },
  { code: "SG", name: "Singapur", dial: "+65", regex: /^(\+65|0065)?[89]\d{7}$/, example: "8123 4567" },
  { code: "ZA", name: "Südafrika", dial: "+27", regex: /^(\+27|0027|0)[678]\d{8}$/, example: "071 234 5678" },
  { code: "BR", name: "Brasilien", dial: "+55", regex: /^(\+55|0055)?\s?\(?\d{2}\)?\s?9\d{8}$/, example: "(11) 91234-5678" },
  { code: "MX", name: "Mexiko", dial: "+52", regex: /^(\+52|0052)?\s?\d{10}$/, example: "55 1234 5678" },
  { code: "JP", name: "Japan", dial: "+81", regex: /^(\+81|0081|0)[789]0\s?\d{4}\s?\d{4}$/, example: "090-1234-5678" },
  { code: "CY", name: "Zypern", dial: "+357", regex: /^(\+357|00357)?9[45679]\d{6}$/, example: "99 123456" },
  { code: "IE", name: "Irland", dial: "+353", regex: /^(\+353|00353|0)?[89]\d{7,8}$/, example: "087 123 4567" },
  { code: "GBR", name: "Great Britain", dial: "+44", regex: /^(\+44|0044|0)?7\d{9}$/, example: "07700 900077" }
];

interface CountryDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  variant?: "floating" | "default";
}

export function CountryDropdown({ value, onChange, className, variant = "floating" }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCountry = COUNTRIES.find(c => c.code === value) || COUNTRIES[0];

  const triggerBaseClasses = "peer flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-background/50 text-sm text-foreground transition-colors focus-within:border-primary focus-within:outline-none";
  const paddingClasses = variant === "floating" ? "px-4 pb-2.5 pt-6" : "px-4 py-3.5";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(triggerBaseClasses, paddingClasses)}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {variant === "floating" && (
          <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-widest text-muted-foreground">Land</span>
        )}
        <div className="flex items-center gap-2">
          <span>{selectedCountry.name}</span>
          <span className="text-muted-foreground">({selectedCountry.dial})</span>
        </div>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-[calc(100%+8px)] z-50 max-h-[300px] w-full overflow-y-auto rounded-xl border border-border bg-card/95 p-1 backdrop-blur-xl shadow-xl animate-in fade-in slide-in-from-top-2">
            {COUNTRIES.map((country) => (
              <div
                key={country.code}
                className={cn(
                  "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5",
                  value === country.code && "bg-white/10"
                )}
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{country.name}</span>
                  <span className="text-xs text-muted-foreground">{country.dial}</span>
                </div>
                {value === country.code && <Check className="h-4 w-4 text-primary" />}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
