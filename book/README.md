# Grokking Simplicity: Guía Práctica de Modelado Funcional

Bienvenido a esta guía práctica. Aquí aprenderás a modelar un dominio de software de forma simple, tal como lo enseña Eric Normand en su libro **Grokking Simplicity**.

## 🧠 Los Tres Pilares (A-C-D)

Todo el código que escribes se puede clasificar en una de estas tres categorías:

1.  **Acciones (Actions):** Dependen de *cuándo* o *cuántas veces* se ejecutan. Tienen efectos secundarios (DB, API, IO). Son el "músculo" que hace que las cosas sucedan.
2.  **Cálculos (Calculations):** Son funciones puras. Dada la misma entrada, siempre dan la misma salida. No tienen efectos secundarios. Son el "cerebro" donde vive la lógica.
3.  **Datos (Data):** Son hechos inertes. No ejecutan nada. Representan la realidad.

---

## 📂 Contenido de esta guía

-   `01-actions-calculations-data/`: Aprende a identificar y separar la lógica pura del efecto secundario.
-   `02-modeling-domain/`: Cómo convertir reglas de negocio complejas en cálculos simples sobre datos.
-   `03-stratified-design/`: Cómo organizar tus cálculos en capas de abstracción para que sean fáciles de cambiar.
-   `04-functional-architecture/`: Cómo unir todo esto en una aplicación real (como la que estamos construyendo).
-   `05-higher-order-abstractions/`: Cómo usar funciones de orden superior para limpiar patrones repetitivos.
-   `06-functional-iteration/`: Dominando Map, Filter y Reduce para transformar datos de dominio.
-   `07-timelines-side-effects/`: Cómo gestionar la concurrencia y evitar condiciones de carrera.
-   `08-onion-architecture/`: El diseño definitivo: Empujando los efectos secundarios a los bordes.
-   `09-idempotency/`: Cómo hacer que tus acciones sean seguras aunque se repitan por error.
-   `10-reactive-architecture/`: El modelo de "hoja de cálculo" para arquitecturas reactivas.
-   `11-testing-functional/`: Estrategias para testear cálculos, acciones y datos.
-   `12-domain-data-modeling/`: Por qué los datos son superiores a los objetos complejos.
-   `13-onion-vs-layered/`: Comparativa entre arquitecturas tradicionales y funcionales.
-   `14-functional-state-management/`: Gestión de estado inmutable mediante Reducers.
-   `15-domain-driven-design-functional/`: DDD aplicado con un enfoque de datos y funciones.
-   `16-advanced-refactoring-case-study/`: De código "sucio" a una arquitectura pura paso a paso.
-   `17-composition-patterns/`: Cómo combinar funciones simples (Cálculos) para construir lógica compleja mediante tuberías (Pipes).
-   `18-distributed-systems-functional/`: Resiliencia en la nube: Manejo de eventos y acciones compensatorias.
-   `19-performance-optimization/`: Superpoderes funcionales: Memoización y Batching de Cálculos puros.
-   `20-final-project-blueprint/`: El diseño perfecto: Flujo de datos, validación y persistencia unificados.

## 🚀 Cómo usar este código

Este no es un código de producción, es un **recurso educativo**. Lee los archivos en orden y presta atención a los comentarios. El objetivo es que aprendas a ver el código de una forma diferente: **refactorizando acciones hacia cálculos**.

¡Felicidades por completar los 20 módulos de la enciclopedia funcional! 🚀
