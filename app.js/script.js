//We get all four buttons
const topLeftRec = document.querySelector('.inRec1');
const topRightRec = document.querySelector('.inRec2');
const bottomLeftRec = document.querySelector('.inRec3');
const bottomRightRec = document.querySelector('.inRec4');

//We get a random button
const randomClick = () => {
	const click = [topLeftRec, topRightRec, bottomLeftRec, bottomRightRec];
	return Math.floor(Math.random() * click.length);
};

//Creating an array for the buttons
const btnArr = [randomClick()];

//This arr keeps a track of what we have to guess (... is a spread operator)
const btnGuess = [...btnArr];

//Function that makes a promise to turn the active button white when active by passing it a new class with the style of white background
//Using await to pouse the code on that line until the promise is true/done
const lightUp = (click) => {
	return new Promise((resolve) => {
		click.className = 'active';
		setTimeout(() => {
			click.className = click.className.replace('active', '');
			setTimeout(() => {
				resolve();
			}, 225);
		}, 1000);
	});
};

//This callback function is so that when you click on a panel
let canClick = false;

const beenClicked = (click) => {
	if (!canClick) return;
	const clickMatch = btnGuess.shift();
	if (clickMatch === beenClicked) {
		if (btnGuess.length === 0) {
			//make a new game
			btnArr.push(randomClick());
			btnGuess = [...btnArr];
			startLightUp();
		}
	} else {
		//end the game
		alert('Game Over');
	}
};

//Loop the arr and lightup every btn one by one
const startLightUp = async () => {
	canClick = false;
	for (const click of btnArr) {
		await lightUp(click);
	}
	canClick = true;
};

startLightUp();