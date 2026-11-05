# Instructions: reglas estables del proyecto

Las instructions aportan contexto y convenciones al agente; no crean un rol, no describen por sí solas un flujo completo y no son un control de seguridad determinista. Define el mínimo que debe repetirse entre tareas.

## Elegir tipo y ubicación

La ruta descubierta depende del harness. Ubicaciones habituales:

| Tipo | GitHub Copilot / VS Code | Otros harnesses |
|---|---|---|
| Proyecto, reglas generales | `.github/copilot-instructions.md`; `AGENTS.md` en superficies compatibles | `AGENTS.md` (Codex y otros compatibles), `CLAUDE.md` (Claude Code) |
| Proyecto, reglas por archivos | `.github/instructions/*.instructions.md` | `.claude/rules/*.md` y rutas compatibles del harness |
| Usuario | `~/.copilot/...` u opciones del perfil | Directorios propios de cada runtime |
| Organización | Configuración central disponible en la superficie | Varía por producto y plan |

No crees dos archivos raíz que se contradigan solo para cubrir varios harnesses. Si hay varias copias por compatibilidad, declara cuál es la fuente y valida que se mantengan sincronizadas.

## Archivo global de proyecto

Los archivos de proyecto suelen ser Markdown sin frontmatter. Incluye:

- stack y versiones reales;
- arquitectura y rutas canónicas;
- comandos reales de build, lint y test;
- convenciones de nombres y diseño que no se deducen del código;
- requisitos de compatibilidad y restricciones legacy;
- límites de seguridad y datos sensibles;
- definición de qué validar y cómo reportar resultados.

Evita listas de reglas obvias, datos que cambian continuamente, instrucciones por rol, procedimientos largos y duplicados. Esos contenidos van mejor en el agente, una skill o documentación de referencia.

## Instructions por ruta

En VS Code, un archivo `*.instructions.md` puede llevar estos campos:

| Campo | Requerido | Función |
|---|---:|---|
| `name` | No | Nombre visible; por defecto se deriva del archivo. |
| `description` | No | Relevancia de tarea para carga bajo demanda en el harness Local. No sustituye a `applyTo`. |
| `applyTo` | No | Uno o más patrones glob separados por comas. Si se omite, no hay activación automática por patrón. |

Ejemplo:

```yaml
---
name: Pruebas Java
description: Convenciones al crear o cambiar pruebas Java.
applyTo: "backend/src/test/**/*.java"
---
- Usa la versión de JUnit y Mockito configurada en el módulo.
- Reutiliza fixtures existentes y prueba éxito, errores y límites pertinentes.
- Ejecuta el test dirigido con el wrapper documentado.
```

El campo `excludeAgent` y otros campos pueden aparecer en configuraciones de GitHub específicas; no son una forma universal de seleccionar harness ni se deben copiar sin validar la referencia del runtime.

## Globs, ámbito y activación

Los patrones se definen respecto a la raíz del workspace/proyecto, no respecto a la carpeta `instructions`. Usa `/` en todas las plataformas y prueba cada patrón contra rutas reales:

| Patrón | Coincide con | No coincide con |
|---|---|---|
| `*.java` | `User.java` en raíz | `src/User.java` |
| `src/*.java` | `src/User.java` | `src/domain/User.java` |
| `src/**/*.java` | `src/User.java`, `src/domain/User.java` | `test/UserTest.java` |
| `**/*.ts, **/*.html` | TS y HTML a cualquier profundidad | CSS |
| `**` | Todos los archivos | Ninguno |

La existencia del archivo, su inclusión en el contexto y el seguimiento por parte del modelo son cosas distintas. Comprueba descubrimiento, referencias/inclusión y comportamiento con una tarea real.

## AGENTS.md y reglas de Claude

`AGENTS.md` es un formato de instrucciones Markdown, no un agente personalizado. La cadena y el alcance de archivos anidados dependen del harness y de la carpeta de trabajo. VS Code Local puede requerir activar `chat.useAgentsMdFile` y, para reglas anidadas, `chat.useNestedAgentsMdFiles`.

Las reglas de Claude en `.claude/rules/*.md` pueden usar `paths` en lugar de `applyTo`:

```yaml
---
paths:
  - "backend/src/**/*.java"
---
Usa las convenciones del módulo y sus pruebas existentes.
```

No mezcles `paths` y `applyTo` suponiendo que todos los runtimes entienden ambos.

## Qué evitar

- Reglas contradictorias entre el archivo raíz, reglas anidadas, agents y perfiles personales.
- Glob no probado o demasiado amplio.
- Comandos inventados o dependientes de una máquina.
- Criterios vagos como “sigue buenas prácticas” sin evidencia verificable.
- Prometer que una instrucción bloquea escritura, despliegues o exposición de secretos.

## Verificación

1. Selecciona el harness objetivo y revisa sus ubicaciones admitidas.
2. Comprueba que el archivo aparece en el editor/diagnóstico de instrucciones.
3. Prueba un cambio pequeño que deba seguir una regla sin repetirla en la petición.
4. Prueba una ruta que deba quedar fuera del glob.
5. Examina el contexto aplicado, los cambios y las tools; usa permisos, hooks y CI para garantías reales.

## Fuentes

- [Referencia de instructions de VS Code](https://code.visualstudio.com/docs/agents/reference/custom-instructions-reference)
- [Uso de custom instructions en VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions)
- [Harnesses](./08-harnesses.md)
