---
name: harness-selection
description: Compara o selecciona un harness para una sesión de agente según ejecución, instrucciones, tools, hooks, skills y permisos. Úsala al configurar VS Code, IntelliJ u otro runtime.
---

# Selección de harness

## Procedimiento
1. Aclara host/IDE, ejecución deseada (local, background o cloud), proveedor/cuenta y restricciones organizativas.
2. Separa host, harness, agente, modelo y destino de ejecución; cambiar modelo no cambia harness.
3. Compara los runtimes que el producto ofrece actualmente y comprueba requisitos de extensión, licencia, red, acceso a archivos y políticas.
4. Verifica las rutas de personalizaciones, esquema, herramientas, delegación, skills, hooks, MCP y controles de aprobación de cada harness.
5. Escoge el menor cambio que satisfaga la tarea. Si la portabilidad importa, mantén un contrato común en Markdown y adaptadores con frontmatter/configuración por harness.
6. Prueba una tarea inocua en una sesión nueva; comprueba qué instrucciones se cargaron, qué tools estuvieron disponibles, y qué acciones/permisos se aplicaron.
7. Repite la prueba en cada IDE/runtime de destino antes de documentar compatibilidad.

## Reglas
- No inferir el harness a partir del modelo elegido.
- No llamar “Local” a cualquier ejecución en la máquina: es el nombre de un harness específico.
- Distinguir el harness de la ubicación del agente y del objetivo Cloud.
- Tratar preview/GA como estado versionado, sujeto a políticas y fecha de consulta.
- Si falta evidencia, marca el soporte como pendiente de validar, no como compatible.

## Salida
Recomienda harness y host; explica por qué, alternativas realmente comparadas, limitaciones, configuración y prueba mínima que confirma descubrimiento y permisos.

## Referencias
- [Harnesses](../../../docs/08-harnesses.md)
- [Diferencias VS Code e IntelliJ](../../../docs/13-chuleta.md)
- [Harnesses de VS Code](https://code.visualstudio.com/docs/agents/run/agent-harnesses)
