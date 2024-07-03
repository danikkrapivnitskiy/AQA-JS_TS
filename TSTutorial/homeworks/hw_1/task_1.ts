/*
1. Создайте interface ItEmployee
2. В интерфейсе ItEmployee сделайте поле name которое может быть только string
3. В интерфейсе ItEmployee сделайте поле surname которое может быть только string
4. В интерфейсе ItEmployee сделайте поле salary которое может быть только number и доступно только для чтения
5. Создайте тип данных Grade для стринговой переменной, которая может принимать значения: junior, middle, senior, lead
6. В интерфейсе ItEmployee сделайте поле grade типа Grade
7. Создайте enum OCCUPATION, который будет представлять професси в айти вида DEVELOPER = "Developer" и так далее
8. В интерфейсе ItEmployee сделайте поле occupation типа OCCUPATION
9. Создайте интерфейс IAddress, предствляющий объект с полями country, street, house, flat
10. В интерфейсе ItEmployee сделайте необязательное поле address типа IAddress
11. В интерфейсе ItEmployee сделайте projectNames, типа массив строк (названий проектов)
12. Создайте объект с типом ItEmployee

1. Создайте интерфейс IEmployee с полями name, surname, salary, address (типы для этих полей такие же как в ItEmployee из таск 1)
  Создайте функцию getEmployeeInfo(employee), выводящую в консоль всю информацию про employee (формат текста придумать самим)
  Создайте type guard isItEmployee. Используйте его в функции getEmployeeInfo.
  Если на входе itEmployee - выводите в консоль все поля айтишника (а не только те, что в employee)
  Функция должна принимать union type между Employee и ItEmployee, и через тайпгвард определять что за объект и как работать с ним


 */

export interface ItEmployee {
    name: string;
    surname: string;
    readonly salary: number;
    grade: Grade;
    occupation: OCCUPATION;
    address?: IAddress;
    projectNames: Array<String>;
}

type Grade = "junior" | "middle" | "senior" | "lead";

enum OCCUPATION {
    DEVELOPER = "Developer",
    QA = "Qa",
    SCRUM_MASTER = "SCRUM_MASTER",
}
interface IAddress {
    country: string,
    street: string,
    house: string,
    flat: number
}

export const object: ItEmployee = {
    name: "Js",
    surname: "TSov",
    salary: 100000,
    grade: "junior",
    occupation: OCCUPATION.SCRUM_MASTER,
    projectNames: ["Nothing", "Meeting", "Break"],
}

console.log(object);

interface IEmployee {
    name: string;
    surname: string;
    readonly salary: number;
    address: string;
}

function isItEmployee(obj: ItEmployee | IEmployee): obj is ItEmployee {
    return "projectNames" in obj;
}
function getEmployeeInfo(employee: IEmployee | ItEmployee) {
    let info = `${employee.name} ${employee.surname} is employee with salary ${employee.salary}$ `
    isItEmployee(employee)
    ? console.log(info + `with projects ${employee.projectNames} and grade ${employee.grade}`)
    : console.log(info);
}
getEmployeeInfo(object);
