/*
1. Создайте функцию counter с переменной cosnt count = 0. Реализуйте замыкание так, чтобы при вызове функции count увеличиваться на +1
и выводился в консоль в виде `Function was called ${count} times`
2. Создайте класс User с публичной пропертей name и приватным полем surname, а также методом sayHi() возвращающим "Hello from <name> <surname>".
3. Создать объект из класса User и вывести результат метода sayHi() в консоль
4. Создать объект из класса User и вывести surname в консоль (получить ошибку)

 */
//1
function count(start = 0) {
    let counter = start;
    return () => {
        console.log(`Function was called ${counter} times`)
        counter++;
    }
}
const counter = count(0);
counter()
counter()
counter()
//2
class User {
    name = "Egor";
    #username = "JSov";
    sayHi() {
        console.log(`Hello from ${this.name} ${this.#username}`);
    }
}
let user = new User();
user.sayHi();
console.log(user.username);
