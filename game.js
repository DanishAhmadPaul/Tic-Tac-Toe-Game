
let boxes = document.querySelectorAll(".box");
let resetGame = document.querySelector("#reset-game");
let newGame = document.querySelector("#new-game");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true;  //  turn of which player will start playerX or  player0 , here playerO will start

const winPatterns = [   // winning patterns
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnO = true;
    enableBoxes();        // if we reset game all the buttons will be allowed to enabled and ckick
    msgcontainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            box.style.color="green";  //  text color for O
            turnO = false;

        }else{
            box.innerText = "X";
            box.style.color="blue";  // text color for X
            turnO = true;
        }
        box.disabled = true;  // after 1 text or click each button will be disabled

        checkWinner();     // calling checkWinner fun, after text it will check for winner condition

    });
});

const disableBoxes = () => {   // after winning buttons will be disabled again
    for(let box of boxes){
        box.disabled = true;
    }

}

const enableBoxes = () => { // if game is draw buttons will be enabled to click text
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner) =>{
    msg.innerText=`Congrats you won ${winner}`; // on winning this text will be printed 
    msgcontainer.classList.remove("hide");
    disableBoxes();  // disableBox fun called to disable boxes after winning
    
   
};

const checkWinner = () => {
    for(let pattern of winPatterns){                       // values of each position button will be printed on click
            let pos1Val =  boxes[pattern[0]].innerText;    
            let pos2Val =  boxes[pattern[1]].innerText;
            let pos3Val =  boxes[pattern[2]].innerText;

            if (pos1Val != "" && pos2Val != "" && pos3Val != ""){     
                if(pos1Val === pos2Val && pos2Val === pos3Val){     // winning condition
                    showWinner(pos1Val);   // show winner
                }
            }
         }
       
};


newGame.addEventListener("click",resetgame);      // resetGame fun called in newgame fun,new game will be played on click
resetGame.addEventListener("click",resetgame);    // resetgame fun called we can reset game any time