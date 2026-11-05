# Contribuir a la guía

- Escribe en español la documentación; conserva en inglés código, rutas, campos YAML, nombres de productos y comandos.
- Distingue los esquemas por harness y enlaza fuentes oficiales cuando describas campos, permisos, eventos o disponibilidad.
- No presentes una instrucción como un control de seguridad ni una configuración local como universal.
- Antes de añadir una personalización, busca una pieza existente que pueda ampliarse sin duplicar comportamiento.
- Mantén los ejemplos acotados, sin secretos, datos personales ni dependencias innecesarias.
- Los hooks de `examples/` son inactivos hasta que el usuario los copie a una ubicación descubierta por el harness; explica efectos y precondiciones antes de activarlos.
- Tras modificar agents, skills, hooks o instrucciones, valida su YAML/JSON, enlaces locales y activación en el harness objetivo cuando esté disponible.
- Informa explícitamente de las pruebas no ejecutadas, los límites del harness y las decisiones que aún requieren confirmación.
