const p1 = () => {
    return new Promise((res, rej) => {
        setTimeout(res, 1000);
    })
}
const p2 = () => {
    return new Promise((res, rej) => {
        setTimeout(res, 1000);
    })
}
const p3 = () => {
    return new Promise((res, rej) => {
        setTimeout(res, 1000);
    })
}
const p4 = () => {
    return new Promise((res, rej) => {
        setTimeout(res, 1000);
    })
}
p1().then(() => console.log('p1'));
p2().then(() => console.log('p2'));
p3().then(() => console.log('p3'));
p4().then(() => console.log('p4'));
