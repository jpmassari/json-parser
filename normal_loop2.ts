export const normal_loop2 = () => {
    while(Object.getOwnPropertyNames(globalThis.largeObject4).length > 0) {
        delete globalThis.largeObject4[Object.getOwnPropertyNames(globalThis.largeObject4)[0]]
    }
}