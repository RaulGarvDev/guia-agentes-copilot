---
name: agent-design
description: Diseña o mejora un agente personalizado, su frontmatter, permisos, subagentes y salida. Úsala al crear coordinadores, planificadores, implementadores o revisores en un harness concreto.
---

# Diseño de agentes

## Cuándo usar
- Crear un agente reusable para un rol o coordinador.
- Revisar descripción, campos YAML, herramientas, delegación o límites.

## Procedimiento
1. Inspecciona agentes existentes, instrucciones, skills y evaluación; reutiliza un perfil si ya cubre la responsabilidad.
2. Identifica el harness exacto y verifica ubicación, frontmatter, herramientas e invocación con su documentación actual.
3. Escribe el contrato antes del perfil:
   - entrada y contexto requerido;
   - resultado y condición de parada;
   - responsabilidades y exclusiones;
   - acciones permitidas y prohibidas;
   - formato de salida y evidencia esperada.
4. Mantén una responsabilidad principal por perfil. En un flujo de varios roles, separa planificar, editar y revisar.
5. Da al agente el mínimo de herramientas. No omitas `tools` en un perfil de solo lectura si el harness interpreta la omisión como todas las herramientas.
6. Escribe una `description` específica: dominio, tarea, desencadenantes y, si ayuda, cuándo no usarlo.
7. Usa `agents`, `handoffs`, `skills`, `model` u opciones avanzadas solo si el harness seleccionado los admite y hay una necesidad comprobada.
8. Comprueba los campos de YAML y que nombres/valores coinciden con los agentes o skills disponibles.
9. Evalúa una tarea positiva, una tarea cercana que no debe activar el perfil, un fallo de herramienta y un caso de permisos.

## Reglas del coordinador
- Delega encargos autosuficientes: objetivo, contexto mínimo, alcance, límites, salida, validación y parada.
- Limita workers y paraleliza solo tareas independientes.
- No permitas ediciones concurrentes sobre los mismos archivos.
- Aísla la revisión final de la implementación y termina tras un número acotado de rondas.
- Si no hay subagentes en el harness, ejecuta el handoff manualmente y no finjas delegación.

## Seguridad y salida
Los límites del prompt no reemplazan permisos del harness. Para cada herramienta y agente delegado, valida autoridad real, aprobaciones, timeout, efectos externos y datos transmitidos.

Entrega: ubicación, harness/compatibilidad, frontmatter validado, objetivo y límites, herramientas necesarias, casos de evaluación, resultados observados y aspectos pendientes.

## Referencias
- [Opciones y plantilla por harness](../../../docs/02-agentes.md)
- [Coordinación y handoffs](../../../docs/09-subagentes-handoffs.md)
- [Referencia de agentes de VS Code](https://code.visualstudio.com/docs/agents/reference/custom-agent-file-reference)
