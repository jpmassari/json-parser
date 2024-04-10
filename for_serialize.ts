import { goto, goto_block } from './lib/goto';

export const for_serialize = (obj: {[key: string | number]: any}) => {
    let jsonString = '{';
    let isArray = false;
    if(Array.isArray(obj)) {
        jsonString += '[';
        isArray = true;
    };

    goto_block([
        ["traversal", () => {
            for(let keys in obj) {}
            goto("out");
        }],
        ["out", () => "DONE"]
    ])
}

/* const obj = {
    name: "joao",
    idade: "26",
};

for_serialize(obj); */