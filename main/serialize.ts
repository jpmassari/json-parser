import { goto, goto_block } from '../lib/goto';
import { createLargeObject } from '../createLargeObject';

const largeObject = createLargeObject(100);

export const serialize = (obj: {[key: string | number]: any}) => {
    const entries = Object.entries(obj);
    let currIndex = 0;
    let objIndex = 0;
    let jsonString = '{';
    /* let isArray = false;
    if(Array.isArray(obj)) {
        jsonString += '[';
        isArray = true;
    }; */

    goto_block([
        ["traversal", () => {
            if(entries.length > currIndex) {
                jsonString = jsonString + `"${entries[currIndex][0]}":`;
                //console.log("TYPEOF: ", typeof entries[currIndex][1])
                goto(typeof entries[currIndex][1]);
            }
            goto("out");
        }],
        ["string", () => {
            //console.log("string string");
            jsonString = jsonString + `"${entries[currIndex][1]}",`;
            currIndex = currIndex + 1;
            //console.log(currIndex)
            goto("traversal");
        }],
        ["number", () => {
            //console.log("number");
            jsonString = jsonString + `${entries[currIndex][1]},`;
            currIndex = currIndex + 1;
            goto("traversal");
        }],
        ["object", () => {
            let objEntries = Object.entries(entries[currIndex][1]);
            jsonString = jsonString + '{';
            while(objEntries.length > objIndex) {
                //TODO: find a most performant solution with goto
                if(typeof objEntries[objIndex][1] === 'string') {
                    jsonString = jsonString + `"${objEntries[objIndex][0]}":"${objEntries[objIndex][1]}",`;
                }
                if(typeof objEntries[objIndex][1] === 'number') {
                    jsonString = jsonString + `"${objEntries[objIndex][0]}":${objEntries[objIndex][1]},`;
                }
                objIndex = objIndex + 1;
            }
            currIndex = currIndex + 1;
            objIndex = 0;
            jsonString = jsonString.slice(0, -1) + '},';
            goto("traversal");
        }],
        ["out", () => {
            jsonString = jsonString + "}";
            //console.log(jsonString[jsonString.length - 2])
            if(jsonString[jsonString.length - 2] === ',') {
                jsonString = jsonString.slice(0, -2) + jsonString.slice(-1);
                //TODO: test if goto is faster than going to the if below
                goto("done");
            } 
            if(jsonString[jsonString.length - 3]) {
                jsonString = jsonString.slice(0, -3) + jsonString.slice(-2);
            }
            //console.log("OUT jsonString: ", jsonString)
        }],
        ["done", () => {
            //console.log("done")
            //console.log("final json string: ", jsonString)
        }],
    ])
    return jsonString;
}

/* const obj = {
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
console.log("JSON.stringify: ", JSON.stringify(obj))
serialize(obj); */
//serialize(largeObject)