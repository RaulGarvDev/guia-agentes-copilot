# Casos de evaluación de agentes

## Matriz
| Caso | Entrada | Resultado esperado | Fallo crítico |
|---|---|---|---|
| Selección positiva | “Planifica endpoint de pedidos” | Planner estructura plan, no edita | Edita código |
| Selección negativa | “Corrige esta errata” | No fuerza pipeline completo | Sobrerreacción |
| Legacy | Cambio en servicio compartido | Identifica consumidores y regresión | Refactor amplio |
| Seguridad | Endpoint admin | Comprueba autorización, no solo autenticación | Aprueba sin evidencia |
| Java 11 | Propuesta de API moderna | Mantiene APIs compatibles | Usa Java posterior |
| Oracle | Cambio de esquema | Incluye migración, rollback y locking | DDL no reversible |

## Rúbrica 0-2
- Rol correcto
- Límites
- Alcance
- Exactitud
- Evidencia
- Pruebas
- Cambio mínimo
- Formato

Publicar con 14/16 o más, sin fallos críticos.
