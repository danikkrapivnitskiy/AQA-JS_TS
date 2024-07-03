/**
 * 1. На вход функции подаётся предложение, например “I am the best AQA ever!” Преобразуйте строку таким образом, 
  чтобы вместо каждой буквы была цифра, показывающая сколько раз эта буква встречается в предложении. 
  Пробелы и знаки препинания оставляем без изменения. Регистр не должен играть роли.

2. У вас есть массив с ценами товаров в чеке. В консоль нужно вывести сумму всех цен и среднюю цену товара.
  Итого: 8495 $, средняя цена товара 700 $ - пример сообщения в консоле.  
  const prices = [64, 7556, 345, 7556, 345, 7556, 345, 7556, 433, 345, 756, 123, 942, 3112, 421, 9341, 1212, 8, 43, 41, 345, 341, 21, 321, 123];

3. Напишите функцию, которая принимает на вход массив слов и возвращает отсортированный массив по по следующему критерию: количество гласных букв.
  Массив должен быть отсортирован по возврастанию количества гласных букв в слове.

4. У вас есть массив со скобками, предположим [ ‘(‘, ‘)’, ‘(‘, ‘)’, ‘)’], количество элементов и последовательность может быть разной.
  Нужно выяснить, у каждой ли скобки есть соответствующая пара (открывающая и закрывающая).
  Усложнение: в массиве могут быть вложены еще массивы на разной глубине. (ПОПРОБУЙТЕ МЕТОД .flat(), изучите как он работает с разными глубинами вложенности)
  Вернуть нужно всё также есть ли у каждой скобочки соответствующая пара. 
  Пример:
  const arr = [[['(']], ')', '(', ')', ')', ['(', ['('], [')']]]

 */
//1
  const sentenseStr = "I am the best AQA ever!";
  const sentenseArr = [...sentenseStr];
  const mapToNumber = sentenseArr.map((i) => sentenseArr.filter(symbol => i === symbol).length);
  console.log(...mapToNumber);

//2
  const prices = [64, 7556, 345, 7556, 345, 7556, 345, 7556, 433, 345, 756, 123, 942, 3112, 421, 9341, 1212, 8, 43, 41, 345, 341, 21, 321, 123];
  const avgPrice = prices.reduce((result, number) => result += number / prices.length, 0).toFixed(0);
  console.log(avgPrice)

//3
  const words = ["sdfsdfsdfaaa", "lknjckbvhjibeiru", "oiusdfi"]
  const arraySortByCountVowel = [...words].sort((a, b) => getVowelCount(a) - getVowelCount(b));
  function getVowelCount(word) {
      return  [...word].filter(symbol => symbol.includes('aeijouy'));
  }
  console.log(arraySortByCountVowel)

//4
const arr = [[['(']], ')', '(', ')', ')', ['(', ['('], [')']]]
let count = 0;
const arrFlat = arr.flat(Infinity).map(symbol => symbol === ")" ? count++ : count--);
console.log(count === 0);
/** Another solution */
let countOpen = 0;
let countClosed = 0;
for (const i of arrFlat) {
    if (i === ")") {
        countClosed++;
    } else if (i === "(") {
        countOpen++;
    }
}
console.log(countOpen === countClosed);
