/**
 * ARQUITECTURA CEBOLLA (Onion Architecture / Hexagonal Functional)
 * El libro no menciona "Cebolla" directamente, pero propone EXACTAMENTE este patrón.
 */

// 1. CAPA CENTRAL (Cálculos de Dominio)
// Estas funciones no saben nada de la DB ni de APIs.
const applyDiscount = (amount: number, discount: number) => amount - discount;
const calculateTotal = (prices: number[]) => prices.reduce((a, b) => a + b, 0);

// 2. CAPA INTERMEDIA (Orquestador / Use Case)
// Aquí "pasamos" las acciones (Side effects) como dependencias.
export const processOrderUseCase = async (
  items: any[], 
  dbAction: (total: number) => Promise<void>
) => {
  // A) Usamos Cálculos (Puros)
  const total = calculateTotal(items.map(i => i.price));
  const finalTotal = applyDiscount(total, 5); // 5 de descuento

  // B) Ejecutamos la Acción (Efecto Secundario)
  return await dbAction(finalTotal);
};

// 3. CAPA EXTERNA (Infraestructura / Adaptadores)
// Aquí definimos la Acción real (Side Effect).
const saveToPostgres = async (total: number) => {
  console.log(`Guardando en Postgres: ${total}`);
};

// LA UNIÓN DE TODO:
// processOrderUseCase(items, saveToPostgres);

/**
 * 🧠 LECCIÓN:
 * El diseño de Eric Normand sugiere:
 * "Empuja los efectos secundarios (Acciones) hacia los bordes del sistema".
 * 
 * Deja el núcleo del sistema lleno de Cálculos. Así, si mañana cambias 
 * de Postgres a MongoDB, el 90% de tu código (la lógica de negocio) 
 * sigue funcionando sin cambios y se puede testear sin mocks complejos.
 */
