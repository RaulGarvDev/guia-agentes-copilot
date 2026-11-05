# Fuentes y verificación

Fecha de consulta: 5 de noviembre de 2026.

- GitHub Docs: customization cheat sheet, custom agents configuration, custom instructions support, hooks reference y CLI references.
- VS Code Docs: custom agents, instructions, prompt files, skills y hooks.
- Agent Skills Specification: `agentskills.io/specification`.
- VS Code Agent Host: [referencia de custom agents](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference), [subagents](https://code.visualstudio.com/docs/agents/run/subagents), [referencia de instructions](https://code.visualstudio.com/docs/agents/reference/custom-instructions-reference) y [harnesses](https://code.visualstudio.com/docs/agents/run/agent-harnesses).
- [Agent Skills en VS Code](https://code.visualstudio.com/docs/agent-customization/agent-skills).
- [Hooks de GitHub Copilot](https://docs.github.com/copilot/reference/hooks-reference) y [hooks en VS Code](https://code.visualstudio.com/docs/agent-customization/hooks).
- [Copilot para JetBrains, changelog 11-03-2026](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/) y [22-09-2026](https://github.blog/changelog/2026-09-22-new-features-and-improvements-in-copilot-for-jetbrains/).
- Anthropic Docs: Claude Code y MCP. La recuperación automática no permitió verificar todos los detalles en esta edición; se marcan como dependientes del harness.
- OpenAI Developers: skills, plugins y MCP.

Los detalles de campos, ubicaciones y permisos están etiquetados por harness en los capítulos correspondientes. Las tablas de esta guía son una fotografía documental: vuelve a validar los enlaces y los valores en la instalación objetivo antes de desplegar cambios de configuración.

## Contradicciones
La referencia general de agentes puede etiquetar JetBrains como preview mientras changelogs recientes anuncian capacidades GA. Comprueba versión del plugin y feature matrix antes de estandarizar.

## No verificado universalmente
Nombres exactos de tools, eventos de hooks fuera de Copilot, campos de prompt files, rutas personales de cada SO y paridad completa Claude/Codex.
