---
name: maven-test-summary
description: Ejecuta tests Maven dirigidos y resume fallos de Surefire. Úsala al validar cambios Java 11 o investigar tests fallidos.
---
# Entrada
Módulo, clase o test objetivo.
# Flujo
1. Detecta wrapper `mvnw`; si falta, usa `mvn` solo si está disponible.
2. Ejecuta primero el test específico.
3. Conserva código de salida.
4. Lee `target/surefire-reports` si existe.
5. Resume test, mensaje raíz y primer marco del proyecto.
# Límites
No uses `-DskipTests`, no borres repositorios Maven y no inventes resultados.
# Salida
Comando, código, tests/fallos/errores/omitidos, causas y próximo paso.
