class ITSpecialist {
    #name
    #grade
    #experience_in_years
    #age
    #country
    #salary
    constructor(name, grade, age, experience_in_years, salary) {
        this.#name = name;
        this.#grade = grade;
        this.#age = age;
        this.#experience_in_years = experience_in_years;
        this.#salary = salary;
    }
    getAllInfo() {
        return `${this.#name} has grade ${this.#grade} after ${this.#experience_in_years} years of experience`;
    }
    set country(country) {
        if (typeof country !== "string") {
            throw new Error("Invalid name type");
        }
        this.#country = country;
    }
    get salary() {
        return this.#salary;
    }

    get name() {
        return this.#name;
    }
}