// sessionStorage - login page - username/password

const tiles = document.querySelectorAll(".tile") //all colors
const startBtn = document.querySelector(".start-btn")
const info = document.querySelector(".info") // instructions
const audioComputer  = document.querySelector(".audio-computer")
const audioHuman  = document.querySelector(".audio-human")
const highScore = document.querySelector(".high-score")
const currentScore = document.querySelector(".current-score")

let canClick = false; 
let userHighScore;
let tilesCount = tiles.length; 


// saving values to session storage
if(!sessionStorage.highScore){
    sessionStorage.setItem("highScore", 0)
}

const getRandomTiles = () => {
    return tiles[parseInt(Math.random() * tilesCount)] //make global variable for tiles.length -- DONE
}

const computerSequence = [getRandomTiles()]
let userSequence= [...computerSequence] // change the name  to something more relatable/descriptive -- DONE 

//implementing current score
let userCurrentScore = computerSequence.length-1;
highScore.innerHTML += `${sessionStorage.highScore}0` ;


const flash = (tile) => {
    return new Promise((resolve, reject) => {
        // first setTimeout: to have some delay between one user tap and next computer flash, 500ms
        setTimeout(() => {
        audioComputer.play()
        tile.classList.add("active");
        setTimeout(() => {
            tile.classList.remove("active")
            
            //delay between flashing of two tiles
            setTimeout(() => {
                resolve();
            }, 250)
        }, 1000)
        }, 700)   
    })
}

const flashRunner = async (userSequence) => { // can take a simple name -- NOT SURE ABOUT THIS ONE
    info.textContent = "Wait for Computer"
    canClick = false; // user can't click
    for (const tile of userSequence) {
        await flash(tile)
    }
    canClick= true; // now user can click
    info.textContent = `Your turn! Press " ${computerSequence.length} times`
}

// user clicking tiles
startBtn.addEventListener("click", () => {
    info.classList.remove("hidden")
    info.textContent = "Wait for the computer!"
    flashRunner(userSequence)
})


// logic for checking human sequence
for (const tile of tiles) {
    tile.addEventListener("click", (e) => {
        let currentTile = e.target;
        if (!canClick) return;

        audioHuman.play()
        currentTile.classList.add("bright")

        setTimeout (() => currentTile.classList.remove("bright"), 250)
        const expectedTile = userSequence.shift(); //returns removed element
        if (expectedTile === currentTile) {
            if (userSequence.length === 0) {
                //updates the current score
                currentScore.textContent = `Current Score:- ${computerSequence.length}0`
                computerSequence.push(getRandomTiles());
                userSequence = [...computerSequence]
                flashRunner(userSequence)
            }
        } 
        else {
            userHighScore = computerSequence.length - 1;
            if(userHighScore > Number(sessionStorage.highScore))
                sessionStorage.highScore = userHighScore;

            alert("Oops! Game Over")
            location.reload();
        }
    
    })
}


/* suggested changes
1) Resolve the issue of centring the div! 
2) Add the functionality of current round score along with Highscore -- DONE
3) Change the code where we use tiles.length. Make use of global variable instead of calculating length every-time. -- DONE
4) The computer starts playing the sequence immediately after I end up my turn, creating a little confusion. Can add a little pause there. --DONE
5) Can remove id here https://github.com/kirti2602/simon-game-js/blob/78e65417b8f5f85c7ddf9551e141ddc336f86ada/index.html#L23 
since it is blank. Or you can give the background color (red/blue/yellow/green) as ID instead of class. --DONE
6) Row1 and row 2 are already given dislpay: flex in css (Refer here). But again they are explicitly given 
flex class in html class(Refer here). Can avoid this duplicate styling! --DONE
*/

