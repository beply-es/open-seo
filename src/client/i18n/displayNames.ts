const spanishRegions = new Intl.DisplayNames(["es"], { type: "region" });
const spanishLanguages = new Intl.DisplayNames(["es"], { type: "language" });

const regionCodeOverrides: Record<string, string> = {
  UK: "GB",
};

export function getSpanishCountryName(
  shortLabel: string,
  fallback: string,
): string {
  const regionCode = regionCodeOverrides[shortLabel] ?? shortLabel;
  return spanishRegions.of(regionCode) ?? fallback;
}

export function getSpanishLanguageName(
  languageCode: string,
  fallback: string,
): string {
  return spanishLanguages.of(languageCode) ?? fallback;
}
