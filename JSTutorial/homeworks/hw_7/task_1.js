/**
 * Task 1.
 * Имеется массив объектов (ниже). Ваше задание:
 * 1. Используя Object.keys и метод forEach вывести в консоль ключи каждого объекта
 * 2. Используя Object.values и метод forEach вывести в консоль значения каждого объекта
 * 3. Перебрать форычем массив. На каждой итерации вывести пары ключ-значнение в виде `key = ${ket}, value = ${value}`.
 *    Перебирать каждый объект циклом for..of вида for(const [key, value] of Object.entries)
 * 4. Перебрать форычем массив. На каждой итерации вывести пары ключ-значнение в виде `key = ${key}, value = ${value}`.
 *    Перебирать каждый объект циклом for..in
 * 5. Создайте объект qa с полями name, age, salary и методом getInfo, который будет возвращать строку вида:
 *    `Hello, my name is ${name}, i'm ${age} and my salary is ${salary}`. Значения в строке должны ссылаться на контекст ЭТОГО ОБЪЕКТА, без подмен.
 *
 *  const characters = [
 *     { 'name': 'Barney', 'age': 36 },
 *     { 'name': 'Fred', 'age': 40 },
 *     { 'name': 'Jack', 'age': 50 }
 *   ];
 */
const characters = [
    { 'name': 'Barney', 'age': 36 },
    { 'name': 'Fred', 'age': 40 },
    { 'name': 'Jack', 'age': 50 }
];

const getAllKeys = (array) => {
    let keys = [];
    for (const entity of array) {
        keys.push(Object.keys(entity));
    }
    return keys;
}
const getAllValues = (array) => {
    let keys = [];
    for (const entity of array) {
        keys.push(Object.values(entity));
    }
    return keys;
}

const getKeyValueForOf = (array) => {
    for (const entity of array) {
        for (const [key, value] of Object.entries(entity)) {
            console.log(`key = ${key}, value = ${value}`)
        }

    }
}

const getKeyValueForIn = (array) => {
    for (const entity of array) {
        const object = Object.entries(entity);
        for (const [key, value] in object) {
            console.log(`key = ${key}, value = ${object[key]}`);
        }

    }
}

const qa = {
    name : "Daniil",
    age : 23,
    salary : 1000,
    getInfo() {
        console.log(`Hello, my name is ${this.name}, i'm ${this.age} and my salary is ${this.salary}`)
    }

}

console.log(getAllKeys(characters));
console.log(getAllValues(characters));
getKeyValueForOf(characters);
getKeyValueForIn(characters);
qa.getInfo()
