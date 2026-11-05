# Chuleta de personalizaciones

## Elige la pieza correcta

| Si necesitas... | Usa... |
|---|---|
| Una regla persistente del proyecto | Instructions |
| Un rol con autoridad y salida propias | Agente |
| Un procedimiento reutilizable con recursos | Skill |
| Una petición parametrizada y manual | Prompt file |
| Un control ejecutable del ciclo | Hook |
| Herramientas/datos de un servicio externo | MCP |
| Coordinar fases aisladas | Agente coordinador + subagentes soportados por el harness |

## Instruction por ruta (VS Code)

```yaml
---
name: Pruebas Java
description: Reglas para modificar pruebas Java.
applyTo: "backend/src/test/**/*.java"
---
Usa el framework configurado y ejecuta el test dirigido.
```

Campos: `name`, `description` y `applyTo`; todos opcionales en el formato de VS Code. Sin `applyTo`, no hay activación automática por patrón. `.claude/rules` puede usar `paths`; no son intercambiables por defecto.

## Skill (estándar Agent Skills)

```yaml
---
name: test-summary
description: Ejecuta tests dirigidos y resume el resultado. Úsala al validar cambios.
license: MIT
compatibility: Requiere Maven Wrapper y Java.
metadata:
  version: "1.0"
---
```

`name` y `description` son obligatorios; `license`, `compatibility`, `metadata` y `allowed-tools` son opcionales. `allowed-tools` es experimental y no constituye una garantía de permisos.

## Agente (ejemplo VS Code Local)

```yaml
---
name: Coordinador
description: Coordina una tarea mediante workers permitidos y revisión independiente.
target: vscode
tools: ['agent', 'read', 'search']
agents: ['Planificador', 'Implementador', 'Revisor']
---
```

`agents` y `agent` son específicos del harness Local. No copies esta cabecera a Copilot cloud sin adaptar y validar.

## VS Code e IntelliJ: diferencias prácticas

Comparten el formato de agente de repositorio `.github/agents/*.agent.md` en las superficies compatibles, pero no tienen el mismo selector, runtime, herramientas ni paridad de opciones.

| Tema | VS Code | IntelliJ / JetBrains |
|---|---|---|
| Harness | Permite elegir harness para una sesión, por ejemplo `Copilot`, `Local`, `Claude` o `Codex`; `Cloud` es un destino de ejecución de Copilot. La disponibilidad depende de extensiones, cuenta y políticas. | Se trabaja desde el plugin GitHub Copilot para JetBrains. No presupongas que existe el selector de harnesses de VS Code. Cambiar el modelo no cambia el runtime del plugin. |
| Crear agente de workspace | Abre **Chat: Open Customizations** → **Agents** → **New Agent**. Comprueba en qué ubicación se creó el archivo. | Abre Copilot Chat → selector de agentes → **Configure Agents...** → **Workspace**. Comprueba que el perfil se guardó en `.github/agents/`. |
| Agentes y planes | Agentes personalizados, built-ins y subagentes dependen del harness elegido. | El changelog de marzo de 2026 anunció agentes personalizados, subagentes y plan agent como GA para JetBrains; el flujo y disponibilidad dependen de la versión del plugin y políticas. |
| Instructions | Admite archivos y activación propios de VS Code/harness; por ejemplo, `.github/instructions/*.instructions.md` con `applyTo`. | El changelog de marzo de 2026 anunció soporte para `AGENTS.md`, `CLAUDE.md`, instrucciones Copilot y reglas por archivos. Confirma la carga en la configuración del plugin. |
| Skills | Agent Skills estándar en ubicaciones reconocidas por el harness seleccionado; el soporte no es idéntico entre harnesses. | El changelog de septiembre de 2026 anunció skills e instrucciones compartidas de organización/empresa en sesiones de agente. No asumas que todas las rutas locales del estándar o todas sus opciones están soportadas. |
| Hooks | Eventos, configuración y ejecución dependen del harness (Local, Copilot, etc.). | El changelog de marzo de 2026 describió hooks como preview; verifica versión y política del IDE antes de depender de ellos. |
| Tools y permisos | Se administran en las personalizaciones/herramientas del harness. Los nombres disponibles varían. | Se administran desde la configuración del plugin y el diálogo de aprobación de herramientas/MCP; los nombres y controles no son intercambiables con VS Code. |

