class Team {
    #name
    #sprint_duration
    #release_date
    #daily_standup_time
    #teammates = []
    #tasks = new Set;

    constructor(name, sprint_duration, release_date, daily_standup_time, teammates, tasks) {
        this.#name = name
        this.#sprint_duration = sprint_duration
        this.#release_date = release_date;
        this.#daily_standup_time = daily_standup_time;
        this.#teammates = teammates;
        this.#tasks = tasks;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        if (typeof name !== "string") {
            throw new Error("Invalid name type");
        }
        this.#name = name;
    }

    get sprint_duration() {
        return this.#sprint_duration;
    }

    set sprint_duration(duration) {
        if (typeof duration !== "number") {
            throw new Error("Invalid duration type");
        }
        this.#sprint_duration = duration;
    }

    get release_date() {
        return this.#release_date;
    }

    get daily_standup_time() {
        return this.#daily_standup_time;
    }

    set daily_standup_time(duration) {
        if (typeof duration !== "number") {
            throw new Error("Invalid duration type");
        }
        return this.#daily_standup_time = duration;
    }

    getNumberOfTeammates() {
        return this.#teammates.length;
    }

    addTeammate(newTeammate) {
        if (!(newTeammate instanceof ITSpecialist)) {
            throw new Error("Invalid teammate");
        }
        this.#teammates.push(newTeammate);
    }

    removeTeammate(name) {
        if (typeof name !== "string") {
            throw new Error("Invalid name type");
        }
        this.#teammates.splice(this.#teammates.findIndex(specialist => specialist.name() === name), 1);
    }

    editTeammate(name, key, value) {
        if (typeof name !== "string") {
            throw new Error("Invalid name type");
        }
        const specialist = this.#teammates.find(specialist => specialist.name() === name);
        if (specialist !== undefined) {
            specialist[key] = value;
        } else throw new Error("Specialist not found")
    }

    showAllTeammates() {
        return this.#teammates;
    }

    showTeammatesBySpecialization(specialization) {
        const specializationMapper = {
            developer: Developer,
            qa: QA,
            manager: Manager,
        };
        if (!specializationMapper[specialization]) return [];
        return this.#teammates.filter((teammate) => teammate instanceof specializationMapper[specialization]);
    }

    showAllTasks() {
        return this.#tasks;
    }

    addTask(task) {
        this.#tasks.add(task);
    }

    deleteTask(task) {
        this.#tasks.delete(task)
    }

    editTask(taskName, key, value) {
        const task = Array.from(this.#tasks).find(task => task.featureName === taskName);
        if (task.featureName === key) {
            task.featureName = value;
        }  else if (task.userStoryNumber === key) {
            task.userStoryNumber = value;
        }   else if (task.estimations === key) {
            task.estimations = value;
        }
    }
}
