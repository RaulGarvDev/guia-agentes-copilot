---
name: Personalizaciones de agentes
description: Usa estas reglas al crear o editar agentes, skills, instrucciones, hooks o ejemplos de harness.
applyTo: ".github/agents/**/*.agent.md, .github/skills/**/SKILL.md, .github/instructions/**/*.instructions.md, examples/hooks/**/*"
---

- Identifica primero el harness destino y usa únicamente los campos/documentos que admite.
- Mantén responsabilidades separadas: planificar no edita, implementar no autoaprueba y revisar no modifica.
- Minimiza herramientas, MCP, permisos, variables de entorno y datos compartidos con cada agente.
- Las skills siguen el estándar Agent Skills salvo que el ejemplo indique explícitamente una extensión del harness.
- Un hook que ejecuta comandos debe declarar evento, efecto, entradas, dependencias, timeout, manejo de errores y cómo probarlo.
- No hagas que un ejemplo de hooks se ejecute automáticamente al clonar el repositorio; mantenlo en `examples/` hasta que se solicite activarlo.
- Prueba entradas válidas, inválidas y adversariales sin incluir secretos en argumentos ni logs.
- No afirmes que parsear el archivo demuestra descubrimiento, permisos o ejecución correcta.
