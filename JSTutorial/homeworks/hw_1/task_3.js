function sumFunc(n) {
    if (Number.isInteger(n) && n >= 1 && n <= 9) {
        console.log(n + Number(String(n) + n) + Number((String(n) + n + n)));
    } else console.log("Incorrect value");
}
