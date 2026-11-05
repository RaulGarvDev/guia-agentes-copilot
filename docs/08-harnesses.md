# Harness: el runtime que hace funcionar las personalizaciones

El **harness** descubre archivos, construye contexto, selecciona modelo, expone herramientas, aplica permisos, ejecuta hooks y gestiona sesiones. Elegir un modelo no cambia el harness. Un mismo Markdown puede ser reconocido por varios productos y comportarse distinto en cada uno.

## Harness no es lo mismo que modelo ni agente

```text
Harness → descubre personalizaciones y controla el ciclo/las herramientas
Modelo  → genera texto y decide entre las herramientas disponibles
Agent   → rol, instrucciones y configuración para una clase de tareas
```

La seguridad efectiva depende de permisos y controles del runtime, no solo del prompt o de la cabecera YAML del agente.

## Comparación de referencia

Las rutas y funciones cambian por versión. Esta tabla describe familias de configuración, no equivalencia de capacidades:

| Harness/superficie | Instrucciones | Agentes/subagentes | Skills | Permisos/acciones |
|---|---|---|---|---|
| VS Code **Copilot** | `.github/copilot-instructions.md`, `.github/instructions/` y formatos adicionales compatibles | `.github/agents/`; capacidades varían por superficie | `.github/skills/` en superficies compatibles | Runtime Copilot/Agent Host; hooks de Copilot y herramientas configuradas |
| VS Code **Local** | `AGENTS.md`, `.github/instructions/`, formatos compatibles | `.agent.md`; herramienta `agent`, campo `agents` y handoffs según la referencia Local | `.github/skills/`, `.claude/skills/`, `.agents/skills/` | Runtime Local/extension host; tools del cliente y hooks Local separados |
| GitHub Copilot CLI / Cloud | Instrucciones según superficie | Custom agents Copilot | Skills según superficie | CLI local frente a cloud efímero; formatos y eventos hooks pueden diferir |
| GitHub Copilot en IntelliJ/JetBrains | Instrucciones del plugin, incluyendo `AGENTS.md`/`CLAUDE.md` según versión | Custom agents y subagentes según versión/políticas | Skills compartidas según soporte del plugin | Runtime plugin; controles de tools/MCP y hooks propios de la versión |
| Claude Code | `CLAUDE.md` y `.claude/rules/` | Agentes/subagentes y archivos propios del runtime | `.claude/skills/` | Permisos, hooks y sandbox propios |
| OpenAI Codex | `AGENTS.md` | Agentes/plugins según configuración Codex | `.agents/skills/` | Aprobaciones, sandbox, MCP y hooks propios |
| Harness construido por el equipo | Loader propio | Orquestador y workers implementados por el equipo | Loader/estándar configurado | El equipo debe implementar aislamiento, permisos, aprobación, logs y límites |

En VS Code, `Copilot`, `Local`, `Claude` y `Codex` son harnesses elegibles cuando la instalación y las políticas los permiten; `Cloud` es un destino de ejecución de Copilot, no un harness independiente. Cerrar el editor puede detener sesiones Local, mientras que las sesiones Copilot pueden continuar en Agent Host. El detalle de skills aparece en [Skills](./04-skills.md) y hooks en [Hooks](./06-hooks.md).

El estado GA/preview de features en JetBrains puede ser inconsistente entre documentación general y changelogs. Consulta la versión del plugin, la política administrativa y las fuentes más recientes antes de confiar en una capacidad.

## Cómo construir un harness de forma responsable

Antes de programar un runtime propio, decide si basta con configurar Copilot, Claude Code o Codex. Un harness propio tiene sentido cuando necesitas un ciclo de ejecución, integración o política que esos productos no proporcionan.

### Componentes mínimos

