/**
 * CLONACIÓN DEFENSIVA (Defensive Cloning)
 * Una de las reglas de oro de Grokking Simplicity es la inmutabilidad de los datos.
 */

// ❌ ANTES (Mutación Directa)
// Esta Acción cambia el objeto que le pasan, rompiendo la predictibilidad.
const applyTaxToOrder = (order: any) => {
  order.total += order.tax; // PELIGRO: Estamos mutando el objeto original
  return order;
};

// ✅ DESPUÉS (Clonación Defensiva en la Acción)
// En lugar de mutar, creamos una copia (Cálculo).
export const calculateTotalWithTax = (order: any) => {
  return {
    ...order, // Clonamos el original
    total: order.amount + order.tax // Modificamos solo la copia
  };
};

/**
 * 🧠 LECCIÓN:
 * Cuando una función (Cálculo) recibe un objeto, JAMÁS debe modificarlo.
 * Siempre debe retornar una nueva versión. Esto previene bugs misteriosos
 * donde un dato cambia "mágicamente" en otra parte de tu aplicación.
 */
