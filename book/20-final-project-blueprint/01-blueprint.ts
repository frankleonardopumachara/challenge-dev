/**
 * BLUEPRINT FINAL: EL SISTEMA PERFECTO SEGÚN GROKKING SIMPLICITY
 * El objetivo es este flujo de datos claro y sin sorpresas.
 */

// 1. Capa de DATOS (Inertes)
const order = { id: 'O-123', total: 0, items: [] };

// 2. Capa de CÁLCULOS (Puros)
const addTax = (total: number) => total * 1.18;
const validateLimit = (total: number) => total < 10000;

// 3. Capa de ACCIONES (Side Effects)
const logToCloud = (msg: string) => console.log(`Cloud: ${msg}`);
const saveToDb = async (data: any) => {/* DB Logic */};

// 4. EL ORQUESTRADOR (Hander/Use Case)
// "La cebolla funcional"
export const completeOrderUseCase = async (data: any) => {
  // A) Transformación de Datos (Cálculo)
  const finalAmount = addTax(data.amount);

  // B) Validación de Negocio (Cálculo)
  if (!validateLimit(finalAmount)) throw new Error('Excede límite');

  // C) Registro (Acción)
  logToCloud(`Procesando orden ${data.id}`);

  // D) Persistencia (Acción)
  return await saveToDb({ ...data, finalAmount });
};

/**
 * 🎓 RESUMEN FINAL:
 * Has completado el viaje por Grokking Simplicity.
 * 
 * ¿Qué has aprendido?
 * 1. A separar el CÓMO (Acción) del QUÉ (Cálculo).
 * 2. A tratar tus DATOS como ciudadanos de primera clase.
 * 3. A diseñar sistemas resilientes, fáciles de testear y ultra-simples.
 * 
 * Ahora, ¡ve y aplica esto en tu reto técnico! 🚀
 */
