# Mapa de lectura sencillo

## En 15 minutos
1. Lee `01-modelo-mental.md`.
2. Usa el árbol de decisión.
3. Copia una plantilla de `templates/`.
4. Valida con `evaluation/`.
5. Revisa el kit de personalizaciones: `.github/agents/customization-coordinator.agent.md` y las skills `.github/skills/agent-design`, `skill-authoring`, `hook-authoring` y `harness-selection`.

## En una tarde
Lee agentes, instructions, skills, hooks, MCP y harnesses en ese orden. Prueba el hook Copilot de `examples/hooks/copilot/` solo después de revisarlo y copiar su configuración voluntariamente a `.github/hooks/`. Después monta el laboratorio de `examples/lab-java-angular/`.

## Regla de oro
- **Instructions** dicen las reglas.
- **Agent** decide y coordina un rol.
- **Skill** enseña un procedimiento reutilizable.
- **Prompt file** inicia una tarea repetida.
- **Hook** ejecuta una comprobación determinista.
- **MCP** conecta herramientas y datos externos.
- **Harness** es el entorno que descubre, carga y ejecuta todo lo anterior.
