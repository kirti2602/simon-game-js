const tiles = document.querySelectorAll(".tile") //all colors
const startBtn = document.querySelector(".start-btn")
const info = document.querySelector(".info") // instructions
const audioComputer  = document.querySelector(".audio-computer")
const audioHuman  = document.querySelector(".audio-human")
const highScore = document.querySelector(".high-score")
let canClick = false; 
let userHighScore;

// saving values to session storage
if(!sessionStorage.highScore){
    sessionStorage.setItem("highScore", 0)
}


highScore.innerHTML += sessionStorage.highScore+ "0";


const getRandomTiles = () => {
    return tiles[parseInt(Math.random()*tiles.length)]
}


const computerSequence = [getRandomTiles()]
let computerSequenceCopy= [...computerSequence]

const flash = (tile) => {
    return new Promise((resolve, reject) => {
        // first setTimeout: to have some delay between one user tap and next computer flash, 500ms
        setTimeout(()=>{
        audioComputer.play()
        tile.classList.add("active");
        setTimeout(() => {
            tile.classList.remove("active")
            
            //delay between flashing of two tiles
            setTimeout(() => {
                resolve();
            }, 250)
        }, 1000)
        }, 500)   
    })
}

const flashRunner = async (computerSequenceCopy) => {
    info.textContent = "Wait for Computer"
    canClick = false; // user can't click
    for(const tile of computerSequenceCopy){
        await flash(tile)
    }
    canClick= true; // now user can click
    info.textContent = "Your turn! Press " + computerSequence.length + " times"

}

// user clicking tiles

startBtn.addEventListener("click", () => {
    info.classList.remove("hidden")
    info.textContent = "Wait for the computer!"
    flashRunner(computerSequenceCopy)

})

for (const tile of tiles) {
    tile.addEventListener("click", (e) => {
        let currentTile = e.target;
        if(!canClick) return;

        audioHuman.play()
        currentTile.classList.add("bright")

        setTimeout(()=>currentTile.classList.remove("bright"), 250)
        const expectedTile = computerSequenceCopy.shift(); //returns removed element
        if(expectedTile === currentTile){
            if(computerSequenceCopy.length === 0){
                computerSequence.push(getRandomTiles());
                computerSequenceCopy = [...computerSequence]
                flashRunner(computerSequenceCopy)
            }
        } 
        else{
            userHighScore = computerSequence.length-1;
            // console.log(userHighScore)
            if(userHighScore > Number(sessionStorage.highScore)){
                sessionStorage.highScore = userHighScore;
            }
            alert("Oops! Game Over")
            location.reload();
        }
    
    })
}



