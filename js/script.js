//We get all four buttons
const topLeft = document.querySelector('.inRec1')
const topRight = document.querySelector('.inRec2')
const bottomLeft = document.querySelector('.inRec3')
const bottomRight = document.querySelector('.inRec4')
const countdown = document.querySelector('#btnTime')
let score = document.querySelector('#btnScore')
const gameOver = document.querySelector('.hide')
const main = document.querySelector('.main')

//We get a random button
const randomClick = () => {
	const click = [topLeft, bottomRight, bottomLeft, topRight]
	return click[Math.floor(Math.random() * click.length)]
}

//Timer
// let startTimer = (duration, display) => {
// 	let timer = duration, minutes, seconds
// 	setInterval(() => {
// 		minutes = parseInt(timer / 60, 10)
// 		seconds = parseInt(timer % 60, 10)

// 		minutes = minutes < 10 ? '0' + minutes : minutes
// 		seconds = seconds < 10 ? '0' + seconds : seconds

// 		display.textContent = minutes + ':' + seconds

// 		if (--timer < 0) {
// 			timer = duration
// 		}
// 		setInterval(() => {
			
// 		}, 250);
// 	}, 1000);
// }
// let onload = () => {
// 	let fiveMinutes = 60 * 1
// 	display = document.querySelector('#btnTime')
// 	if (canClick = true) {
// 		startTimer(fiveMinutes, display)
// 	}
// 	else {
// 		clearInterval()
// 	}
// }

//Create an array for the random button
const cycle = [randomClick()]

//This arr keeps a track of what we have to guess (... is a spread operator)
let cycleGuess = [...cycle]

//Function that makes a promise to turn the active button white when active by passing it a new class with the style of white background
//Using await to pause the code on that line until the promise is true/done
const lightUp = (click) => {
	return new Promise(resolve => {
		click.className += ' itIsOn'
		setTimeout(() => {
			click.className = click.className.replace(' itIsOn', '')
			setTimeout(() => {
				resolve()
			}, 250)
		}, 1000)
	})
}

//This callback function is so that when you click on a panel
let canClick = false
let scoreNum = 0;
let times = 100;

const wasClicked = wasClicked => {
	if (!canClick) return
	const expectedGuess = cycleGuess.shift()
	if (expectedGuess === wasClicked) {
		//Score update
		score.innerText = scoreNum++
		if (cycleGuess.length === 0) {
			//make a new game
			cycle.push(randomClick())
			cycleGuess = [...cycle]
			lightOn()
		}
	} else if (expectedGuess <= wasClicked) {
		//end the game
		score.innerText = scoreNum--
	} else {
		main.style.display = 'none';
		gameOver.style.display = 'grid';
	}
}

//Loop the arr and lightup every btn one by one
const lightOn = async () => {
	canClick = false
	for (const click of cycle) {
		await lightUp(click)
	}
	canClick = true
}

lightOn()