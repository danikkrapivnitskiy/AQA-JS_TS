const age = 10;
const age_2 = 18;
const age_3 = 60;

if (typeof age != "number") {
    throw new Error("Not a number")
}

if (age < age_2) {
    console.log("You don't have access cause your age is " + age 
    + ". It's less then " + age_2)
} else if (age >= age_2 && age < age_3) {
    console.log("Welcome")
} else if (age > age_3) {
    console.log("Keep calm")
} else console.log("Technical work")