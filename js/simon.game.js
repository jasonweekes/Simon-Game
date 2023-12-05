// ALGORITHM..?
// grab all 4 buttons in the simon-container 
// get em into an array of 4 elements (Node List)
const btns = document.querySelectorAll('.simon-container button');

let playing = false; // a boolean to keep track of wheter game is in play
let sequence= [] // an array to store sequence of randomly serve buttons
let clicks = 0; // keep track of user button clicks to compare to sequence index
const h2 = document.querySelector("h2"); // get the h2 for providing feedback

// make each button clickable, on click log id of the button, which is the color
btns.forEach(b => b.addEventListener('click', () => {
    // check if this is the correct btn does it "line up" w button sequestion
    if(b.id == sequence[clicks]){
        clicks++;
        new Audio(`audio/${b.id}.mp3`).play();

        h2.textContent = `Good Keep Going! Correct: ${clicks}`
        if(clicks == sequence.length) serveBtn();
    }else{
        //oops! You stepped on the cat
        new Audio(`audio/sat-on-the-cat.mp3`).play();
     
        h2.textContent = `Game Over! Press any key to play again`
        // NEW GAME RESET:
        sequence = [];
        playing = false;
    }
}));

// GAME ON! Press any key to start game:
// One of the 4 buttons flash.. this is user's cue to click the same button.

// document listen for key === any key -- and runs make button flash when
// any key is clicked -- flash consists of .5 sec delay before ran btn vanishes
// then another .5 sec later, button reappears (opacity -- not display none)

// Start game by hitting any key once:
// that generates a rand button BUT for next ran btn, user does NOT hit key
// all subsequent rand btns happen automatically

document.addEventListener('keydown', () => {
    if(!playing) {
        serveBtn();
        playing = true;
        h2.textContent = "GAME ON!";
    }
});

function serveBtn() {
    let r = Math.floor(Math.random() * btns.length); // 0-3
    const b = btns[r];
    setTimeout(() => {
        b.style.opacity ='0';
        new Audio(`audio/${b.id}.mp3`).play();
    },1000);
    // 0.6 sec later, button reappears
    setTimeout(() => b.style.opacity='1',1600);
    // save the color of the served btn to the btnSw arr
    sequence.push(b.id)
    clicks = 0; //
}