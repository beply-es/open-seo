import { describe, expect, it } from "vitest";
import { getSpanishCountryName, getSpanishLanguageName } from "./displayNames";

describe("Spanish display names", () => {
  it("localizes country names from their ISO display labels", () => {
    expect(getSpanishCountryName("ES", "Spain")).toBe("España");
    expect(getSpanishCountryName("US", "United States")).toBe("Estados Unidos");
    expect(getSpanishCountryName("UK", "United Kingdom")).toBe("Reino Unido");
  });

  it("localizes language names without changing their submitted codes", () => {
    expect(getSpanishLanguageName("en", "English")).toBe("inglés");
    expect(getSpanishLanguageName("es", "Spanish")).toBe("español");
    expect(getSpanishLanguageName("pt-BR", "Portuguese (Brazil)")).toContain(
      "portugués",
    );
  });
});
