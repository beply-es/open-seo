import generatedTranslations from "./spanish.generated.json";

const manualTranslations: Record<string, string> = {
  About: "Acerca de",
  Actions: "Acciones",
  Add: "Añadir",
  Analytics: "Analíticas",
  Apply: "Aplicar",
  "Apply filters": "Aplicar filtros",
  Archive: "Archivar",
  Archived: "Archivados",
  Auto: "Automático",
  Back: "Atrás",
  Backlinks: "Enlaces entrantes",
  "Backlink Spam Score": "Puntuación de spam de enlaces",
  "Brand Lookup": "Presencia de marca",
  "Broken Backlinks": "Enlaces rotos",
  "Broken Pages": "Páginas rotas",
  Cancel: "Cancelar",
  Category: "Categoría",
  Chat: "Chat",
  Check: "Comprobar",
  Clicks: "Clics",
  Close: "Cerrar",
  Color: "Color",
  Configure: "Configurar",
  Connect: "Conectar",
  "Connect with Google": "Conectar con Google",
  "Connect GA4 to understand what organic visitors do after they land on your site.":
    "Conecta GA4 para saber qué hacen los visitantes orgánicos después de llegar a tu sitio.",
  "Connect GSC to see how your website is actually performing in Google Search.":
    "Conecta GSC para ver el rendimiento real de tu web en la Búsqueda de Google.",
  Connected: "Conectado",
  "Connected account": "Cuenta conectada",
  "Connected by": "Conectado por",
  "Content Assistant": "Asistente de contenido",
  Continue: "Continuar",
  Copy: "Copiar",
  "Could not copy to clipboard": "No se pudo copiar al portapapeles",
  "Couldn't copy to clipboard": "No se pudo copiar al portapapeles",
  "Could not load backlinks": "No se pudieron cargar los enlaces entrantes",
  "Could not load backlinks data.":
    "No se pudieron cargar los datos de enlaces entrantes.",
  Country: "País",
  Current: "Actual",
  Daily: "Diario",
  Dark: "Oscuro",
  Dashboard: "Panel",
  Date: "Fecha",
  Delete: "Eliminar",
  Desktop: "Ordenador",
  Devices: "Dispositivos",
  Difficulty: "Dificultad",
  Disconnect: "Desconectar",
  Dismiss: "Cerrar",
  Domain: "Dominio",
  "Domain Authority": "Autoridad del dominio",
  "Domain Overview": "Resumen del dominio",
  Done: "Hecho",
  Download: "Descargar",
  "Download CSV": "Descargar CSV",
  "Download Excel": "Descargar Excel",
  "Download JSON": "Descargar JSON",
  Email: "Correo electrónico",
  Error: "Error",
  Exclude: "Excluir",
  "Exclude Page Terms": "Excluir términos de página",
  "Exclude Terms": "Excluir términos",
  Export: "Exportar",
  "Export CSV": "Exportar CSV",
  "Export to Sheets": "Exportar a Sheets",
  Failed: "Fallido",
  Filters: "Filtros",
  General: "General",
  History: "Historial",
  Home: "Inicio",
  Ideas: "Ideas",
  Impressions: "Impresiones",
  Include: "Incluir",
  "Include Page Terms": "Incluir términos de página",
  "Include subdomains": "Incluir subdominios",
  "Include Terms": "Incluir términos",
  Info: "Información",
  Intent: "Intención",
  Issue: "Problema",
  Issues: "Problemas",
  Keyword: "Palabra clave",
  Keywords: "Palabras clave",
  "Keyword Research": "Investigación de palabras clave",
  "Keyword difficulty": "Dificultad de la palabra clave",
  Language: "Idioma",
  Latest: "Más reciente",
  Light: "Claro",
  "Link Authority": "Autoridad del enlace",
  Local: "Local",
  "Local Business": "Negocios locales",
  Max: "Máximo",
  Min: "Mínimo",
  Mobile: "Móvil",
  Monthly: "Mensual",
  "My Site": "Mi sitio",
  Name: "Nombre",
  National: "Nacional",
  Next: "Siguiente",
  "No audits yet": "Todavía no hay auditorías",
  "Not connected": "Sin conectar",
  Nofollow: "Nofollow",
  Overview: "Resumen",
  Page: "Página",
  Pages: "Páginas",
  Performance: "Rendimiento",
  Plan: "Plan",
  Position: "Posición",
  "Position distribution": "Distribución de posiciones",
  Prev: "Anterior",
  "Previous Audits": "Auditorías anteriores",
  Projects: "Proyectos",
  "Project settings": "Ajustes del proyecto",
  Prompt: "Prompt",
  "Prompt Explorer": "Explorador de prompts",
  Property: "Propiedad",
  Query: "Consulta",
  Rank: "Posición",
  "Rank Tracking": "Seguimiento de posiciones",
  "Referring Domains": "Dominios de referencia",
  "Referring Pages": "Páginas de referencia",
  Remove: "Quitar",
  "Remove filter": "Quitar filtro",
  Rename: "Cambiar nombre",
  Research: "Investigación",
  "Research keywords": "Investigar palabras clave",
  Retry: "Reintentar",
  Roadmap: "Hoja de ruta",
  "Rows per page": "Filas por página",
  Save: "Guardar",
  "Save changes": "Guardar cambios",
  "Saved Keywords": "Palabras clave guardadas",
  Schedule: "Frecuencia",
  Search: "Buscar",
  "Search Performance": "Rendimiento en búsquedas",
  "Search performance": "Rendimiento en búsquedas",
  "Search Targeting": "Segmentación de búsqueda",
  Settings: "Ajustes",
  "Setup guides": "Guías de configuración",
  "Setup needed: add your DataForSEO API key to use OpenSEO features. See the quick steps on the":
    "Configuración necesaria: añade tu clave API de DataForSEO para usar las funciones de OpenSEO. Consulta los pasos rápidos en la",
  "Share of Voice": "Cuota de visibilidad",
  "Signed in as": "Sesión iniciada como",
  Skip: "Omitir",
  "Site Audit": "Auditoría del sitio",
  "Site audit": "Auditoría del sitio",
  "Spam Score": "Puntuación de spam",
  "Start New Audit": "Nueva auditoría",
  Status: "Estado",
  Suggestions: "Sugerencias",
  System: "Sistema",
  Tag: "Etiqueta",
  "Tag updated": "Etiqueta actualizada",
  Tags: "Etiquetas",
  "Target Domain": "Dominio objetivo",
  Theme: "Tema",
  "Top Keywords": "Principales palabras clave",
  "Top Pages": "Páginas principales",
  Traffic: "Tráfico",
  "Organic Keywords": "Palabras clave orgánicas",
  "Organic Traffic": "Tráfico orgánico",
  Usage: "Uso",
  Version: "Versión",
  View: "Ver",
  Volume: "Volumen",
  "AI & MCP": "IA y MCP",
  "Available skills": "Habilidades disponibles",
  "Available tools": "Herramientas disponibles",
  "Competitive Research": "Investigación competitiva",
  "Help & Community": "Ayuda y comunidad",
  "In-app SEO Research Agent": "Agente de investigación SEO integrado",
  "OpenSEO Skills": "Habilidades de OpenSEO",
  "Sam: AI SEO teammate": "Sam: compañero SEO con IA",
  "Set up your DataForSEO API key": "Configura tu clave API de DataForSEO",
  "Set up your OpenRouter API key": "Configura tu clave API de OpenRouter",
  "Some properties couldn’t be loaded. Check that the Analytics Admin API is enabled and that this Google account has property access.":
    "No se pudieron cargar algunas propiedades. Comprueba que la API de administración de Analytics esté habilitada y que esta cuenta de Google tenga acceso a la propiedad.",
  "Google OAuth client not configured":
    "El cliente OAuth de Google no está configurado",
  "Google Analytics connected": "Google Analytics conectado",
  "Google Analytics disconnected": "Google Analytics desconectado",
  "Search Console connected": "Search Console conectado",
  "Search Console disconnected": "Search Console desconectado",
  "Loading projects...": "Cargando proyectos...",
  "Loading issues...": "Cargando problemas...",
  "Loading properties…": "Cargando propiedades…",
  "Loading…": "Cargando…",
  "help page": "página de ayuda",
  AI: "IA",
  "Switch project": "Cambiar de proyecto",
  "Connect your AI agent to OpenSEO. Run keyword research, SERP analysis, domain lookups, and backlink reviews from your editor or chat.":
    "Conecta tu agente de IA a OpenSEO. Investiga palabras clave, analiza las SERP, consulta dominios y revisa enlaces entrantes desde tu editor o chat.",
  "MCP server URL": "URL del servidor MCP",
  "Paste this into any MCP client. This URL points at the OpenSEO instance you are using now, whether hosted, self-hosted, or local. Sign in with OpenSEO when prompted.":
    "Pega esta URL en cualquier cliente MCP. Apunta a la instancia de OpenSEO que estás usando, ya sea alojada, autohospedada o local. Inicia sesión en OpenSEO cuando se solicite.",
  "Pick your agent.": "Elige tu agente.",
  "Add with the CLI": "Añadir desde la CLI",
  "Add a custom connector": "Añadir un conector personalizado",
  "Run this in your terminal:": "Ejecuta esto en tu terminal:",
  "Approve the login when prompted.":
    "Autoriza el inicio de sesión cuando se solicite.",
  "Settings → Integrations & MCP": "Ajustes → Integraciones y MCP",
  "Paste the MCP URL above and click Add.":
    "Pega la URL MCP anterior y pulsa Añadir.",
  "Paste the MCP URL above.": "Pega la URL MCP anterior.",
  "Approve the OpenSEO login when prompted.":
    "Autoriza el inicio de sesión en OpenSEO cuando se solicite.",
  "Skills give Codex and Claude Code reusable SEO workflows that can call your OpenSEO MCP tools when live SERP, keyword, backlink, or domain data is needed.":
    "Las habilidades ofrecen a Codex y Claude Code flujos SEO reutilizables que pueden usar las herramientas MCP de OpenSEO cuando necesitan datos actuales de SERP, palabras clave, enlaces entrantes o dominios.",
  "Install with skills add": "Instalar con skills add",
  "Recommended cross-agent installer":
    "Instalador recomendado para varios agentes",
  "Install for Claude Code": "Instalar para Claude Code",
  "Target Claude Code only": "Solo para Claude Code",
  "Install for Codex": "Instalar para Codex",
  "Target OpenAI Codex only": "Solo para OpenAI Codex",
  "Manual GitHub install": "Instalación manual desde GitHub",
  "Clone the repo and copy the skills":
    "Clona el repositorio y copia las habilidades",
  "Start with": "Empieza con",
  ". It will ask about your project and help configure your workspace.":
    ". Te preguntará por tu proyecto y te ayudará a configurar el espacio de trabajo.",
  "Sam is an experimental content workflow for Claude Code and other coding agents. It combines keyword research, source discovery, drafting, and QA.":
    "Sam es un flujo experimental de creación de contenido para Claude Code y otros agentes. Combina investigación de palabras clave, búsqueda de fuentes, redacción y control de calidad.",
  "View Sam on GitHub": "Ver Sam en GitHub",
  "Ask questions and run research without leaving OpenSEO":
    "Haz preguntas e investiga sin salir de OpenSEO",
  "Generate drafts using saved keywords and business context":
    "Genera borradores usando palabras clave guardadas y el contexto del negocio",
  "Have feedback? Reach out on": "¿Tienes comentarios? Escríbenos en",
  "or email": "o por correo a",
  "Get keyword ideas with volume, difficulty, and CPC.":
    "Obtén ideas de palabras clave con volumen, dificultad y CPC.",
  "Get rank tracking positions": "Consultar posiciones seguidas",
  "Read tracked keyword positions.":
    "Consulta las posiciones de las palabras clave monitorizadas.",
  "Create a rank tracker": "Crear un seguimiento de posiciones",
  "Configure a domain for rank tracking.":
    "Configura un dominio para seguir sus posiciones.",
  "Add tracked keywords": "Añadir palabras clave al seguimiento",
  "Add keywords to an existing rank tracker.":
    "Añade palabras clave a un seguimiento existente.",
  "Remove tracked keywords": "Quitar palabras clave del seguimiento",
  "Stop tracking selected keyword IDs.":
    "Deja de seguir las palabras clave seleccionadas.",
  "Estimate rank check cost": "Estimar el coste de la comprobación",
  "Preview the cost of an explicit rank check.":
    "Consulta el coste antes de comprobar las posiciones.",
  "Run a rank check": "Comprobar posiciones ahora",
  "Check a tracker's current positions now.":
    "Comprueba ahora las posiciones actuales del seguimiento.",
  "Get keyword metrics": "Consultar métricas de palabras clave",
  "Volume, difficulty, intent, CPC, and trends for any keyword list.":
    "Volumen, dificultad, intención, CPC y tendencias de cualquier lista de palabras clave.",
  "Get saved keywords": "Consultar palabras clave guardadas",
  "Pull your saved keyword lists.":
    "Recupera tus listas de palabras clave guardadas.",
  "Save keywords": "Guardar palabras clave",
  "Save keywords back to OpenSEO.": "Guarda palabras clave en OpenSEO.",
  "Get SERP results": "Consultar resultados de la SERP",
  "See live Google results for a keyword.":
    "Consulta los resultados actuales de Google para una palabra clave.",
  "Find SERP competitors": "Buscar competidores en la SERP",
  "Compare domains across a keyword set.":
    "Compara dominios para un conjunto de palabras clave.",
  "Get ranked keywords": "Consultar palabras clave posicionadas",
  "Find exact keyword, page, and rank rows.":
    "Consulta cada palabra clave, página y posición exactas.",
  "Get domain overview": "Consultar resumen del dominio",
  "Summarize a domain's organic footprint.":
    "Resume la presencia orgánica de un dominio.",
  "Get domain keywords": "Consultar palabras clave del dominio",
  "Find keywords a domain already ranks for.":
    "Encuentra las palabras clave para las que ya posiciona un dominio.",
  "Get backlinks overview": "Consultar resumen de enlaces entrantes",
  "Check backlink and referring-domain stats.":
    "Consulta estadísticas de enlaces entrantes y dominios de referencia.",
  "Get backlinks profile": "Consultar perfil de enlaces entrantes",
  "Fetch paginated link-level backlink rows.":
    "Obtén el listado paginado de enlaces entrantes.",
  "Search local businesses": "Buscar negocios locales",
  "Find local business candidates near a coordinate.":
    "Encuentra negocios cercanos a unas coordenadas.",
  "Get local SERP results": "Consultar resultados locales de la SERP",
  "Fetch one Maps or Local Finder result set.":
    "Obtén resultados de Maps o Local Finder.",
  "Get business questions": "Consultar preguntas del negocio",
  "Read Google Business Profile Q&A rows.":
    "Consulta las preguntas y respuestas del Perfil de Empresa de Google.",
  "Get Search Console performance": "Consultar rendimiento de Search Console",
  "Read clicks, impressions, CTR, and position from Search Console.":
    "Consulta clics, impresiones, CTR y posición desde Search Console.",
  "Inspect URLs": "Inspeccionar URL",
  "Check index status, crawl, and canonical for up to 10 URLs.":
    "Comprueba indexación, rastreo y URL canónica de hasta 10 URL.",
  "Get organic overview": "Consultar resumen orgánico",
  "Compare top-line organic performance with the previous period.":
    "Compara el rendimiento orgánico general con el periodo anterior.",
  "Get organic landing pages": "Consultar páginas de destino orgánicas",
  "Read organic sessions, engagement, key events, and revenue by landing page.":
    "Consulta sesiones orgánicas, interacción, eventos clave e ingresos por página de destino.",
  "Get page performance": "Consultar rendimiento de páginas",
  "Read page views, users, engagement time, and key events.":
    "Consulta vistas, usuarios, tiempo de interacción y eventos clave.",
  "Get key events": "Consultar eventos clave",
  "Read key-event outcomes by event or landing page.":
    "Consulta resultados de eventos clave por evento o página de destino.",
  "Get search opportunities": "Consultar oportunidades de búsqueda",
  "Join Search Console demand with Analytics outcomes to prioritize pages.":
    "Combina la demanda de Search Console con los resultados de Analytics para priorizar páginas.",
  "Get traffic acquisition": "Consultar adquisición de tráfico",
  "Compare channels, source/medium, or campaigns using session outcomes.":
    "Compara canales, fuente/medio o campañas mediante los resultados de las sesiones.",
  "Check measurement health": "Comprobar la medición",
  "Inspect streams, enhanced measurement, key events, and custom definitions.":
    "Revisa flujos, medición mejorada, eventos clave y definiciones personalizadas.",
  "Get ecommerce performance": "Consultar rendimiento de comercio electrónico",
  "Read product-funnel or landing-page transaction performance.":
    "Consulta el rendimiento del embudo de producto o de las transacciones por página de destino.",
  "Get site search": "Consultar búsquedas internas",
  "Read measured internal search terms and outcomes.":
    "Consulta los términos de búsqueda interna y sus resultados.",
  "Get audience breakdown": "Consultar desglose de audiencia",
  "Compare device, country, or new-versus-returning audiences.":
    "Compara audiencias por dispositivo, país o usuarios nuevos y recurrentes.",
  "We want to talk to you! We're super open to feedback and want to learn how you work so we can make OpenSEO better.":
    "Queremos hablar contigo. Tus comentarios nos ayudan a entender cómo trabajas y a mejorar OpenSEO.",
  "Send ideas, problems, questions, or feedback directly.":
    "Envíanos directamente tus ideas, problemas, preguntas o comentarios.",
  "Ask for help, share ideas and learn from the community.":
    "Pide ayuda, comparte ideas y aprende con la comunidad.",
  "GitHub Issues": "Incidencias en GitHub",
  "Report bugs or request features on GitHub.":
    "Informa de errores o solicita nuevas funciones en GitHub.",
  "Open an issue": "Abrir una incidencia",
  "Each project is a separate workspace with its own Search Console, rank tracking, and audits.":
    "Cada proyecto es un espacio de trabajo independiente con su propio Search Console, seguimiento de posiciones y auditorías.",
  "We could not verify your DataForSEO setup. If features are not working, check the setup steps on the":
    "No hemos podido verificar la configuración de DataForSEO. Si alguna función no responde, revisa los pasos de configuración en la",
  "You can connect Search Console and set up rank tracking after creating the project.":
    "Puedes conectar Search Console y configurar el seguimiento de posiciones después de crear el proyecto.",
  "Keyword, SERP, and domain data uses this country and language unless a call asks for a different one.":
    "Los datos de palabras clave, SERP y dominios usarán este país e idioma salvo que una consulta indique otros.",
  "Keyword, SERP, and domain data uses this country and language unless a call asks for a different one. Change it later in project settings.":
    "Los datos de palabras clave, SERP y dominios usarán este país e idioma salvo que una consulta indique otros. Puedes cambiarlo más adelante en los ajustes del proyecto.",
  English: "Inglés",
  Spanish: "Español",
  "Please sign in and try again.": "Inicia sesión y vuelve a intentarlo.",
  "OpenSEO auth is not configured. Follow the README setup steps for Cloudflare Access.":
    "La autenticación de OpenSEO no está configurada. Sigue los pasos del README para configurar Cloudflare Access.",
  "An active hosted subscription is required before you can use OpenSEO.":
    "Necesitas una suscripción alojada activa para usar OpenSEO.",
  "You've run out of credits. Add more credits or upgrade your plan to continue.":
    "Te has quedado sin créditos. Añade más créditos o mejora tu plan para continuar.",
  "You do not have access to this resource.":
    "No tienes acceso a este recurso.",
  "The requested resource was not found.":
    "No se ha encontrado el recurso solicitado.",
  "Please check your input and try again.":
    "Revisa los datos introducidos y vuelve a intentarlo.",
  "This crawl target is blocked by security policy.":
    "La política de seguridad bloquea este destino de rastreo.",
  "The connected DataForSEO account has a billing or balance issue.":
    "La cuenta de DataForSEO conectada tiene un problema de facturación o saldo.",
  "DataForSEO rejected the API key. Check that DATAFORSEO_API_KEY is the base64 of your DataForSEO login:password.":
    "DataForSEO ha rechazado la clave API. Comprueba que DATAFORSEO_API_KEY sea el valor base64 de tu usuario:contraseña de DataForSEO.",
  "Too many requests. Please wait and try again.":
    "Hay demasiadas solicitudes. Espera y vuelve a intentarlo.",
  "The data provider is temporarily unavailable. Please retry in a moment.":
    "El proveedor de datos no está disponible temporalmente. Vuelve a intentarlo en unos instantes.",
  "This request conflicts with existing data.":
    "Esta solicitud entra en conflicto con datos existentes.",
  "An unexpected error occurred. Please check server logs and try again.":
    "Se ha producido un error inesperado. Revisa los registros del servidor y vuelve a intentarlo.",
  "Missing Cloudflare Access configuration: set TEAM_DOMAIN and POLICY_AUD on the deployment. See docs/SELF_HOSTING_CLOUDFLARE.md.":
    "Falta la configuración de Cloudflare Access: define TEAM_DOMAIN y POLICY_AUD en el despliegue. Consulta docs/SELF_HOSTING_CLOUDFLARE.md.",
};

