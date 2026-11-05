# Prompt files

Plantillas manuales para tareas repetibles. No sustituyen al agente: preparan la entrada.

```yaml
---
description: Planifica una feature desde una especificación.
agent: planner
---
Lee `${input:spec}`. Devuelve alcance, archivos, riesgos Oracle y matriz de pruebas.
```

Los campos y variables pueden variar por harness/versión. Usa el autocompletado del IDE. Si `agent` o una variable no se reconoce, marca el ejemplo como específico de VS Code y conserva una versión sin frontmatter.
