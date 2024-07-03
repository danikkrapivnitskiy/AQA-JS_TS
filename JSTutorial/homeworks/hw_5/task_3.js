/**
 * 5*. Напишите рекурсивную функцию, которая принимает на вход число и складывает его цифры. 
  Если сумма получилась больше 9 - снова сложите цифры. И так пока, сумма не станет меньше либо равной 9. 
  После окончания сложений возвращает полученное число. Например при подаче числа 19 (1+9=10>9, потому 1+0=1) выводится 1

6*. Написать функцию, которая принимает на вход строку с текстом, и заменяет каждую пару идентичных букв на одну следующую в алфавите, 
    и так пока в тексте не останется двух одинаковых букв стоящих рядом (через пробел и другой знак препинания можно)
    Пример: aabc => bbc => cc => d

 */

//5.

function sumOfDigits(number) {
    if (number < 10) {
        return number;
    }

    let sum = 0;

    for (let digit of String(number).split("")) {
        sum += +digit;
    }

    return sumOfDigits(sum);
}

console.log(sumOfDigits(345));

//6.

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function getAloneSymbol(word) {
    const arr = [...word];
    let nextStr = "";
    for (let i = 0; i < arr.length; i++) {
        if (i != arr.length && arr[i] === arr[i + 1]) {
            i++;
            nextStr += [...alphabet][[...alphabet].indexOf(arr[i]) + 1]
        } else nextStr += arr[i];
    }

    if (nextStr === word) {
        return word;
    }

    return getAloneSymbol(nextStr);
}

console.log(getAloneSymbol("kkjjlkj"));
console.log(getAloneSymbol("aa,bc"));
console.log(getAloneSymbol("aa bc"));
console.log(getAloneSymbol("aabc"));