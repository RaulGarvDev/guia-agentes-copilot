# Depuración por síntomas

| Síntoma | Comprobación |
|---|---|
| Agente no aparece | Ruta, extensión, YAML, recarga, política del IDE |
| No se activa solo | `description`, auto-invocación, `disable-model-invocation` |
| Tiene demasiados permisos | `tools` omitido, MCP global activo |
| Skill no carga | nombre/description, ruta, SKILL.md, petición no coincide |
| Hook no corre | superficie no compatible, evento, JSON, ejecutable y permisos |
| Instructions ignoradas | glob, ruta real, colisión y soporte de superficie |
| Funciona en VS Code, no IntelliJ | versión/plugin, estado preview/GA, campo específico |
| Funciona en Copilot, no Claude/Codex | esquema no portable, nombres de tools, loader distinto |
