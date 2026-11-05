# MCP

MCP conecta el harness con servidores que exponen tools y recursos.

## Cuándo usarlo
- Jira: leer issue y actualizar estado con aprobación.
- SonarQube: consultar quality gate e incidencias.
- Confluence: buscar ADR y estándares.
- Oracle: solo mediante un servidor controlado, credenciales de mínimo privilegio y consultas permitidas.

## Seguridad
1. Empieza read-only.
2. Separa servidores de lectura y escritura.
3. No guardes tokens en Git.
4. Usa variables de entorno o almacén seguro.
5. Exige confirmación para acciones externas.
6. Registra invocaciones y errores sin datos sensibles.

## Límite
MCP ofrece capacidad, no procedimiento. Combínalo con una skill que describa orden, validaciones y salida.
