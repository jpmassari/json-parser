export const goto = (name: string) => { throw name }

export const goto_block = (blocks: [string, () => void][]): void => {
    const goto_block_impl = (name?: string): void => {
        try {
            const exec = (blocks: [string, () => void][], i:number): void => {
                while (i < blocks.length) {
                    blocks[i]![1]();
                    i = i + 1;
                }
            }
            const skip = (blocks: [string, () => void][], entry: string, i: number) => {
                    //console.log("blocks: ", blocks)
                    //console.log("block: ", blocks[i]![0])
                    //console.log("entry: ", entry)
                    if (blocks.length === 0) return;
                    if (blocks[i]![0] == entry) {
                        //console.log("previous block equals entry");
                        exec(blocks, i);
                    }
                    else {
                        skip(blocks, entry, i + 1);                 
                    }
            }
            switch(name) {
                case undefined: /* console.log("SWITCH UNDEFINED"); */ exec(blocks, 0); break;
                case name!: /* console.log("SWITCH NAME!!  ",name) */; skip(blocks, name, 0); break;
            }
        } catch(e: any) {
            //console.log("e :", e)
            goto_block_impl(e)
        }
    }

    goto_block_impl()
}

/* const test = (obj: {[key: string | number]: any}) => {
    const entries = Object.entries(obj);
    console.log(entries.length)
    const keys = Object.getOwnPropertyNames(obj);
    let currIndex = 0
    let jsonString = '{';
    let isArray = false;
    if(Array.isArray(obj)) {
        jsonString += '[';
        isArray = true;
    };

    goto_block([
        ["traversal", () => {
            if(entries.length > currIndex) {
                jsonString = jsonString + `"${entries[currIndex][0]}": `;
                console.log(typeof entries[currIndex][1]);
                goto(typeof entries[currIndex][1]);
            }
            goto("out");
        }],
        ["string", () => {
            console.log("string string");
            jsonString = jsonString + `"${entries[currIndex][1]}"`;
            currIndex = currIndex + 1;
            console.log(currIndex)
            goto("traversal");
        }],
        ["number", () => {
            console.log("number");
            jsonString = jsonString + `${entries[currIndex][1]}`;
            currIndex = currIndex + 1;
            goto("traversal");
        }],
        ["object", () => {
            currIndex = currIndex + 1;
            goto("traversal");
        }],
        ["out", () => {
            jsonString = jsonString + " }";
            console.log("Final json string: ", jsonString)
        }]
    ])
}

const obj = {
    name: "joao",
    idade: 26
};

test(obj); */