/**
 * PATRONES DE COMPOSICIÓN (Function Composition)
 * El libro enseña que la mejor forma de construir sistemas complejos es 
 * combinando funciones simples.
 */

// 1. Datos iniciales
const transaction = { id: '1', amount: 100, currency: 'PEN' };

// 2. Cálculos Simples (Bloques de construcción)
const addIgv = (amount: number) => amount * 1.18;
const applyDiscount = (amount: number) => amount - 10;
const formatCurrency = (amount: number) => `S/ ${amount.toFixed(2)}`;

// 3. Composición Manual (Lógica "Pipe")
// El problema: Se lee de adentro hacia afuera (difícil de leer)
const resultManual = formatCurrency(applyDiscount(addIgv(transaction.amount)));

// 4. Composición Elegante (Patrón Pipe)
const pipe = (...fns: Function[]) => (val: any) => fns.reduce((acc, fn) => fn(acc), val);

const processTransaction = pipe(
  addIgv,
  applyDiscount,
  formatCurrency
);

console.log(processTransaction(transaction.amount)); // "S/ 108.00"

/**
 * 🧠 LECCIÓN:
 * En Grokking Simplicity, la composición es la clave para evitar el "Código Espagueti".
 * Si tus funciones son Cálculos (puras), puedes encadenarlas infinitamente
 * con la seguridad de que el resultado será predecible.
 */
