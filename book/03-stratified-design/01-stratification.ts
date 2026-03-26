/**
 * DISEÑO ESTRATIFICADO (Capas de abstracción funcional)
 * El libro nos sugiere dividir nuestras funciones en capas:
 * 1. Capa de Dominio (Lógica pura de negocio)
 * 2. Capa de Abstracción de Datos (Transformaciones de tipos)
 * 3. Capa Base (Funciones utilitarias)
 */

// --- Capa Base ---
// Funciones genéricas que podríamos usar en cualquier lugar.
export const sum = (a: number, b: number) => a + b;
export const multiply = (a: number, b: number) => a * b;

// --- Capa de Abstracción de Datos ---
// Cómo se manipulan las estructuras de datos de nuestro dominio.
export const getTransactionTotal = (amount: number, igv: number) => sum(amount, igv);

// --- Capa de Dominio ---
// Reglas específicas de nuestro negocio.
export const calculateBusinessTax = (amount: number) => multiply(amount, 0.18);

/**
 * 🧠 LECCIÓN:
 * El diseño estratificado te permite:
 * - CAMBIAR la lógica de negocio sin tocar las funciones base.
 * - REUTILIZAR funciones base en múltiples dominios.
 * - LEER el código de arriba hacia abajo (las funciones de arriba usan las de abajo).
 */
