---
name: skill-authoring
description: Crea, valida o mejora una Agent Skill con instrucciones, scripts, referencias y recursos. Úsala cuando se pida un procedimiento reusable cargado bajo demanda.
---

# Autoría de Agent Skills

## Procedimiento
1. Decide si el requisito es un procedimiento ocasional reusable; si es una regla global, usa instructions, y si exige herramientas/permisos propios, usa un agente.
2. Revisa el inventario actual y el estándar Agent Skills; confirma harness y carpeta destino antes de editar.
3. Crea `SKILL.md` dentro de una carpeta cuyo nombre coincida con `name`.
4. Incluye solo los campos estándar necesarios: `name` y `description` son obligatorios; `license`, `compatibility`, `metadata` y `allowed-tools` son opcionales. No trates `allowed-tools` como frontera de permisos.
5. Haz que `description` explique resultado y activación, con términos que el agente pueda reconocer.
6. En el cuerpo, declara propósito, entrada, precondiciones, pasos, decisiones, casos límite, errores, seguridad, verificación y salida.
7. Mantén detalle bajo demanda en `references/`; usa `scripts/` solo si elimina trabajo determinista repetido y explica dependencias/errores; añade `assets/` solo para recursos estáticos.
8. Enlaza recursos con rutas relativas, mantén la cadena de referencias sencilla y no cargues contenido innecesario.
9. Valida frontmatter y convención de nombre; si existe `skills-ref`, ejecuta `skills-ref validate <directorio>`.
10. Prueba activación positiva y negativa en el harness real y confirma que la skill no afirma resultados no verificados.

## Límites
- No copies documentación ajena completa; resume, cita fuentes y respeta las licencias.
- No incluyas secretos ni rutas de usuario locales.
- No añadas campos exclusivos de agents/instructions al frontmatter estándar de skills.
- No afirmes que una validación del estándar prueba descubrimiento o activación del runtime.

## Salida
Resume ruta/nombre, condición de activación, recursos, validación de formato, resultado de pruebas de activación y compatibilidad pendiente.

## Referencias
- [Guía de skills de este repositorio](../../../docs/04-skills.md)
- [Agent Skills Specification](https://agentskills.io/specification)