const translations: Record<string, string> = {
  ...(generatedTranslations as Record<string, string>),
  ...manualTranslations,
};

const dynamicTranslations: Array<
  [RegExp, (match: RegExpMatchArray) => string]
> = [
  [
    /^Showing (\d+)-(\d+) of (\d+)$/,
    (match) => `Mostrando ${match[1]}-${match[2]} de ${match[3]}`,
  ],
  [
    /^(\d+) keywords selected$/,
    (match) => `${match[1]} palabras clave seleccionadas`,
  ],
  [
    /^(\d+) keyword selected$/,
    (match) => `${match[1]} palabra clave seleccionada`,
  ],
  [/^Page (\d+) of (\d+)$/, (match) => `Página ${match[1]} de ${match[2]}`],
  [/^(\d+) results$/, (match) => `${match[1]} resultados`],
  [/^(\d+) pages$/, (match) => `${match[1]} páginas`],
  [
    /^(\d+) keywords? removed$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave eliminada`
        : `${match[1]} palabras clave eliminadas`,
  ],
  [
    /^Updated tags for (\d+) keywords?$/,
    (match) =>
      Number(match[1]) === 1
        ? `Etiquetas actualizadas para ${match[1]} palabra clave`
        : `Etiquetas actualizadas para ${match[1]} palabras clave`,
  ],
  [
    /^Updated stats for (\d+) keywords?$/,
    (match) =>
      Number(match[1]) === 1
        ? `Estadísticas actualizadas para ${match[1]} palabra clave`
        : `Estadísticas actualizadas para ${match[1]} palabras clave`,
  ],
  [
    /^(\d+) keywords? copied$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave copiada`
        : `${match[1]} palabras clave copiadas`,
  ],
  [
    /^(\d+) keywords? added$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave añadida`
        : `${match[1]} palabras clave añadidas`,
  ],
  [
    /^Metrics updated for (\d+) keywords$/,
    (match) =>
      Number(match[1]) === 1
        ? `Métricas actualizadas para ${match[1]} palabra clave`
        : `Métricas actualizadas para ${match[1]} palabras clave`,
  ],
  [
    /^Added (\d+) keywords for tracking$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave añadida al seguimiento`
        : `${match[1]} palabras clave añadidas al seguimiento`,
  ],
  [
    /^Copied (\d+) keywords?$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave copiada`
        : `${match[1]} palabras clave copiadas`,
  ],
  [
    /^Saved (\d+) keywords?$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} palabra clave guardada`
        : `${match[1]} palabras clave guardadas`,
  ],
  [
    /^Keywords must be (\d+) characters or fewer\.$/,
    (match) => `Las palabras clave deben tener ${match[1]} caracteres o menos.`,
  ],
  [
    /^Migrated (\d+) workspaces? into the shared workspace\.$/,
    (match) =>
      Number(match[1]) === 1
        ? `${match[1]} espacio de trabajo migrado al espacio compartido.`
        : `${match[1]} espacios de trabajo migrados al espacio compartido.`,
  ],
];

