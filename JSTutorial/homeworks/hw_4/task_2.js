/* 1. Написать скрипт, переводящий количество байт в нужные единицы
  bytes => kB Mb Gb Tb
  16 565 846 bytes (16,6 Mb)

  1 Kb = 1024 byte
  1 Mb = 1024 Kb
  1 Gb = 1024 Mb
  1 Tb = 1024 Gb

  // Пример: ~ 1000
  4 548 = 4,5 Kb (Real 4,4 Kb)
  454 548 = 454,5 Kb
  1 454 548 = 1,5 Mb

  Результат должен быть округлен до 1 знака после запятой методом .toFixed(), про который надо почитать самим ;)

2. Сделать из "*" в консоли равнобедренный треугольник и ромб

3.  Вам нужно вывести в консоль числа от 1 до 100.
    Если число делится без остатка на 3, то выведете в консоль “число - делится на 3”.
    Если число делится на 5 без остатка, то то выведете в консоль “число - делится на 5”.
    Если число делится и на 3 и на 5 без остатка, то то выведете в консоль “число - делится и на 3 на 5”.
    Число 15 делится без остатка на 3 и на 5 -- пример сообщения в консоле.

4. Написать скрипт, который преобразует любое предложение в camelCase. Первое слово должно начинаться с буквы в нижнем регистре, 
  у остальных -  верхнем. Пример: I am super engineer => iAmSuperEngineer
*/

// 1.
const nameList = ["bytes", "Kb", "Mb", "Gb", "Tb"]
function convertion(bytes) {
    for (let i = 0; i < nameList.length; i++) {
        if (bytes < 1000 || (i + 1) == nameList.length) {
            console.log(bytes.toFixed(1) + " " + nameList[i]);
            break;
        }
        bytes /= 1000;
    }

}

convertion(98798769786);

//2.
function rectangle(size, rhomb) {
    for (let i = 0; i < size - 1; i++) {
        let space = " ".repeat(size - i);
        let star;
        let spaceNext = " ".repeat(i * 2);
        if (i == 0) {
            star = "*".repeat(i * 2 + 1);
            console.log(space + star + space);
        } else {
            star = "*";
            console.log(space + star + spaceNext + star + space)
        }
    }
    if (!rhomb) {
        console.log(" " + "*".repeat(size * 2) + " ")
    }
    
}

rectangle(8, false);

function rhomb(size) {
    rectangle(size, true);
    for (let i = size - 1; i >= 0; i--) {
        let space = " ".repeat(size - i);
        let star;
        let spaceNext = " ".repeat(i * 2);
        if (i == 0) {
            star = "*".repeat(i * 2 + 1);
            console.log(space + star + space);
        } else {
            star = "*";
            console.log(space + star + spaceNext + star + space)
        }
    }
}

rhomb(4)

//3.
for (let i = 0; i <= 100; i++) {
    switch (true) {
        case i % 15 == 0: {
            console.log("Число делится и на 3 и на 5: " + i);
            break;
        }
        case i % 3 == 0: {
            console.log("Число делится на 3: " + i);
            break;
        }
        case i % 5 == 0: {
            console.log("Число делится на 5: " + i);
            break;
        }
        default: console.log(i);
    }
}

//4.
let arr_str = 'I am super engineer'.toLowerCase().split(' ');
let new_str = '';

for (let i = 0; i < arr_str.length; i++) {
    if (i === 0) {         
        new_str += arr_str[i];
    } else {
        new_str += arr_str[i].replace(arr_str[i][0], arr_str[i][0].toUpperCase());         
    }
    console.log(new_str);
}