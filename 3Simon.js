let gameSeq =[]; // to store the seq the game is giving 
let userSeq =[]; // to store the seq the user is entering 
let highestLevel = 0;
let btns = ["yellow" , "red","green","blue"];

let started = false;
let level = 0; // to track level

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3"); // to track the highest level

// At the top of your script or inside DOMContentLoaded 9 from CHatGPT)
let storedScore = localStorage.getItem("highestScore");
if (storedScore) {
    highestLevel = parseInt(storedScore);
    h3.innerText = `Highest Level scored is ${highestLevel} 😎`;
}


document.addEventListener("keypress", function(){ // remember the during keypress the cursor should be on the window ,not on the consle or else it will type
    if(started == false){ 
        console.log("The game has started");
        started = true;  // so that game sirf ek hi baar start ho 

        levelUp() ; // callin level up when the game has started
    }
});

// FLASH FUNCTION
function gameFlash(btn){ // flash mechanism when game flashes the color
    btn.classList.add("flash");
    setTimeout(function(){ // means removing flashlight after 1sec
        btn.classList.remove("flash");
    } , 250); //.25 sec
}

function userFlash(btn){ // flash mechanism when user flashes the color
    btn.classList.add("userflash");
    setTimeout(function(){ // means removing flashlight after 1sec
        btn.classList.remove("userflash");
    } , 250); //.25 sec
}
// LEVEL UP FUNCNTION
function levelUp(){ // when level up
    userSeq =[] ; // matlab ki user seq khali ho gaya , hence user will have to press all the colours in sequence from starting 
    level++;
    h2.innerText =  `Level ${level}`;
    if(highestLevel < level){
        highestLevel = level; // highest level recorder 
        localStorage.setItem("highestScore", highestLevel);
    }

    let randIdx = Math.floor(Math.random() * 3); // got a random number b/w 0 ans 3
    let randColor = btns[randIdx]; // choosing one out of the 4 buttons 
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq); // printing the game seq when started 

    gameFlash(randBtn); // calling the gameFlash seq which game has flashed 
}

function checkAns(idx ){
  
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp ,1000);
        }
      //  console.log("Same value");
    }else{
        h2.innerHTML = `❌Game Over! Your Score was <b>${level}</b><br> , Press any key to start`;
        h3.innerHTML = `Highest Level scored is ${highestLevel} 😎`
        document.querySelector("body").style.backgroundColor = "red"; // lose pe background red 
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "white"; // after sometime background again white 
        } , 150);
        reset() ; // jab game haar gaya to reset kaise karenge , ye to yaad rakhna hoga na 
    }
  
    
}

// Adding event listners for pressing the buttons 
function btnPress(){
  //  console.log(this);
    let btn = this;
    userFlash(btn); // bhai agar hum flash kiye tab bhi to flash hoga na 

    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor); 

    checkAns(userSeq.length -1); // calling the fucnction to check the ans
}

let allBtns = document.querySelectorAll(".btn"); // sarein buttons pep, { reed, blue, green, yellow}
for (btn of allBtns){
    btn.addEventListener("click",btnPress); // calling the btn press function
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

}
