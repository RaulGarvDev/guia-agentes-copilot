# Agentes personalizados

Un agente es un perfil reutilizable para un rol: define identidad, objetivo, instrucciones, herramientas y, según el harness, delegación, modelo y transiciones. No es una persona autónoma ni una frontera de seguridad por sí misma.

## Cuándo crear uno

- Hay un rol repetido que necesita instrucciones, herramientas o salida específicas.
- La tarea se beneficia de separar responsabilidades (planificar, implementar, revisar).
- Hace falta fijar un nivel de autoridad distinto para cada fase.

No crees un agente para una regla permanente (instructions), una secuencia reutilizable con recursos (skill) o una petición puntual (prompt file). Busca primero una personalización existente.

## Ubicación y archivo

En VS Code/Copilot, el agente de workspace suele residir en:

```text
.github/agents/<nombre>.agent.md
```

El usuario y la organización pueden tener ubicaciones propias. Claude Code, Codex, GitHub Copilot cloud y otras superficies pueden descubrir ubicaciones o esquemas distintos. Comprueba [Harnesses](./08-harnesses.md) y el formato de la versión objetivo.

## Opciones de frontmatter

La cabecera YAML va entre dos líneas `---`; el cuerpo describe el rol. Los campos y su interpretación dependen del harness. Esta tabla resume el esquema actual de VS Code; no significa que todos los campos funcionen en cada superficie.

| Campo | Uso | Alcance / cautela |
|---|---|---|
| `name` | Nombre que aparece en la interfaz; si falta, suele derivarse del archivo. | Compartido con matices del harness. |
| `description` | Qué hace y cuándo usarlo. | Requerido por el esquema Copilot; debe ser concreto para facilitar selección. |
| `argument-hint` | Ayuda sobre la entrada esperada. | Local de VS Code; no asumir soporte Copilot/cloud. |
| `tools` | Herramientas disponibles para el agente. | Nombres y alias dependen del harness. Omitirlo puede habilitar más herramientas de las deseadas; configurar desde el selector y verificar. |
| `agents` | Limita los agentes que puede invocar como subagentes. | Local de VS Code; requiere herramienta `agent`. `['*']` permite todos, `[]` ninguno. |
| `model` | Modelo o lista de modelos preferidos. | Disponibilidad, fallback y orden varían. No fijarlo salvo necesidad comprobada. |
| `model-policy` | Preferencia/requisito de modelo (`preferred` o `required`). | Reconocido por el esquema Copilot del editor; verificar si el runtime lo aplica. |
| `reasoning-effort` | Esfuerzo de razonamiento. | Copilot y modelos compatibles; valores admitidos varían. |
| `skills` | Skills que se cargan para el agente. | Copilot; validar los nombres en el inventario del mismo harness. |
| `deferred-tool-loading` | Carga diferida de herramientas. | Opción del esquema Copilot; comprobar disponibilidad y comportamiento en el cliente. |
| `strict-tools-list` | Evita agregar herramientas estándar no enumeradas. | Opción Copilot; no sustituye revisión de permisos del runtime. |
| `include-custom-instructions` | Controla inclusión de instrucciones de repositorio. | Opción Copilot; probar la inclusión en la superficie usada. |
| `github` | Configuración GitHub MCP, incluidos `toolsets`/`permissions`. | Específico de Copilot; requiere validar esquema y permisos. |
| `mcp-servers` | Servidores MCP asociados al perfil. | Soporte específico de Copilot/cloud; no portable automáticamente. |
| `hooks` | Hooks asociados al agente. | Eventos, permisos y ejecución dependen del harness. |
| `handoffs` | Transiciones sugeridas a otros agentes. | En el esquema VS Code Local; no asumir que equivale a delegar o que funciona en cloud. |
| `user-invocable` | Visibilidad en el selector manual. | Por defecto `true` en VS Code. Ocultarlo no impide necesariamente delegación. |
| `disable-model-invocation` | Impide que otros agentes lo invoquen como subagente. | Distinto de la visibilidad manual; por defecto `false` en VS Code. |
| `target` | Selecciona cómo interpreta el editor el frontmatter (`vscode` o `github-copilot`). | No cambia el harness de la sesión. |
| `advancedOptions` | Opciones avanzadas del agente. | Solo Local; no usar sin conocer el esquema concreto. |
| `infer` | Campo legado para disponibilidad/invocación. | Deprecado; utiliza `user-invocable` y `disable-model-invocation`. |