1. **Descubrimiento y validación:** rutas permitidas, esquemas versionados, errores visibles, precedencia y resolución de nombres duplicados.
2. **Compositor de contexto:** reglas raíz y por ruta, petición, historial, archivos relevantes, skills activadas y presupuesto de tokens. No cargues todos los documentos en toda solicitud.
3. **Selector de modelo:** inventario permitido, capacidades, fallback explícito, límites de coste y manejo de indisponibilidad.
4. **Registro de tools:** esquemas tipados, allowlist por agente, entradas validadas, timeout, cancelación, límites de salida y errores no ocultos.
5. **Control de permisos:** identidad, autorización por herramienta/operación, sandbox, políticas de lectura/escritura/red y aprobación humana para acciones sensibles.
6. **Orquestador:** máquina de estados, asignaciones acotadas, paso de contexto mínimo, máximo de workers/profundidad, cancelación y prevención de ciclos.
7. **Ciclo de ejecución:** solicitud del modelo → validación de la llamada → autorización/aprobación → ejecución → resultado → continuación/fin.
8. **Hooks y eventos:** eventos tipados y versionados, límites de tiempo, aislamiento, salida verificable y política definida ante fallo.
9. **MCP/conectores:** servidores identificados, credenciales fuera del repositorio, permisos mínimos, confirmación para escritura y manejo de datos externos como no confiables.
10. **Trazas y evaluación:** agente/modelo/herramientas, decisiones, aprobaciones, resultados de tests, consumo y errores; redacción de secretos/datos personales.
11. **Pruebas y actualizaciones:** casos de esquema, permisos, fallo de red, prompt injection, timeout, cancelación, delegación anidada y compatibilidad entre versiones.

### Contrato de ejecución recomendado

Cada llamada de herramienta o delegación debe tener un contrato claro:

```text
Identidad: actor y rol que solicita la acción
Objetivo: operación concreta y su alcance
Entrada: datos validados y mínimos
Permiso: allow/deny/require-approval
Límites: tiempo, tamaño, red, rutas y número de llamadas
Resultado: estado, salida acotada, evidencia y error explícito
Auditoría: identificador de ejecución sin secretos en los logs
```

No uses como arquitectura suficiente un bucle que reenvía indefinidamente mensajes del modelo a comandos del sistema. El modelo no debe poder ampliar permisos, saltarse validaciones ni tratar texto externo como instrucción de sistema.

## Seguridad y operación

- Usa allowlist de herramientas y scopes, nunca una lista abierta por comodidad.
- Separa lectura y escritura; exige aprobación para despliegue, cambios de datos, acciones destructivas y efectos externos.
- Ejecuta comandos en sandbox con timeout, directorios permitidos, entorno mínimo y salida limitada.
- Mantén secretos en un gestor seguro; redáctalos antes de logs, prompts de terceros y artefactos.
- Trata issues, repositorios, páginas web y respuestas MCP como datos no confiables.
- Define qué hacer cuando falla un hook, un test, el modelo o el subagente; no conviertas el fallo en éxito.
- Registra evidencia suficiente para reproducir sin almacenar contenido sensible innecesario.

## Prueba de aceptación de un harness

| Área | Caso mínimo |
|---|---|
| Descubrimiento | Carga solo rutas soportadas y avisa por configuración inválida. |
| Contexto | Incluye reglas aplicables y omite reglas fuera de ámbito. |
| Permisos | Rechaza una tool no permitida y solicita aprobación donde corresponde. |
| Ejecución | Propaga código de salida, timeout, cancelación y error real. |
| Orquestación | Impide ciclos, exceso de workers y delegación fuera de allowlist. |
| Seguridad | Resiste instrucciones maliciosas en contenido externo y protege secretos. |
| Observabilidad | Permite conocer qué pasó sin exponer credenciales o datos personales. |
| Calidad | Verifica comportamiento con pruebas automatizadas y revisión humana. |

## Fuentes

- [Harnesses de agentes en VS Code](https://code.visualstudio.com/docs/agents/run/agent-harnesses)
- [Referencia de agentes de VS Code](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)
- [Referencia de instructions](https://code.visualstudio.com/docs/agents/reference/custom-instructions-reference)
- [Agent Skills Specification](https://agentskills.io/specification)
