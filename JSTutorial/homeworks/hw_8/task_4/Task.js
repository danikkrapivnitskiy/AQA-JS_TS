class Task {
    #featureName
    #userStoryNumber
    #estimations

    constructor(featureName, userStoryNumber, estimations) {
        this.#featureName = featureName
        this.#userStoryNumber = userStoryNumber
        this.#estimations = estimations
    }

    get featureName() {
        return this.#featureName
    }

    get userStoryNumber() {
        return this.#userStoryNumber
    }

    get estimations() {
        return this.#estimations
    }
}