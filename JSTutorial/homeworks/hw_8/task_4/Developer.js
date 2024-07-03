class Developer extends ITSpecialist{
    #isWritingUnitTests
    constructor(name, grade, experience_in_years, salary, isWritingUnitTests) {
        super(name, grade, experience_in_years, salary);
        this.#isWritingUnitTests = isWritingUnitTests;
    }
    get isWritingUnitTests() {
        return this.#isWritingUnitTests;
    }
}