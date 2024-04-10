require('./createLargeObject');
import { prt_serialize } from "../index";
import { for_serialize } from "../for_serialize";
import { normal_loop } from "../normal_loop";
import { normal_loop2 } from "../normal_loop2";
import { serialize } from "../main/serialize";

const performance_test = (fun: (param: {}) => void, name: string, param?: {}) => {
    const numIterations = 1;
    let totalElapsedTime = 0;
    
    for (let i = 0; i < numIterations; i++) {
      const startTime = performance.now();
      fun(param);
      const endTime = performance.now();
      totalElapsedTime += endTime - startTime;
    }
    
    const averageElapsedTime = totalElapsedTime / numIterations;
    
    console.log(`Average execution time ${name}: ${averageElapsedTime} milliseconds`);
}
performance_test(prt_serialize, "prt_serialize");
performance_test(for_serialize, "for_serialize", globalThis.largeObject);
performance_test(serialize, "serialize");
performance_test(normal_loop, "normal_loop");
performance_test(normal_loop2, "normal_loop2");