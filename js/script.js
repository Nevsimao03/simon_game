//We get all four buttons
const topLeft = document.querySelector('.inRec1')
const topRight = document.querySelector('.inRec2')
const bottomLeft = document.querySelector('.inRec3')
const bottomRight = document.querySelector('.inRec4')
const countdown = document.querySelector('#btnTime')
const score = document.querySelector('#btnScore')
const gameOver = document.querySelector('.hide')
const main = document.querySelector('.main')

//Audio

//Time
// const startTime = 1
// let time = startTime * 60

// const updateCountdown = () => {
// 	const minutes = Math.floor(time / 60)
// 	let seconds = time % 60
// 	countdown.innerHTML = `${minutes}: ${seconds}`
// 	time--
// }
// setInterval(updateCountdown, 1000)

//We get a random button
const randomClick = () => {
	const click = [topLeft, bottomRight, bottomLeft, topRight]
	return click[Math.floor(Math.random() * click.length)]
}

//Create an array for the random button
const cycle = [randomClick()]

//This arr keeps a track of what we have to guess (... is a spread operator)
let cycleGuess = [...cycle]

//Function that makes a promise to turn the active button white when active by passing it a new class with the style of white background
//Using await to pouse the code on that line until the promise is true/done
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

const wasClicked = wasClicked => {
	if (!canClick) return
	const expectedGuess = cycleGuess.shift()
	if (expectedGuess === wasClicked) {
		if (cycleGuess.length === 0) {
			//make a new game
			cycle.push(randomClick())
			cycleGuess = [...cycle]
			lightOn()
		}
	} else {
		//end the game
		main.style.display = 'none';
		gameOver.style.display = 'grid';
		// alert('Game Over!')
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