Los campos específicos de harness se documentan para dar contexto; el ejemplo completo de este repositorio usa el harness **Local de VS Code**. Para Copilot u otro runtime, conserva el contrato del agente y adapta la cabecera con su editor/esquema.

## Plantilla mínima portable

```markdown
---
name: Reviewer
description: Revisa cambios para detectar errores de comportamiento y pruebas ausentes, sin modificar archivos.
---

# Responsabilidad
Devuelve hallazgos accionables y evidencia.

# Entrada
Petición, criterios de aceptación y diff o archivos relevantes.

# Límites
- No edites archivos.
- No afirmes haber ejecutado comandos que no se ejecutaron.
- No amplíes la revisión a cambios ajenos al alcance.

# Proceso
1. Lee criterios, diff y código/tests relacionados.
2. Comprueba comportamiento, errores y cobertura.
3. Cita archivo y línea para cada hallazgo.
4. Separa defectos de sugerencias y declara lo no verificado.

# Salida
Hallazgos priorizados, pruebas ausentes, límites de la revisión y veredicto.
```

## Reglas de diseño

1. **Una responsabilidad principal.** Define entrada, resultado y condición de parada.
2. **Autoridad mínima.** Selecciona solo lectura/búsqueda para planificadores y revisores; edición solo para implementadores. Añade terminal, MCP o herramientas externas únicamente cuando sean imprescindibles.
3. **Separación real de fases.** El implementador no se autoaprueba; el revisor no edita.
4. **Instrucciones específicas.** Mantén convenciones globales en instructions y procedimientos largos en skills.
5. **Salida evaluable.** Pide evidencias, cambios, pruebas ejecutadas/no ejecutadas, riesgos y veredicto.
6. **Descripción de activación.** Incluye dominio, tarea y cuándo no usarlo.
7. **Compatibilidad explícita.** Indica qué campos dependen del harness y no prometas portabilidad automática.
8. **Prueba negativa.** Comprueba que no se activa para tareas cercanas fuera de su rol.

## Ejemplo: coordinador Local con delegación permitida

```yaml
---
name: Coordinador
description: Coordina una tarea de software mediante planificación, implementación y revisión independiente, con delegación acotada.
target: vscode
tools: ['agent', 'read', 'search']
agents: ['Planificador Spring Angular', 'Implementador Legacy', 'Revisor Legacy', 'Revisor Seguridad']
---
```

El cuerpo de este agente está en [`coordinator.agent.md`](../.github/agents/coordinator.agent.md). La configuración está dirigida al harness Local de VS Code: el campo `agents` y la herramienta `agent` no son una configuración universal.

## Verificación

1. Selecciona el harness previsto y comprueba que el agente se descubre sin errores YAML.
2. Verifica qué herramientas quedaron realmente habilitadas; una instrucción de “no editar” no revoca permisos.
3. Prueba una petición positiva y otra negativa.
4. Comprueba delegación, archivos modificados, llamadas a tools, pruebas y formato de salida.
5. Prueba un caso en que falte una herramienta o falle un test; debe informarse, no presentarse como éxito.
6. Repite al actualizar la extensión, los modelos, el harness o los permisos organizativos.

## Fuentes

- [Referencia de archivos de agentes de VS Code](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)
- [Crear y verificar agentes de VS Code](https://code.visualstudio.com/docs/agent-customization/custom-agents)
- [Subagentes en VS Code](https://code.visualstudio.com/docs/agents/run/subagents)