export function translateUiText(value: string): string {
  const whitespace = value.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!whitespace) return value;

  const [, prefix, source, suffix] = whitespace;
  if (!source) return value;

  const exact = translations[source];
  if (exact) return `${prefix}${exact}${suffix}`;

  for (const [pattern, translate] of dynamicTranslations) {
    const match = source.match(pattern);
    if (match) return `${prefix}${translate(match)}${suffix}`;
  }

  return value;
}

function translateUiValue(value: unknown): unknown {
  if (typeof value === "string") return translateUiText(value);
  if (Array.isArray(value)) return value.map(translateUiValue);
  return value;
}

const translatablePropNames = new Set([
  "alt",
  "aria-description",
  "aria-label",
  "buttonText",
  "caption",
  "children",
  "description",
  "emptyMessage",
  "heading",
  "helperText",
  "label",
  "message",
  "placeholder",
  "subtitle",
  "successMessage",
  "title",
  "tooltip",
]);

export function translateUiProps<T>(props: T): T {
  if (!props || typeof props !== "object") return props;

  let changed = false;
  const translated = { ...(props as Record<string, unknown>) };
  for (const [key, value] of Object.entries(translated)) {
    if (!translatablePropNames.has(key)) continue;
    if (
      typeof value !== "string" &&
      !(key === "children" && Array.isArray(value))
    ) {
      continue;
    }
    const next = translateUiValue(value);
    if (next !== value) {
      translated[key] = next;
      changed = true;
    }
  }

  return (changed ? translated : props) as T;
}
