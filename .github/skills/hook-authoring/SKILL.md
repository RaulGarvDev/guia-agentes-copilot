---
name: hook-authoring
description: Diseña, implementa, prueba o revisa hooks para agentes de IA, incluidos eventos, JSON, scripts y permisos. Úsala al automatizar o controlar acciones deterministas del ciclo.
---

# Autoría segura de hooks

## Procedimiento
1. Pregunta qué evento debe activar el hook, qué debe hacer y qué harness lo ejecutará.
2. Busca un ejemplo y documentación del mismo harness/versionado. No mezcles `PreToolUse`/`SessionStart` con `preToolUse`/`sessionStart`: los eventos y esquemas son distintos entre runtimes.
3. Usa un hook solo para una acción determinista; deja el razonamiento al agente y las garantías críticas al control de permisos/CI.
4. Define explícitamente los datos de entrada, salida, efecto, dependencias, directorio de trabajo, variables, timeout y comportamiento ante error.
5. Valida entradas como JSON no confiable; nunca construyas comandos concatenando texto del payload.
6. Minimiza los datos leídos/escritos. No registres prompts, argumentos completos, tokens, datos personales ni resultados sensibles.
7. Separa configuración y scripts; un ejemplo debe vivir en `examples/` y no activarse automáticamente. Explica cómo copiarlo a una ubicación activa.
8. Evita conceder permisos con una respuesta automática `allow`. Si el hook afecta una decisión de permisos, verifica el contrato exacto del runtime y busca comportamiento de fallo seguro.
9. Prueba entrada válida, JSON malformado, evento inesperado, fallo del proceso, timeout y comportamiento inocuo; valida que stdout contiene únicamente la respuesta definida por el protocolo.
10. Prueba en cada SO, contenedor, remote/Cloud o IDE previsto. Node/Python/Bash/PowerShell y rutas disponibles varían.

## Salida
Explica harness/evento, archivo de configuración, script/dependencias, campos del payload usados, efectos secundarios, códigos de salida, riesgos, pruebas realizadas y pasos para activarlo de forma voluntaria.

## Referencias
- [Hooks y diferencias por harness](../../../docs/06-hooks.md)
- [GitHub Copilot hooks reference](https://docs.github.com/copilot/reference/hooks-reference)
- [Hooks de VS Code](https://code.visualstudio.com/docs/agent-customization/hooks)
