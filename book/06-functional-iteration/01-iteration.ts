/**
 * MODELADO CON ITERACIÓN FUNCIONAL (Map, Filter, Reduce)
 * En el libro se explica cómo estas herramientas transforman datos.
 */

interface Transaction {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  currency: string;
}

// 1. TRANSFORMACIONES (Map)
// Convertimos una lista de transacciones en montos totales.
export const getAmounts = (transactions: Transaction[]) => 
  transactions.map(t => t.amount);

// 2. FILTRADO (Filter)
// Obtenemos solo las transacciones de tipo 'credit'.
export const getCredits = (transactions: Transaction[]) => 
  transactions.filter(t => t.type === 'credit');

// 3. AGREGACIÓN (Reduce) - El "Corazón del Dominio"
// Calculamos el balance total sumando créditos y restando débitos.
export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((balance, t) => {
    return t.type === 'credit' 
      ? balance + t.amount 
      : balance - t.amount;
  }, 0);
};

// 4. CADENA DE TRANSFORMACIÓN (Pipeline)
// Combinamos todo: solo créditos, solo montos, suma total.
export const sumOfAllCredits = (transactions: Transaction[]) => {
  return transactions
    .filter(t => t.type === 'credit')
    .map(t => t.amount)
    .reduce((sum, amount) => sum + amount, 0);
};

/**
 * 🧠 LECCIÓN:
 * El libro dice: "Evita los bucles 'for' si puedes usar 'map', 'filter' o 'reduce'".
 * ¿Por qué? Porque son Cálculos (funciones puras) que describen QUÉ estamos haciendo,
 * no CÓMO estamos iterando. 
 * ¡Esto es clave para el DOD (Data-Oriented Development)!
 */
