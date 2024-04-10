import { goto, goto_block } from './lib/goto';

export const prt_serialize = (/* obj: {[key: string | number]: any} */) => {
    /* let jsonString = '' */
     globalThis.o = {
        ...globalThis.largeObject,
    }
    goto_block([
        ["traversal", () => {
            let properties = Object.getOwnPropertyNames(globalThis.o);
            //what if the object came with length property, than we could perform a normal for loop
            if (properties.length > 0) { //we get the properties names in array
                //console.log(Object.getOwnPropertyDescriptor(globalThis, "o"))
                delete globalThis.o[properties[0]]
                goto("traversal");
            }
            goto("out");
        }],
        ["out", () => "DONE"]
    ])
}

/* const obj = {
    name: "joao",
    idade: "26",
}

prt_serialize() */