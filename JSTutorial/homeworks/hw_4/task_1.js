for (let i = 10; i >= 0; i--) {
    console.log(i);
}

const smile = " :)"

for (let i = 0; i <= 5; i++) {
    console.log(smile.repeat(i));
}

let count = 0;

do {
    console.log(smile.repeat(count));
    count++;
} while (count <= 5)