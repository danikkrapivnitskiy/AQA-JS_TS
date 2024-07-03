/*
1. Создать функцию, которая принимает на вход дату в виде гггг/мм/дд и возвращает, что вам 18 лет и подсчитанное количество месяцев.
   Реализовать с помощью объекта Date

2.  Расширьте встроенный класс String с помощью метода removeSpecialCharacters. Этот метод должен работать для каждой строки, созданной в вашем файле js. Решить также через регулярное выражение.
    Например:
    'HE!!LL??OO'.removeSpecialCharacters() => 'HELLO'
 */

//1
function getDateOfBirth(dob) {
    let date = new Date(dob);
    let difference = (new Date().getFullYear() - date.getFullYear()) * 12 + (new Date().getMonth() - date.getMonth());
    if (difference/12 > 18) {
        console.log(`Вам больше 18, ${(difference/12 - 18) * 12} месяцев`)
    }
}
getDateOfBirth("2000/9/13")

//2
String.prototype.removeSpecialCharacters = function() {
    return this.replace(/[^a-zA-Z0-9]/g, '');
};
console.log('HE!!LL??OO'.removeSpecialCharacters())
