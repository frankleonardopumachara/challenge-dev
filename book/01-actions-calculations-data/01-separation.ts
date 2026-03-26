/**
 * 🟡 Datos (Data)
 * Los datos son simples hechos sobre eventos en el mundo.
 * En TypeScript, usamos interfaces simples o tipos literales.
 */
export interface CartItem {
  name: string;
  price: number;
}

/**
 * 🔵 Cálculos (Calculations)
 * Los cálculos son funciones puras. No tienen efectos secundarios.
 * Reciben datos, devuelven datos. Son deterministas.
 */

// Cálculo: suma de precios
export const calcTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.price, 0);
};

// Cálculo: aplicar impuesto
export const addTax = (amount: number, taxRate: number): number => {
  return amount * (1 + taxRate);
};

/**
 * 🔴 Acciones (Actions)
 * Las acciones tienen efectos secundarios. Dependen de CUÁNDO se ejecutan.
 * En una aplicación real, esto sería enviar un email o guardar en la DB.
 */

export const checkoutAction = async (cart: CartItem[]) => {
  // 1. Extraemos el cálculo (lógica pura)
  const total = calcTotal(cart);
  const totalWithTax = addTax(total, 0.18);

  // 2. Ejecutamos la acción (efecto secundario)
  console.log(`Guardando pedido en base de datos con total: ${totalWithTax}`);
  // await database.save(order);
};

/**
 * 🧠 LECCIÓN:
 * El objetivo es extraer la mayor cantidad de lógica de las acciones (Handlers)
 * hacia los cálculos (Rules). Esto hace que tu dominio sea testeable y predecible.
 */
