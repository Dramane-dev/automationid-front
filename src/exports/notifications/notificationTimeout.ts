export const notificationTimeout = (firstFunction: Function, secondFunction: Function) => {
    setTimeout(() => {
        firstFunction();
        secondFunction();
    }, 2500);
};
