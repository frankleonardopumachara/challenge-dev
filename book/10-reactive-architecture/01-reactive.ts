/**
 * ARQUITECTURA REACTIVA (Reactive Architecture)
 * El libro habla del modelo de "Hoja de Cálculo" (Cell/Spreadsheet model).
 * Los datos cambian (celda A1), y automáticamente otras celdas (Cálculos) se actualizan.
 */

// 1. EL DATO (Fuente de Verdad)
type AppState = {
  cart: { id: string, price: number }[];
};

let state: AppState = { cart: [] };

// 2. EL CÁLCULO (Derivado del dato)
const calculateTotal = (cart: { price: number }[]) => 
  cart.reduce((acc, item) => acc + item.price, 0);

// 3. LA ACCIÓN (Actualización reactiva)
const updateCartUI = (total: number) => {
  console.log(`UI actualizada: Total es ${total}`);
};

// 4. EL ORQUESTADOR REACTIVO (Watcher)
const addToCart = (item: { id: string, price: number }) => {
  // A) Actualizamos el dato
  state = { ...state, cart: [...state.cart, item] };

  // B) Reaccionamos (Recalculamos todo)
  const newTotal = calculateTotal(state.cart);
  updateCartUI(newTotal);
};

/**
 * 🧠 LECCIÓN:
 * En una arquitectura reactiva, los efectos secundarios no se "buscan",
 * se "reaccionan". El cambio en un DATO dispara un CÁLCULO que alimenta una ACCIÓN.
 * 
 * Esto evita el acoplamiento manual donde el desarrollador tiene que acordarse
 * de llamar a 5 funciones distintas cada vez que añade un producto al carrito.
 */
