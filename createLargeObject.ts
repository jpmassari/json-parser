export const createLargeObject = (size: number) => {
    const largeObject = {};
    for (let i = 0; i < size; i++) {
        const key = `property_${i}`;
        largeObject[key] = i;
    }
    return largeObject;
}

const size = 1000; // Adjust the size based on your testing requirements
globalThis.largeObject = createLargeObject(size);
globalThis.largeObject2 = createLargeObject(size);
globalThis.largeObject3 = createLargeObject(size);
globalThis.largeObject4 = createLargeObject(size);