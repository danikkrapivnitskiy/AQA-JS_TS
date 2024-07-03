//1. Создайте таймаут (setTimeout), который выведет в консоль сообщение "After 2 seconds" через 2 секунды
// 2. Создайте новый промис, используя синтаксис new Promise((resolve, reject) => {//implementation}).
//     Промис должен резолвать слово success (использовать resolve)
//     Получить слово success через .then и вывести в консоль внутри then
// 3. Создайте новый промис, используя синтаксис new Promise((resolve, reject) => {//implementation}).
//     Промис должен реджектать слово failed (использовать reject)
//     Получить слово failed через .catch и вывести в консоль внутри catch
// 4. Добавьте к обработке промисов из 2 и 3 пункта блок finally, где выведите в консоль текст 'finally'
// 5. Создайте асинхронную функцию resolvePromise(promise)
//   - Функция на вход принимает один аргумент, который должен быть промисом
//   - В функции разместите блок try..catch..finally
//   - В try получите результат работы промиса, вызвав его через await, а после результат выведите в консоль
//   - В catch выведите в консоль сообщение 'Failed due to', а также ошибку, пришедшую из промиса (через шаблонные строки `${}`)
//   - В finally выведите в консоль "Finished working with promise"
//   - Воспроизведите функцию, передав в нее промисы из заданий 2 и 3 (на разных строках кода, не одновременно!)
setTimeout(() => {
    console.log("After 2 seconds")
}, 2000);

const promiseResolve = new Promise((resolve, reject) => {
    resolve("Success");
})
const promiseReject = new Promise((resolve, reject) => {
    reject("Failed");
})
promiseResolve
    .then(result => console.log(result))
    .finally(() => console.log("After resolve promise"));
promiseReject
    .catch(result => console.log(result))
    .finally(() => console.log("After resolve promise"));

async function resolvePromise(promise) {
    try {
        let result = await promise;
        console.log(result);
    } catch (error) {
        console.log(`Failed due to ${error}`);
    } finally {
        console.log("Finished working with promise");
    }
}

resolvePromise(promiseResolve);
resolvePromise(promiseReject);