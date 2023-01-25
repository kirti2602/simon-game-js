const tiles = document.querySelectorAll(".tile") //all colors
const startBtn = document.querySelector(".start-btn")
const info = document.querySelector(".info") // instructions

// to start the game
const start = () => {
    info.classList.remove("hidden")
    info.textContent = "Wait for the computer!"
}

startBtn.addEventListener("click", () => {
    info.classList.remove("hidden")
    info.textContent = "Wait for the computer!"
})
// console.log(startBtn)

const flash = (tile) => {
    return new Promise((resolve, reject) => {
        tile.classList.add("active");
        setTimeout(() => {
            tile.classList.remove("active")
            resolve();
        }, 1000)
        
    })
}

const flashRunner = async () => {
    for(const tile of tiles){
        await flash(tile)
    }
}

flashRunner()