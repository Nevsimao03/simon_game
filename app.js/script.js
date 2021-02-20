//Grabs all the buttons
const topLeftRec = document.querySelector('.inRec1')
const topRightRec = document.querySelector('.inRec2')
const bottomLeftRec = document.querySelector('.inRec3')
const bottomRightRec = document.querySelector('.inRec4')
const board = document.querySelector('.click')
//Creating an array for the buttons
const btnArr = [
    topLeftRec,
    topRightRec,
    bottomLeftRec,
    bottomRightRec
]

//Function that makes a promise to turn the active button white when active.
//Using await to pouse the code on that line until the promise is true/done, return the value
//className will get element by it class
const lightUp = board => {
    return new Promise((resolve, reject) => {
        board.className = ' Active'
        setTimeout(() => {
            board.className = board.className.replace(
                ' Active',
                ''
            )
            resolve()
        }, 1000)
    })
}

const main = async () => {
    for (const board of btnArr) {
        await lightUp(board)
    }
}


main()