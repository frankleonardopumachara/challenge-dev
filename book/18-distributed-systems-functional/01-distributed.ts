/**
 * SISTEMAS DISTRIBUIDOS Y PERSPECTIVA FUNCIONAL
 * ¿Cómo manejamos la consistencia sin transacciones pesadas de DB?
 * Enfoque: Acciones Serializadas y Compensatorias.
 */

// 1. Datos (Eventos)
interface PaymentEvent { id: string; amount: number; type: 'success' | 'failure' };

// 2. Acciones (Side Effects en diferentes servicios)
const updateInventory = async (id: string) => console.log(`Inve: ${id}`);
const sendNotification = async (msg: string) => console.log(`Noti: ${msg}`);

// 3. El patrón de "Acción Orquestada"
export const orchestrateDistributedAction = async (event: PaymentEvent) => {
  // A) Filtramos solo lo que importa (Cálculo)
  const isProcessable = event.type === 'success';

  if (isProcessable) {
    // B) Ejecutamos Acciones de forma secuencial (Time-line management)
    await updateInventory(event.id);
    await sendNotification(`Pago ${event.id} completado`);
  } else {
    // C) Acción Compensatoria
    await sendNotification(`Error en pago ${event.id}`);
  }
};

/**
 * 🧠 LECCIÓN:
 * En un mundo distribuido (AWS SQS, Kafka), tus Acciones deben ser:
 * 1. Idempotentes (Módulo 09).
 * 2. Orquestadas mediante flujos de datos, no mediante acoplamiento directo.
 * 
 * Si tratas cada microservicio como una "Acción" externa, tu sistema
 * se vuelve mucho más resiliente.
 */
