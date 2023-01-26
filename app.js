const tiles = document.querySelectorAll(".tile") //all colors
const startBtn = document.querySelector(".start-btn")
const info = document.querySelector(".info") // instructions
const audio  = document.querySelector(".audio")

let canClick = false; 

const getRandomTiles = () => {
    return tiles[parseInt(Math.random()*tiles.length)]
}


const computerSequence = [getRandomTiles()]
let computerSequenceCopy= [...computerSequence]
let userTurnCount = computerSequence.length;

// console.log(startBtn)

const flash = (tile) => {
    return new Promise((resolve, reject) => {
        // first setTimeout: to have some delay between one user tap and next computer flash, 500ms
        setTimeout(()=>{
        tile.classList.add("active");
        audio.play()
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
    info.textContent = "Your turn: " + computerSequence.length

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
        const expectedTile = computerSequenceCopy.shift(); //returns removed element
        if(expectedTile === currentTile){
            if(computerSequenceCopy.length === 0){
                computerSequence.push(getRandomTiles());
                computerSequenceCopy = [...computerSequence]
                flashRunner(computerSequenceCopy)
            }
        } 
        else{
            alert("Oops! Game Over")
            location.reload();
        }
    
    })
}