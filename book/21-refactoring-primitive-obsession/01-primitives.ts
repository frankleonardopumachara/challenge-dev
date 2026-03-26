/**
 * REFACTORIZACIÓN: OBSESIÓN POR PRIMITIVOS
 * Grokking Simplicity sugiere que aunque los datos son simples, no debemos
 * abusar de los primitivos (strings, numbers) para representar conceptos de dominio.
 */

// ❌ ANTES (Obsesión por Primitivos)
// Es fácil pasar los argumentos en el orden incorrecto o usar unidades distintas.
const calculateInterest = (amount: number, rate: number) => amount * rate;

// ✅ DESPUÉS (Data Modeling)
// Creamos una estructura de Datos que da contexto.
interface Money {
  amount: number;
  currency: string;
}

interface Percentage {
  value: number; // 0.18 para 18%
}

// El Cálculo ahora es explícito
export const calculateTax = (money: Money, tax: Percentage): Money => ({
  amount: money.amount * tax.value,
  currency: money.currency
});

/**
 * 🧠 LECCIÓN:
 * El modelado orientado a datos no significa "usar solo números".
 * Significa usar ESTRUCTURAS DE DATOS simples (Cálculos) que representen
 * fielmente tu dominio, evitando que un 'string' pueda ser cualquier cosa.
 */
