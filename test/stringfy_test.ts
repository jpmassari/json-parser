import { serialize } from '../main/serialize';
import { createLargeObject } from '../createLargeObject';

const obj = {
    name: "joao",
    idade: 26,
    caracteristicas: {
        olho: "verde",
        nariz: "grande",
        cabelo: "castanho",
        biceps: 39
    },
    namorada: "Sophia",
    caracteristicasNamorada: {
        olho: "castanho",
        idade: 19,
        cabelo: "loiro"
    }    
};

const largeObject = createLargeObject(120)
const largeObject2 = createLargeObject(80)
const stringfy_test = () => {
    let i = 0;
    let totalElapsedTime = 0;
    let numIteration = 1
    for(; i < numIteration; ++i) {
        const startTime = performance.now();
        JSON.stringify(largeObject2);
        const endTime = performance.now();
        totalElapsedTime += endTime - startTime
    }
    
    const averageElapsedTime = totalElapsedTime / numIteration
    console.log(`Average execution time JSON.stringfy: ${averageElapsedTime} milliseconds`);
}


const my_stringfy_test = () => {
    let i = 0;
    let totalElapsedTime = 0;
    let numIteration = 1
    for(; i < numIteration; ++i) {
        const startTime = performance.now();
        serialize(largeObject2)
        const endTime = performance.now();
        totalElapsedTime += endTime - startTime
    }
    
    const averageElapsedTime = totalElapsedTime / numIteration
    console.log(`Average execution time my_stringfy: ${averageElapsedTime} milliseconds`);
}

stringfy_test()
my_stringfy_test()