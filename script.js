let score = JSON.parse( localStorage.getItem('score')) || {
    wins: 0,
    losses :0,
    ties : 0
};


updateScoreElement();

function updateScoreElement(){
document.querySelector('.js-scores')
.innerHTML = `👤  ${score.wins} : ${score.losses} 🤖 ` ;
}

/* ties: ${score.ties} */

/* function renderPulsingDot(){
    if (pulsingDotDiv.style.display === "none") {
        pulsingDotDiv.style.display = "block";
      } else {
        pulsingDotDiv.style.display = "none";
      }
} */

let isAutoPlaying = false;
let intervalID ;

function autoPlay(){
    let autoPlayBtn = document.querySelector('.auto-play-btn');
    /* let pulsingDotDiv = document.querySelector('.pulsating-circle'); */
    let pulsingDiv = document.createElement('div');
    pulsingDiv.className ='pulsating-circle';

    let stopTextDiv = document.createElement('div');
    stopTextDiv.className = 'stop-text-div';
    let stopTextItself = document.createTextNode('Stop');
    stopTextDiv.appendChild(stopTextItself);

    


    
     

    if(!isAutoPlaying){
        intervalID =  setInterval(
                function(){
                    const playerMove = pickComputerMove();
                    playGame(playerMove);
                }, 1000)
        isAutoPlaying = true;
         autoPlayBtn.textContent = ``
        autoPlayBtn.appendChild(stopTextDiv);
        autoPlayBtn.classList.remove('start-autoplay');
        autoPlayBtn.classList.add('stop-autoplay');
        /* pulsingDotDiv.style.display = 'block' */
        autoPlayBtn.appendChild(pulsingDiv);
        
        
        

    }else{
        clearInterval(intervalID);
        isAutoPlaying =false;

        autoPlayBtn.textContent = `Auto Play`
        autoPlayBtn.classList.remove('stop-autoplay');
        autoPlayBtn.classList.add('start-autoplay');
        /* pulsingDotDiv.style.display = 'none'; */
        

        
    }

    

    
}


function playGame(playerMove){


const computerMove = pickComputerMove();
let result= '';

if(playerMove === 'rock'){
    
    if(computerMove === 'rock'){
        result = 'you tie';
    }else if (computerMove === 'paper'){
        result = 'you lose';
    } else if ( computerMove === 'scissors'){
        result = 'you win';
    }

}else if(playerMove === 'paper'){
    
    if(computerMove === 'rock'){
        result = 'you win';
    }else if (computerMove === 'paper'){
        result = 'you tie';
    } else if ( computerMove === 'scissors'){
        result = 'you lose';
    }

}else if(playerMove === 'scissors'){
    
    if(computerMove === 'rock'){
        result = 'you lose';
    }else if (computerMove === 'paper'){
        result = 'you win';
    } else if ( computerMove === 'scissors'){
        result = 'you tie';
    }
}





if(result === 'you win' ){
    score.wins +=1;
}else if(result === 'you lose'){
    score.losses +=1;
}else if(result === 'you tie'){
    score.ties +=1;
} 


updateScoreElement();
let resultElement = document.querySelector('.js-result');
resultElement.innerHTML = result;
resultElement.classList.toggle("hidden", result.trim() === "");


if (result.trim() !== "") {
    resultElement.style.display = "block";

    if (result === 'you win') {
        resultElement.style.backgroundColor = "#54ff90";
        resultElement.style.color = "#35114c";
    } else if(result === 'you lose'){
        resultElement.style.backgroundColor = "#ff3a5a";
        resultElement.style.color = "white";
    }else if(result === 'you tie'){
        resultElement.style.backgroundColor = "white";
        resultElement.style.color = "#35114c";
    }
    
    else {
        // Set the default background color for other results
        resultElement.style.backgroundColor = "transparent";
     }

}
/* document.querySelector('.js-result')
    .innerHTML = result; */

document.querySelector('.js-moves').innerHTML = `you 
<img src="images/${playerMove}-emoji.png" > :
<img src="images/${computerMove}-emoji.png">
Robot`;
    /* .innerHTML = `You ${playerMove}, ${computerMove} Computer`; */


/* alert(`you picked ${playerMove}, computer picked ${computerMove}, so  ${result}
wins: ${score.wins} , losses:${score.losses}, ties: ${score.ties}` ) */ 

localStorage.setItem('score', JSON.stringify(score) );


}





function pickComputerMove(){
let randomNumber = Math.random();   
let computerMove = '';


if (randomNumber<=1/3 && randomNumber>=0){
    computerMove = 'paper' ;

}else if(randomNumber<=2/3 && randomNumber>1/3){
    computerMove = 'rock' ;
    
}else if(randomNumber<=1 && randomNumber>2/3){
    computerMove = 'scissors' ;
    
}

return computerMove ;
}


let button = document.querySelector(".reset-btn");

//click event listener
button.addEventListener("click", (e) => {
//preventing default behaviour
e.preventDefault();

//adding animate class to button
button.classList.add("animate");

setTimeout(() => {
//removing animate class after 600ms
button.classList.remove("animate");
}, 600);
});


// Get the audio element
let clickSound = document.querySelector('.rck-btn');

// Function to play the sound
function playClickSound() {
clickSound.play();
}



function resultRemover(){

let resultElement = document.querySelector('.js-result');
resultElement.innerHTML = ''; // Clear any content inside the element
resultElement.style.display = 'none'; // Hide the element
}
