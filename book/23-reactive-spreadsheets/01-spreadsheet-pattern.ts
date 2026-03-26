/**
 * ARQUITECTURA REACTIVA: EL MODELO HOJA DE CÁLCULO
 * El libro enseña a pensar en tu aplicación como una Excel.
 * Cuando un DATO cambia, los CÁLCULOS se disparan automáticamente.
 */

// 1. DATO (La celda original)
let transactionAmount = 100;

// 2. CÁLCULO (La fórmula de la celda B2)
const calculateIgv = (amount: number) => amount * 0.18;

// 3. REACCIÓN (La celda B3 que depende de B2)
// En código real, esto sería un Evento o una Notificación.
const logTaxUpdate = (amount: number) => {
  const tax = calculateIgv(amount);
  console.log(`Reacting: New tax is ${tax}`);
};

/**
 * 🧠 LECCIÓN:
 * En lugar de que el 'CreateHandler' tenga que saber TODO lo que pasa
 * después (enviar email, sumar puntos, actualizar saldo), usamos
 * una arquitectura que REACCIONE a los cambios en los datos.
 * 
 * Esto desacopla totalmente tus acciones.
 */
export const runExample = () => {
  logTaxUpdate(transactionAmount); // 'Reacting: New tax is 18'
};
