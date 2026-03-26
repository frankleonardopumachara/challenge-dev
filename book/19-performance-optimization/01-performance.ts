/**
 * OPTIMIZACIÓN DE RENDIMIENTO (DOD + Functional)
 * El libro no lo dice así, pero el diseño funcional facilita la 
 * "Memoización" y el "Batching".
 */

// 1. Cálculo Pesado
const heavyCalculation = (n: number) => {
  console.log('--- Calculando de forma costosa ---');
  return n * n;
};

// 2. Memoización (Cálculo que envuelve un cálculo)
const memoize = (fn: Function) => {
  const cache = new Map();
  return (arg: any) => {
    if (cache.has(arg)) return cache.get(arg);
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
};

const fastCalculation = memoize(heavyCalculation);

// Primera llamada: Ejecuta
console.log(fastCalculation(10));
// Segunda llamada con el mismo argumento: Instantánea
console.log(fastCalculation(10)); 

/**
 * 🧠 LECCIÓN:
 * Como los Cálculos son Funciones Puras (sin estado), puedes guardar
 * sus resultados en memoria con total confianza.
 * Esto es imposible de hacer de forma segura con Acciones.
 * Al mover tu lógica a Cálculos, ganas superpoderes de caché.
 */
