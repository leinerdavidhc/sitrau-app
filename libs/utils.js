export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 || Object.values(obj).every(value => value === undefined);
}
