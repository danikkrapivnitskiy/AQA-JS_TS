/**
 * 
1. Создайте дженерик функцию getFirstElement, которая принимает массив элементов типа T, и возвращает первый элемент (типа T).

2. Создайте интерфейс Person, абстрактный класс Employee, который реализует интерфейс Person, и конкретные классы Manager и Developer.
  - Интерфейс Person должен содержать:
      Стринговые поля: name, surname, experienceYears
      Метод, возвращающий строку: getDetails().

  - Абстрактный класс Employee должен:
      Реализовывать интерфейс Person.
      Содержать защищенное поле: salary, не передающееся в конструктор (по дефолту 0)
      Содержать защищенный абстрактный метод: calculateSalary().,
        который считает зарплату и вызывается в конструкторе, и будет реализован в наследниках
  
  - Конкретные классы Manager и Developer должны:
      Наследоваться от Employee.
      Класс менеджер должен на конструкторе получать поле prefered, которое может быть только 'scrum' или 'kanban'
      Класс девелопер должен на конструкторе получать поле programmingLanguage, который может быть 'js', 'ts', 'java', 'python'
      Метод calculateSalary должен для менеджера устанавливать зарплату по формуле: количество лет опыта * 500
      Метод calculateSalary должен для девелопера устанавливать зарплату по формуле: количество лет опыта * 1000
      Реализовывать метод getDetails(), который должен выводить полную информацию об объекте вида:
        'My name is Elena TSovna, I am software developer with 6 years of experience in TypeScript and 6000$ salary' (пример для девелопера)

 */

    function getFirstElement<T>(array: T[]): T {
        return array[0];
    }

    interface Person {
        name: string;
        surname: string;
        experienceYears: number;
        getDetails(): string;
    }

    abstract class Employee implements Person {
        protected salary = 0;
        constructor(public name: string, public surname: string, public experienceYears: number) {
            this.salary = this.calculateSalary();
        }
        abstract getDetails(): string;
        protected abstract calculateSalary(): number;
    }

    type TPrefered = "scrum" | "kanban";
    type TProgrammingLanguage = "JS" | "TS" | "Java" | "Python";

    class Manager extends Employee {
        constructor(name: string, surname: string, experienceYears: number, private agile: TPrefered) {
            super(name, surname, experienceYears);
        }
        getDetails() {
            return `My name is ${this.name} ${this.surname}, I am manager with ${this.experienceYears} of experience in ${this.agile} and ${this.salary}$ salary.`
        }

        public calculateSalary() {
            return this.experienceYears * 500;
        }
    }

    class Developer extends Employee {
        constructor(name: string, surname: string, experienceYears: number, private language: TProgrammingLanguage) {
            super(name, surname, experienceYears);
        }
        getDetails() {
            return `My name is ${this.name} ${this.surname}, I am software developer with ${this.experienceYears} of experience in ${this.language} and ${this.salary}$ salary.`
        }

        public calculateSalary() {
            return this.experienceYears * 1000;
        }
    }

    const manager = new Manager("Elena", "TSovna", 6, "scrum");
    console.log(manager.getDetails())
    const developer = new Developer("Artsyom", "TSonov", 12, "TS");
    console.log(developer.getDetails())