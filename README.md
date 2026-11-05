# Guía definitiva y sencilla de agentes de IA para desarrollo

Empieza por `docs/00-mapa-lectura.md`. Después usa `MANUAL-CREACION-AGENTES.md` como referencia amplia.

Incluye un kit de ejemplo para coordinar la creación y revisión de agentes, instructions, skills y hooks; además cubre prompt files, MCP, subagentes, handoffs, harnesses, seguridad, trazas, evaluación, coste y un laboratorio Java 11 + Spring Boot + Angular + Oracle.

## Personalizaciones de ejemplo

- Coordinador y workers de solo lectura/implementación/revisión en `.github/agents/`.
- Skills para diseñar agentes, autorar skills y hooks, y seleccionar un harness en `.github/skills/`.
- Ejemplo de hook Copilot y test aislado en `examples/hooks/copilot/`. No está instalado como hook activo; revisa el script antes de copiar la configuración a `.github/hooks/`.
- Instrucciones globales y por rutas en `.github/copilot-instructions.md` y `.github/instructions/`.

## Aviso
Los nombres de tools, eventos de hooks y algunos campos de IDE no son universales. Todo ejemplo dependiente de versión está marcado para revalidación.

## Licencia
Este repositorio no incluye una licencia. La publicación como público no concede por sí sola permiso para reutilizar, modificar o redistribuir su contenido.
