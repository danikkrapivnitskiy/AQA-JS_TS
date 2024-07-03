class Manager extends ITSpecialist{
    #isScrumMaster
    constructor(name, grade, experience_in_years, salary, isScrumMaster) {
        super(name, grade, experience_in_years, salary,);
        this.#isScrumMaster = isScrumMaster;
    }
    get isScrumMaster() {
        return this.#isScrumMaster;
    }
}