class QA extends ITSpecialist{
    #isAqa;
    constructor(name, grade, experience_in_years, salary, isAqa) {
        super(name, grade, experience_in_years, salary);
        this.#isAqa = isAqa;
    }
    get isAqa() {
        return this.#isAqa;
    }
}