import { describe, expect, it } from "vitest";
import { translateUiText } from "./spanish";

describe("translateUiText", () => {
  it("translates the primary navigation and feature names", () => {
    expect(translateUiText("Keyword Research")).toBe(
      "Investigación de palabras clave",
    );
    expect(translateUiText("Domain Overview")).toBe("Resumen del dominio");
    expect(translateUiText("Rank Tracking")).toBe("Seguimiento de posiciones");
  });

  it("translates explanatory copy without changing product names", () => {
    expect(
      translateUiText(
        "Connect GA4 to understand what organic visitors do after they land on your site.",
      ),
    ).toBe(
      "Conecta GA4 para saber qué hacen los visitantes orgánicos después de llegar a tu sitio.",
    );
  });

  it("preserves surrounding whitespace from JSX text nodes", () => {
    expect(translateUiText("  Loading projects...  ")).toBe(
      "  Cargando proyectos...  ",
    );
  });

  it("translates dynamic pagination and selection messages", () => {
    expect(translateUiText("Showing 1-25 of 80")).toBe("Mostrando 1-25 de 80");
    expect(translateUiText("2 keywords selected")).toBe(
      "2 palabras clave seleccionadas",
    );
    expect(translateUiText("Saved 3 keywords")).toBe(
      "3 palabras clave guardadas",
    );
    expect(translateUiText("1 keyword removed")).toBe(
      "1 palabra clave eliminada",
    );
  });

  it("leaves technical values untouched", () => {
    expect(translateUiText("https://openseo.adminbeply.es/mcp")).toBe(
      "https://openseo.adminbeply.es/mcp",
    );
    expect(translateUiText("DATAFORSEO_API_KEY")).toBe("DATAFORSEO_API_KEY");
  });

  it("translates dynamic project and empty-state copy", () => {
    expect(
      translateUiText("Archive this project to remove it from your workspace."),
    ).toBe("Archiva este proyecto para quitarlo de tu espacio de trabajo.");
    expect(
      translateUiText(
        "No saved keywords yet. Use the Keyword Research page to find and save keywords.",
      ),
    ).toContain("Todavía no hay palabras clave guardadas");
    expect(translateUiText("Start Audit")).toBe("Iniciar auditoría");
  });
});
