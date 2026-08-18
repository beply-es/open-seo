import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { jsx } from "./jsx-runtime";

describe("Spanish JSX runtime", () => {
  it("translates visible children and accessible attributes", () => {
    const element = jsx("button", {
      "aria-label": "Settings",
      title: "Keyword Research",
      value: "English",
      children: "Domain Overview",
    });
    const html = renderToStaticMarkup(element);

    expect(html).toContain('aria-label="Ajustes"');
    expect(html).toContain('title="Investigación de palabras clave"');
    expect(html).toContain('value="English"');
    expect(html).toContain(">Resumen del dominio<");
  });
});
