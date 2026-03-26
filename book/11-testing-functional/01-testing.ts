/**
 * TESTEO FUNCIONAL (Functional Testing)
 * ¿Por qué el libro insiste tanto en separar A-C-D? 
 * ¡Por el coste del testeo!
 */

// 1. CÁLCULO (Muy fácil de testear)
// No necesitas mocks, no necesitas DB. 
const isAdult = (age: number) => age >= 18;

// Test:
// expect(isAdult(20)).toBe(true);

// 2. ACCIÓN (Difícil de testear)
// Necesitas mockear la DB o usar una real.
const saveUserToDbAction = async (user: any) => {
  // await db.save(user);
};

// --- ESTRATEGIA DE TESTEO DEL LIBRO ---

/**
 * A) TESTEA TUS CÁLCULOS AL 100%
 * Son baratos, rápidos y deterministas. El 80% de tus errores de negocio 
 * mueren aquí.
 * 
 * B) TESTEA TUS ACCIONES CON MOCKS
 * Solo para asegurar que se llaman con los datos correctos que ya 
 * verificaste en tus Cálculos.
 * 
 * C) TESTEA TUS DATOS CON SCHEMAS
 * Valida que los datos que pasan entre el mundo real y tus cálculos 
 * tengan el formato esperado (ej. usando class-validator o Zod).
 */

/**
 * 🧠 LECCIÓN:
 * Si tu código es 90% Cálculos y 10% Acciones, tus tests serán:
 * 90% rápidos/puros y 10% pesados/con mocks. 
 * 
 * El código tradicional (todo Acciones) es 100% difícil de testear.
 */
