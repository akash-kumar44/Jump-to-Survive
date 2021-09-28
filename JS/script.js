var score = 0;
var cross = true;
var i = 1;
collison = new Audio('collision.mp3');
audio = new Audio('music.mp3');

dora = document.querySelector('.dora');
rat = document.querySelector('.rat');
gameOver = document.querySelector('.gameOver');
button = document.querySelector('#btn2');
if(localStorage.getItem('highest') == null){
document.getElementById('highScore').innerHTML = "High Score: " + 0;
}
else{
    document.getElementById('highScore').innerHTML = "High Score: " + localStorage.getItem('highest');
}
function jumpDoraemon() {
     document.onkeydown = function (e) {
        dora = document.querySelector('.dora');
        rat = document.querySelector('.rat');
        console.log("Key code is: ", e.keyCode)
        if(document.getElementById('gmOver').style.visibility == "visible"){
            dora.classList.remove('doraCharacter2');
            dora.classList.remove('doraCharacter1');
            dora.classList.remove('jumpDora');
        }
        else if (e.keyCode == 32 || e.keyCode == 38) {
            dora.classList.remove('doraCharacter2');
            dora.classList.add('doraCharacter1');
            dora.classList.add('jumpDora');
            setTimeout(() => {
                dora.classList.remove('jumpDora');
            }, 1000)
        }
        else if (e.keyCode == 37) {
            dora.classList.remove('doraCharacter1');
            dora.classList.add('doraCharacter2');
            dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
            if (dx > 0) {
                dora.style.left = (dx - 112) + "px";
            }
        }
        else if (e.keyCode == 39) {
            dora.classList.remove('doraCharacter2');
            dora.classList.add('doraCharacter1');
            dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
            if (dx < 1280) {
                dora.style.left = dx + 50 + "px";
            }
        }
        }
    }


function gamePlay() {
    // audio.play();
    setInterval(() => {
        dx = parseInt(window.getComputedStyle(dora, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dora, null).getPropertyValue('bottom'));

        rx = parseInt(window.getComputedStyle(rat, null).getPropertyValue('left'));
        ry = parseInt(window.getComputedStyle(rat, null).getPropertyValue('bottom'));
        diffX = Math.abs(dx - rx);
        diffY = dy - ry;
        if (diffX <= 60 && diffY <= 80) {
            // collison.play();
            audio.pause();
            rat.classList.remove('moveObstacle');
            gameOver.style.visibility = 'visible';
            button.style.visibility = 'visible';
            dora.classList.add('gameOverDora');
            if(localStorage.getItem('highest') == null){
            localStorage.setItem('highest',score);
            highScore = localStorage.getItem('highest')  ;
            console.log(highScore);
            }
            else{
                if(score > localStorage.getItem('highest')){
                    localStorage.setItem('highest',score);
                }
            }
            document.getElementById('highScore').innerHTML = "High Score: " + localStorage.getItem('highest');
            score = 0;
            setTimeout(() => {
                dora.classList.remove('doraCharacter1');
                dora.classList.remove('doraCharacter2');
                dora.style.left = '4vw'
                dora.style.bottom = '11vh'
                dora.classList.remove('gameOverDora');
            }, 1000)
            setTimeout(() => {
                collison.pause();
            }, 3000)

        }
        else if (diffX < 60 && diffY > 60) {
            if (cross) {
                score += 1;
                cross = false;
            }
            document.getElementById('score').innerHTML = "Score: " + score;
            setTimeout(() => {
                cross = true;
            }, 500)
            if (score == 10 * i) {
                setTimeout(() => {
                    beforeSpeed = parseFloat(window.getComputedStyle(rat, null).getPropertyValue('animation-duration'));
                    newSpeed = beforeSpeed - 0.1;
                    if (newSpeed > 2.9) {
                        rat.style.animationDuration = newSpeed + "s";
                    }
                    console.log(newSpeed);
                }, 800)
                i++;

            }

        }
    }, 10);

}

function playGame() {
    jumpDoraemon();
    gamePlay();
    dora = document.querySelector('.dora');
    rat = document.querySelector('.rat');
    playButton = document.querySelector('#btn1');
    gameOver = document.querySelector('.gameOver');
    dora.classList.add('doraCharacter1');
    playButton.style.visibility = 'hidden';
    rat.classList.add('moveObstacle');
    gameOver.style.visibility = 'hidden';
    button.style.visibility = 'hidden';
}

function playAgain() {
    jumpDoraemon();
    gamePlay();
    dora = document.querySelector('.dora');
    rat = document.querySelector('.rat');
    gameOver = document.querySelector('.gameOver');
    button = document.querySelector('#btn2');
    dora.classList.add('doraCharacter1');
    rat.classList.add('moveObstacle');
    gameOver.style.visibility = 'hidden';
    button.style.visibility = 'hidden';
}
document.querySelector('#btn1').addEventListener('click',playGame);
document.querySelector('#btn2').addEventListener('click', () => {
    document.getElementById('score').innerHTML = "Score: " + score;
    playGame();
});


