/*
2. Создайте функцию, которая подсчитает, сколько в объекте значений каждого типа.
  Принимает на вход объект или массив таких же объектов, у которого ключ всегда string, а значение - string, number, boolean.
  Возвращает же - объект с ключами string, number, boolean и количеством таких значений в объекте или в сумме у всех объектов в массиве.

3. Реализуйте функцию filter(), которая принимает на вход массив чисел и предикат (коллбэк),
    который будет использоваться для проверки каждого числа на соответствие требованиям.
    Помимо самой функции следует реализовать алиасы типов для функций и аттрибутов.
    Пример функции:
    const numbers = [1, -5, 2, 3, 4, 133];
    filter(numbers, (n) => n > 3); // [4, 133]
    filter(numbers, (n) => n % 2 == 0); // [2, 4]
    Параметры функции: Массив чисел и Анонимная функция, принимающая на вход число и возвращающая логическое значение.
 */
//2
const object: CustomerObject = {
  name: "Js",
  surname: "TSov",
  salary: 100000,
  grade: "junior",
  doNothing: true,
}

type CustomerObject = {
    [key: string]: number | string | boolean;
  };

function getCountTypeOf(object: CustomerObject[] | CustomerObject ): object {
  let stringCount: number = 0;
  let numberCount: number = 0;
  let bolCount: number = 0;
  if (Array.isArray(object)) {
    object.forEach((obj) => {
      stringCount += countKeys(obj, "string");
      numberCount += countKeys(obj, "number");
      bolCount += countKeys(obj, "boolean");
    })
  } else { 
    stringCount = countKeys(object, "string"),
    numberCount = countKeys(object, "number"),
    bolCount = countKeys(object, "boolean")}
    return { string: stringCount, number: numberCount, boolean: bolCount }
}

function countKeys(object: object, type: string): number {
  return Object.values(object).filter(entry => typeof entry === type).length
}

console.log(getCountTypeOf(object)) // { string: 3, number: 1, boolean: 1 }
console.log(getCountTypeOf([object, object])) // { string: 6, number: 2, boolean: 2 }

//3
type NumberPredicate = (number: number) => boolean;
const numbers = [1, -5, 2, 3, 4, 133];
function filter(array: Array<number>, callback: NumberPredicate) {
  return array.filter(callback);
}

console.log(filter(numbers, (n) => n > 3));
