// 4. С помощью fetch отправьте GET запрос на адрес "https://jsonplaceholder.typicode.com/todos".
//     Преобразуйте респонс в объект (.json()), выведите в консоль все объекты из респонса, где userId === 1. Решить с помощью try/cath и then (обоими способами)

const url = "https://jsonplaceholder.typicode.com/todos";
async function fetchDataById(id) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            new Error("Not correct status");
        }
        const data = await response.json();
        const array = data.filter(object => object.userId === id)
        console.log(array);
    } catch (error) {
        console.log(`Failed due to ${error}`);
    }
}
fetchDataById(1);

function promise(id) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        if (!response.ok) {
            reject("Not correct status");
        }
        const data = await response.json();
        const array = data.filter(object => object.userId === id)
        resolve(array);
    })
}
promise(1).then(result => console.log(result)).catch(error => console.log(error));
