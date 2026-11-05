# Hooks: automatización determinista del ciclo

Un hook es un comando externo que se ejecuta ante un evento del agente: inicio, envío de petición, uso de herramienta, error o fin de sesión, según el runtime. Sirve para validaciones o automatización determinista; no es una instrucción que el modelo pueda ignorar. Aun así, el hook solo hace cumplir lo que su entorno, permisos y código implementan.

## El formato depende del harness

| Superficie | Formato y ubicación | Consideraciones |
|---|---|---|
| Copilot en VS Code, harness `Copilot` | Configuración JSON v1 en `.github/hooks/*.json`, creada desde **Agent Customizations → Hooks** o a mano. También hay configuraciones personales. | Usa eventos de Copilot como `preToolUse` y su contrato de entrada/salida. VS Code, Copilot CLI y Copilot cloud comparten el formato de Copilot, aunque soporte de eventos y entorno difieren. |
| VS Code, harness `Local` | Configuración propia de hooks Local en Agent Customizations o configuración del agente. | No interpretes automáticamente el JSON v1 de Copilot como configuración Local; selecciona el harness y consulta su referencia. |
| Copilot CLI / cloud | `.github/hooks/*.json`, v1. | CLI corre en el entorno local y admite los eventos documentados; cloud ejecuta hooks en Linux efímero y soporta un subconjunto de eventos/campos. |
| IntelliJ / JetBrains | Hooks del plugin de GitHub Copilot, con disponibilidad, eventos y políticas dependientes de la versión. | El changelog de marzo de 2026 los marcó preview; verifica plugin, política de empresa y documentación actual antes de habilitarlos. |
| Claude Code, Codex u otro runtime | Formatos nativos de cada herramienta. | No reutilices eventos, payloads, códigos de salida ni nombres de herramientas sin verificar compatibilidad. |

En VS Code, selecciona el harness `Copilot` para usar los hooks del runtime Copilot. La selección `Local` tiene un formato distinto. Un campo `target` en un agente no elige el harness de sesión. El harness se explica en [Harnesses](./08-harnesses.md).

## Ejemplo didáctico completo (Copilot)

El ejemplo [hooks.example.json](../examples/hooks/copilot/hooks.example.json) configura `preToolUse`; ejecuta [log-tool-use.cjs](../examples/hooks/copilot/log-tool-use.cjs). El script:

- recibe un objeto JSON en stdin;
- valida que contenga `toolName`;
- escribe únicamente el nombre de la herramienta a stderr, no sus argumentos;
- devuelve `{}` en stdout, por lo que **no concede ni deniega permisos**.

La configuración permanece en `examples/` y no se ejecuta al abrir el repositorio. Para probarla voluntariamente:

1. Revisa script, configuración y dependencia Node.js.
2. Ejecuta `node examples/hooks/copilot/test-log-tool-use.cjs`.
3. Si decides probar el hook real, copia el JSON a `.github/hooks/tool-audit.json`; deja la ruta del script relativa a la raíz del repositorio.
4. Abre una sesión nueva con harness `Copilot` y usa una tarea inocua que invoque una herramienta.
5. Inspecciona la salida de diagnóstico y comprueba que la petición sigue su flujo habitual de permisos.
6. Elimina la configuración copiada cuando termines. No confundas una prueba de formato local con validación en IntelliJ, Cloud, contenedor o VS Code `Local`.

No habilites hooks solo por instalar/clonar el repositorio. Cualquier JSON dentro de la ubicación activa puede ejecutar comandos en el entorno del agente.

## Opciones de Copilot hooks

### Eventos y tipos

Copilot documenta hooks `command`, `http` y `prompt`, además de eventos de sesión, prompt, herramientas, permisos, compactación, errores y finalización. Los nombres exactos y si la salida puede cambiar el flujo dependen del evento y la superficie. Consulta [GitHub Copilot hooks reference](https://docs.github.com/copilot/reference/hooks-reference); no copies payloads de una tabla antigua.

- **Command:** ejecuta un script/proceso con stdin JSON; recibe como máximo un objeto JSON protocolario en stdout. Deja mensajes de diagnóstico en stderr.
- **HTTP:** envía el payload a una URL; usa HTTPS, especialmente cuando una respuesta pueda afectar permisos. Requiere validar destino, allowlist de red y datos transmitidos.
- **Prompt:** introduce un prompt en los eventos/superficies que lo admiten; no es un sustituto de un hook de política.

### Configuración command v1

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      {
        "type": "command",
        "bash": "node examples/hooks/copilot/log-tool-use.cjs",
        "powershell": "node examples/hooks/copilot/log-tool-use.cjs",
        "cwd": ".",
        "timeoutSec": 10
      }
    ]
  }
}
```

Los comandos admiten `bash`, `powershell` o `command` como fallback, además de `cwd`, `env` y `timeoutSec`. `exec` + `args` es una opción de Copilot CLI; no la presentes como portable a cloud/IDE. Cloud es Linux y no ejecuta `powershell`; documenta las dependencias disponibles en cada destino.

`preToolUse` puede exponer decisiones de permiso en determinados runtimes, pero el formato exacto no es común a todos los eventos. No uses una respuesta `allow` como atajo y no asumas que `exit 0` aprueba: sigue la referencia del runtime para el evento seleccionado.

## Diseño seguro

1. Declara evento, harness, efecto esperado, dependencias, ruta, timeout, entradas y salida.
2. Valida estructura y tipos del payload; trátalo como dato no confiable.
3. Usa argumentos estructurados y evita construir una orden shell concatenando datos del modelo.
4. No escribas secretos, prompts, argumentos completos ni resultados sensibles a logs.
5. Mantén ejemplos no activos en `examples/`. Solo instala un hook en un directorio descubierto después de revisar sus efectos.
6. Elige un comportamiento explícito ante timeout/JSON inválido/error. Nunca describas como “aplicada la política” una salida inválida que el runtime ignora.
7. Prueba payload válido, malformado, evento inesperado, fallo del proceso, timeout y los sistemas operativos/entornos previstos.
8. Revisa hooks compartidos del usuario, organización y plugins: todos pueden combinarse; no supongas que una fuente reemplaza a las otras.

Los hooks no reemplazan aislamiento, permisos de herramienta, sandbox, revisión humana, tests ni controles CI. Una expresión regular sobre una orden shell tampoco es un analizador fiable de comandos ni una frontera de seguridad.

## Fuentes

- [GitHub Copilot hooks reference](https://docs.github.com/copilot/reference/hooks-reference)
- [Hooks en VS Code](https://code.visualstudio.com/docs/agent-customization/hooks)
- [Hooks de GitHub Copilot para JetBrains (changelog)](https://github.blog/changelog/2026-03-11-major-agentic-capabilities-improvements-in-github-copilot-for-jetbrains-ides/)
