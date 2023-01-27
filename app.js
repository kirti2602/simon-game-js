// sessionStorage - login page - username/password

const tiles = document.querySelectorAll(".tile") //all colors
const startBtn = document.querySelector(".start-btn")
const info = document.querySelector(".info") // instructions
const audioComputer  = document.querySelector(".audio-computer")
const audioHuman  = document.querySelector(".audio-human")
const highScore = document.querySelector(".high-score")
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

let userCurrentScore = computerSequence-1;
highScore.innerHTML += `Current Score:- ${computerSequence}0 |${sessionStorage.highScore} 0` ;


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
    info.textContent = "Your turn! Press " + computerSequence.length + " times"

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