**Estado a validar:** hay una discrepancia entre la referencia general de GitHub, que aún etiqueta custom agents para JetBrains como preview, y el changelog del 11 de marzo de 2026, que los anunció como GA. Revisa la versión del plugin y las políticas de la organización antes de estandarizarlo. Las capacidades de skills compartidas también se anunciaron en el changelog del 22 de septiembre de 2026.

Fuentes: [custom agents en VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents), [harnesses de VS Code](https://code.visualstudio.com/docs/agents/run/agent-harnesses), [referencia de custom agents de GitHub](https://docs.github.com/copilot/reference/custom-agents-configuration), [GitHub Copilot para JetBrains, 11-03-2026](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/) y [22-09-2026](https://github.blog/changelog/2026-09-22-new-features-and-improvements-in-copilot-for-jetbrains/).

## Qué es un harness y cómo se usa

Un **harness** es el entorno/runtime que envuelve al modelo y determina cómo trabaja el agente: qué contexto descubre, qué archivos de instrucciones carga, qué herramientas puede invocar, qué permisos/aprobaciones aplican y cómo se ejecuta una sesión.

No es lo mismo que:

- **Modelo:** el motor que genera respuestas y llamadas a herramientas.
- **Agente:** un perfil que define un rol, instrucciones y, según el harness, herramientas/configuración.
- **IDE o host:** la interfaz que muestra la sesión; algunos harnesses necesitan que el host siga abierto y otros ejecutan trabajo en segundo plano.

```text
Misma petición + mismo agente + distinto harness
       ├── contexto y archivos descubiertos pueden variar
       ├── herramientas y permisos pueden variar
       └── ciclo de sesión y soporte de skills/hooks pueden variar
```

### Ejemplo: añadir y probar un test de servicio

El objetivo es agregar una prueba unitaria al servicio Spring existente y revisar el cambio:

1. **VS Code:** crea un chat nuevo y elige **Session Target** antes de enviar el primer mensaje. Selecciona `Copilot` para usar el harness Copilot, o `Local` para usar el harness integrado de VS Code. Elige por separado el agente y el modelo; seleccionar un modelo Claude no convierte la sesión en harness Claude.
2. **IntelliJ:** abre GitHub Copilot Chat, elige el perfil de agente en el selector y trabaja con el runtime del plugin. No busques el selector de harness de VS Code; el modelo seleccionado es una opción distinta.
3. En ambos, pide un resultado concreto, por ejemplo: “Añade un test para el caso de error de este servicio, siguiendo los tests del módulo. No cambies código de producción. Ejecuta el test dirigido si tienes una herramienta de terminal autorizada e informa el código de salida”.
4. Revisa los archivos de contexto, herramientas invocadas y cambios. Confirma que cargó las instructions/skills previstas y que las pruebas realmente se ejecutaron.
5. Si cambias de harness, abre una sesión nueva y repite una prueba pequeña: el nuevo runtime puede interpretar distinto las instrucciones y no hereda automáticamente todas las capacidades.

### Pasos breves para escogerlo

1. Decide dónde debe ejecutarse el trabajo: en el workspace local/IDE, en un runtime Copilot independiente o en otro proveedor.
2. Comprueba qué harness ofrece esa superficie y qué archivos/tools soporta.
3. Selecciónalo al crear la sesión; el selector se llama **Session Target** en las superficies actuales de VS Code que lo exponen.
4. Selecciona después agente, modelo y herramientas. Son decisiones separadas.
5. Revisa permisos y solicita aprobación para acciones sensibles.
6. Valida descubrimiento, salida, cambios y tests en ese harness; no des por probada la portabilidad por abrir el mismo archivo.

El campo `target: vscode` en un `.agent.md`, cuando el esquema lo admite, solo orienta cómo se interpreta/valida ese archivo; **no cambia el harness de la sesión**. Para el detalle del ciclo y controles, consulta [Harnesses](./08-harnesses.md).

## Reglas que nunca se deben asumir

- Los campos YAML no son universales: consulta el esquema del harness.
- Instrucciones de “no editar” no sustituyen una restricción de tools.
- Ausencia de errores de parseo no demuestra descubrimiento, activación o comportamiento correcto.
- Un test no ejecutado no es un test pasado.
- Para esquemas completos y checklists, consulta [Agentes](./02-agentes.md), [Instructions](./03-instructions.md), [Skills](./04-skills.md), [Harnesses](./08-harnesses.md) y [Coordinación](./09-subagentes-handoffs.md).
