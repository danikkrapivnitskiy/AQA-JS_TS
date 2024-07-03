function hasSpecialChars(str) {
    return str.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null; 
}

function word(wordSet) {
		let word = wordSet.toLowerCase()
		const vowels = "aeiou"
		let vowels_count = 0
		let consonants_count = 0
	for(const i of word) {
		console.log(typeof i)
		if(vowels.includes(i)) {
			vowels_count++; 
		} else if (isNaN(i) && !hasSpecialChars(i)) {
			consonants_count++;
		}
	}
		console.log(`word contains vowels: ${vowels_count}, and  consonants: ${consonants_count}`);
	}

word("ab#21")

//2
const str = 'ab 1Z';    // 'bBcAazA' for +1 and 'zZaYyxY' for -1

function cesar(str, offset) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	let newString = '';
	let newIndex;

	for (let i = 0; i < str.length; i++) {
		let index = alphabet.indexOf(str[i].toLowerCase());
		if (offset === 1) {
			newIndex = index + offset - alphabet.length;
		} else if (offset === -1) {
			newIndex = index + offset;
		}
	
		if (alphabet.includes(str[i].toLowerCase())) {
			if (str[i].toUpperCase() === str[i]) {
				newString += alphabet.at(newIndex).toUpperCase();
			} else {
				newString += alphabet.at(newIndex);
			}
		} else newString += str[i];
	}
	console.log(newString)
}

cesar('Anatoly, Hello!', -1)
cesar('ab 1Z', 1)
cesar('bBcAazA', 1)
cesar('zZaYyxY', -1)