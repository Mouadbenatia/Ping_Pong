let  canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")

let speed = 5
let dx = speed / 2
let dy = speed / 2
let dPlus =  1/2 
let computerLevel = 0.1

let scoreComputer = 0 
let scoreUser = 0
let scoreDisplayComputer = document.querySelector(".scoreComputer")
let scoreDisplayUser = document.querySelector(".scoreUser")

let restartBtn = document.querySelector(".restart")
let pauseBtn = document.querySelector(".pause")

let pauseResumeBtn = document.querySelector(".btn-p-r")
let popup = document.createElement("div")
let paddleComputer = {
    x:canvas.width /2 - 25,
    y:0,
    color: "red",
    width:50,
    height:10, 
}
let paddleUser  = {
    x: canvas.width / 2 - 25 ,
    y: canvas.height - 10 ,
    color :"red", 
    width:100,
    height:10,
}

let ball = {
   x: canvas.width / 2,
   y: canvas.height / 2,
   raduis: 10,
   color:"blue",
}






function drawBall(){
    ctx.beginPath()
    ctx.arc(ball.x,ball.y,ball.raduis,0,2*Math.PI)
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    if (ball.x > canvas.width - ball.raduis || ball.x - ball.raduis <0) {
        dx = -dx
    }
    if(ball.y >  canvas.height  || ball.y - ball.raduis <0 ){
        if(ball.y > canvas.height){
            dy = speed/2
            dx = speed / 2
            scoreComputer++
            scoreDisplayComputer.innerHTML ='Score computer : '+ scoreComputer
            ball.y = canvas.height / 2
            ball.x = canvas.width /  2
        }
        if(ball.y - ball.raduis < 0){
            dy = speed / 2
            dx = speed / 2
            scoreUser++
            scoreDisplayUser.innerHTML ='Score user : '+ scoreUser
            ball.y = canvas.height / 2
            ball.x = canvas.width /  2
        }
    }
    
   

    ball.x += dx
    ball.y += dy


    if(ball.x + ball.raduis >= paddleUser.x  && ball.y + ball.raduis >= paddleUser.y && ball.x + ball.raduis <= paddleUser.x + paddleUser.width && ball.y - ball.raduis <= paddleUser.y + paddleUser.height  ){
        dy = -dy * 1.05
        dx = dx * 1.05
        ball.y += dy
        dy * 2
    }
    if(ball.x + ball.raduis > paddleComputer.x  && ball.y + ball.raduis > paddleComputer.y && ball.x + ball.raduis < paddleComputer.x + paddleComputer.width && ball.y - ball.raduis < paddleComputer.y + paddleComputer.height  ){
        dy = -dy * 1.1
        dx = dx*1.1
        ball.y += dy
        
    }
}

function drawPaddleUser(){
    ctx.fillRect(paddleUser.x , paddleUser.y, paddleUser.width , paddleUser.height , paddleUser.color)
    ctx.fillStyle = paddleUser.color;
}

function drawPaddleComputer(){
    ctx.fillRect(paddleComputer.x ,paddleComputer.y , paddleComputer.width, paddleComputer.height)
    ctx.fillStyle = paddleComputer.color;
}
document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowLeft") {
      if(paddleUser.x > 0)
      paddleUser.x -= speed*2
      console.log(paddleUser.x)
    } else if (event.code === "ArrowRight") {
      // Handle "down" arrow key press
      if(paddleUser.x < canvas.width - 100 ){
      paddleUser.x += speed*2
      }
      console.log(paddleUser.x)
    }
  })
    // Restart Game 
    restartBtn.addEventListener("click",()=>{
        paddleUser.x = canvas.width / 2 - 25
        ball.x = canvas.width / 2
        ball.y = canvas.height / 2
        scoreComputer = 0
        scoreUser = 0
        dx = 0
        dy = 0
        setTimeout(()=>{
            dx = speed / 2
            dy = speed / 2
        },500)
        scoreDisplayComputer.innerHTML ='Score computer : '+ scoreComputer
        scoreDisplayUser.innerHTML ='Score user : '+ scoreComputer
    })
    pauseBtn.addEventListener("click",()=>{
        pauseBtn.classList.toggle("active")
        let imgResume = document.querySelector("#img")
        if(pauseBtn.classList.contains("active")){
            pauseResumeBtn.classList.remove("r")
            pauseResumeBtn.classList.add("p")
            imgResume.src = "./pause-button.png"
            ball.x = ball.x
            ball.y = ball.y
            dx = 0
            dy = 0
            speed = 0
    
        }
        else{
            pauseResumeBtn.classList.remove("p")
            pauseResumeBtn.classList.add("r")
            imgResume.src = "./play-button.png"
            speed = 5
            if(ball.y < canvas.height / 2){
                dy =  -speed / 2
                dx =  -speed / 2
            }
            if(ball.y > canvas.height / 2){
                dy =  speed / 2
                dx =  speed / 2
            }
            pauseBtn.innerHTML = "Pause"
        }

    })
    

function moveComputer (){
    let targetPos = ball.x  - paddleComputer.width / 2  
    // paddleComputer.x = targetPos 
    let paddleSpeed = 3; // Adjust the paddle speed as desired

  if (paddleComputer.x < targetPos) {
    paddleComputer.x += paddleSpeed;
  } else if (paddleComputer.x > targetPos) {
    paddleComputer.x -= paddleSpeed;
  }
  }
function gameLoop() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // update paddle position
    drawPaddleUser()
    drawPaddleComputer()
    drawBall()
    moveComputer ()
    // request next animation frame
    requestAnimationFrame(gameLoop);
  }
  
  // start game loop
  gameLoop();