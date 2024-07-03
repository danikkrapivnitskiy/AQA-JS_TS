//1. Создайте функцию delay, принимающую на вход коллбэк функцию и количество милисекунд.
//     Функция должна исполнить колбэк строго через переданное количество миллисекунд
//     Пример: delay(() => console.log('hello'), 2000) // Через 2 секунды в консоли появится слово hello
//
//
// 2. Создайте два промиса:
//   - promise1 должен резолвать "After 3 seconds" через 3 секунды
//   - promise2 должен резолвать "After 5 seconds" через 5 секунд
//   Резолвните оба промиса параллельно используя Promise.All и Promise.allSettled двумя способами:
//     1. Обработайте результат Promise.All и Promise.allSettled в .then блоке. Выведите в консоль резолвы обоих промисов по очереди
//     2. Обработайте результат await Promise.All и Promise.allSettled в асинхронной функции в try..catch блоке.
//         Используйте деструктуризацию, чтобы создать переменные promise1Result и promise2Result с резолвами соответствующих промисов
//         Вывести в консоль результат обоих промисов по очереди
//
// 3. Напишите функцию, которая возвращает Promise, который резолвается в сумму двух чисел.
//   Функция должна принимать два аргумента (a и b) и возвращать Promise, который резолвает в a+b.
//   Если какой-либо из аргументов не является числом, Promise должен быть rejected с сообщением об ошибке.
//   Протестируйте свою функцию, вызвав ее с допустимыми и недопустимыми аргументами,
//   и обработайте любые ошибки с помощью метода .catch(), а также в блоке try/catch
//

//1
function delay(callback, milliseconds) {
    setTimeout(callback, milliseconds);
}
delay(() => console.log('hello'), 2000)

//2
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("After 3 seconds"), 3000);
})
//2
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("After 5 seconds"), 5000);
})
// promise1.then(result => console.log(result))
// promise2.then(result => console.log(result))

Promise.all([promise1, promise2]).then((result) => console.log(result))
Promise.allSettled([promise1, promise2]).then((result) => console.log(result))

async function result(promise) {
    try {
        let result = await promise;
        console.log(result);
    } catch (error) {
        console.log(`Failed due to ${error}`);
    }
}
result(Promise.all([promise1, promise2]))
result(Promise.allSettled([promise1, promise2]))

//3
function promiseSum(a, b) {
    return new Promise((resolve, reject) => {
        try {
            if (typeof a !== 'number' || typeof b !== 'number') {
                reject("Not a number");
            }
            resolve(a + b);
        } catch (error) {
            reject(`Failed due to ${error}`);
        }
    })
}

promiseSum("5", 2).then(result => console.log(result)).catch(error => console.log(error)); // Not a number
promiseSum(5, 2).then(result => console.log(result)).catch(error => console.log(error)); // 7