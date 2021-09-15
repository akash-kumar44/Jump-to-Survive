function jumpDoraemon(){
    document.onkeydown = function (e) {
        console.log("Key code is: ", e.keyCode)
        if(e.keyCode == 32 || e.keyCode == 38){
            dora = document.querySelector('.dora');
            dora.classList.add('jumpDora');
            setTimeout(()=>{
                dora.classList.remove('jumpDora');
            },1000)
        }
        else if (e.keyCode == 37 ) {
            dora = document.querySelector('.dora');
            dx = parseInt(window.getComputedStyle(dora,null).getPropertyValue('left'));
            if(dx >0 ){
            dora.style.left = (dx - 112) +"px";
            }
        }
        else if (e.keyCode == 39 ) {
            dora = document.querySelector('.dora');
            dx = parseInt(window.getComputedStyle(dora,null).getPropertyValue('left'));
            if(dx < 1280 ){
            dora.style.left = dx + 112 +"px";
            }
        }
    }
}
function gamePlay(){
    score = 0;
    var cross = true;
    var i=1;
    setInterval(() => {
        dora = document.querySelector('.dora');
        rat = document.querySelector('.rat');
        gameOver = document.querySelector('.gameOver');
        button = document.querySelector('#btn')
        dx = parseInt(window.getComputedStyle(dora,null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dora,null).getPropertyValue('bottom'));
        
        rx = parseInt(window.getComputedStyle(rat,null).getPropertyValue('left'));
        ry = parseInt(window.getComputedStyle(rat,null).getPropertyValue('bottom'));
        diffX = Math.abs(dx-rx);
        diffY = Math.abs(dy-ry);
        if(diffX <= 60 && diffY <= 60 ){
            gameOver.style.visibility = 'visible';
            button.style.visibility = 'visible';
            rat.classList.remove('moveObstacle');
            dora.classList.remove('jumpDora');
            
        }
        else if(diffX<60 && diffY > 60){
            if(cross){
                score += 1;
                cross = false;
            }
            document.getElementById('score').innerHTML = "Score: " + score;
            setTimeout(() => {
                cross = true;
            }, 500)
            if(score == 20 *i ){
                setTimeout(() => {
                beforeSpeed = parseFloat(window.getComputedStyle(rat,null).getPropertyValue('animation-duration'));
                newSpeed = beforeSpeed - .1 ;
                rat.style.animationDuration = newSpeed + "s";
                },800)
                i++;
                
            }
    
        }
    }, 10);

}
jumpDoraemon();
gamePlay();
