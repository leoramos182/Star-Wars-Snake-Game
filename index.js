//--- CRIA O CANVAS 
const canvas = document.getElementById('canvas')
canvas.width = 500
canvas.height = 500
const contexto = canvas.getContext("2d")

//--- VARIÁVEIS
const cobra1 = [ {x : 0, y : 0} ]
const cobra2 = [ {x : 490, y : 490}]
const comida = {}
let direcao1 = 'd'
let direcao2 = 'ArrowLeft'
let tamanho = 10
let pontuacao1 = 0
let pontuacao2 = 0

function random(min,max){
    return Math.random() * (max - min) + min
}
//--- COLOCA COMIDA NO MAPA
function colocarComida(){
    comida.x = Math.floor( random( 0 , Math.floor( canvas.width  / tamanho ) ) ) * tamanho
    comida.y = Math.floor( random( 0 , Math.floor( canvas.height / tamanho ) ) ) * tamanho 
    console.log(comida)
} 
//--- DESENHA PLAYER 1 NO CANVAS
function desenharCobra1(){
    contexto.clearRect(0, 0, canvas.width, canvas.height)
    contexto.fillStyle = 'yellow'
    contexto.fillRect(comida.x, comida.y, tamanho, tamanho)

    for(let i = 0 ; i < cobra1.length; i++){
        const cobra = cobra1[i]
        contexto.fillStyle = '#e60000'
        contexto.fillRect(cobra.x, cobra.y, tamanho, tamanho)
        
        if(cobra.x >= canvas.width){
            cobra.x = 0
        }else if (cobra.x < 0){
            cobra.x = canvas.width
        }
        else if (cobra.y > canvas.height){
            cobra.y = 0
        }
        else if (cobra.y < 0){
            cobra.y = canvas.height
        }
    }
    
    window.requestAnimationFrame(desenharCobra1)
}
//--- DESENHA PLAYER 2 NO CANVAS
function desenharCobra2(){
    contexto.clearRect(480, 480, canvas.width, canvas.height)

    for(let i = 0 ; i < cobra2.length; i++){
        const cobra = cobra2[i]
        contexto.fillStyle = 'green'
        contexto.fillRect(cobra.x, cobra.y, tamanho, tamanho)
        if(cobra.x >= canvas.width){
            cobra.x = 0
        }else if (cobra.x < 0){
            cobra.x = canvas.width
        }
        else if (cobra.y > canvas.height){
            cobra.y = 0
        }
        else if (cobra.y < 0){
            cobra.y = canvas.height
        }
    }
    
    window.requestAnimationFrame(desenharCobra2)
}
//--- ANIMAÇÃO DO PLAYER 1
function animacao(){
    for(let i = cobra1.length - 1 ; i >= 0; i--){
        if(i === 0 && cobra1[i].x === comida.x && cobra1[i].y === comida.y){
            pontua1()            
            cobra1.push({})
            colocarComida()
            console.log('Darth Vader: '+ pontuacao1)
            cobra1[i].x = cobra1[i - 1].x
            cobra1[i].y = cobra1[i - 1].y
        }
        const cobra = cobra1[i]
        if(i == 0){
            switch(direcao1){
                case 'd' : 
                    if (cobra.x >= canvas.width) cobra.x = 0;    
                    cobra.x += tamanho;
                    break;
                case 'a' : 
                    if (cobra.x <= 0) cobra.x = canvas.width;
                    cobra.x -= tamanho;
                    break;
                case 's' : 
                    if(cobra.y > canvas.height) cobra.y = 0;
                    cobra.y += tamanho;
                    break;
                case 'w' :
                    if(cobra.y <= 0) cobra.y = canvas.height
                    cobra.y -= tamanho;
                    break;     
            }
        }
        else {
            cobra1[i].x = cobra1[i - 1].x
            cobra1[i].y = cobra1[i - 1].y
        }
        // window.requestAnimationFrame(animacao)
    }
}
//--- ANIMAÇÃO DO PLAYER 2
function animacao2(){
    for(let i = cobra2.length - 1 ; i >= 0; i--){
        const cobra = cobra2[i]
        if(i === 0 && cobra2[i].x === comida.x && cobra2[i].y === comida.y){
            pontua2()
            cobra2.push({})
            colocarComida()
            cobra2[i].x = cobra2[i - 1].x
            cobra2[i].y = cobra2[i - 1].y
            console.log('Luke Skywalker: ' + pontuacao2)
        }
        if(i == 0){
            switch(direcao2){
                case 'ArrowRight' : 
                    if (cobra2.x >= canvas.width) cobra.x = 0;  
                    cobra.x += tamanho;
                    break;
                case 'ArrowLeft' : 
                    if (cobra.x <= 0) cobra.x = canvas.width;
                    cobra.x -= tamanho;
                    break;
                case 'ArrowDown' : 
                    if(cobra2.y >= canvas.height) cobra.y = 0;
                    cobra.y += tamanho;
                    break;
                case 'ArrowUp' : 
                    if(cobra2.y <= 0) cobra.y = canvas.height
                    cobra.y -= tamanho;
                    break;
                
            }
        }
        else {
            cobra.x = cobra2[i - 1].x
            cobra.y = cobra2[i - 1].y
        }
        //window.requestAnimationFrame(animacao2)
    }
}
//--- PONTUACAO DO JOGADOR UM
function pontua1(){
    pontuacao1 += 10
    document.getElementById('pontos1')
    pontos1.innerHTML = ( 'Score: ' + pontuacao1 )
    if(pontuacao1 == 100){
        alert('Darth Vader vitorioso!!')
        window.location.reload()
    }
    
}

//--- PONTUACAO DO JOGADOR DOIS
function pontua2(){
    pontuacao2 += 10
    document.getElementById('pontos2')
    pontos2.innerHTML = ( 'Score: ' + pontuacao2 )
    if(pontuacao2 == 100){
        alert('Luke Skywalker vitorioso!!')
        window.location.reload()
    }
}
//--- JOGADOR 1 APERTA TECLA
function apertoTecla1(tecla){
    let novaDirecao1 = tecla.key
    const array = ["w", "a", "d", "s"];
    if(array.indexOf(novaDirecao1) ==-1){
        novaDirecao1 = direcao1;
    }
    if(direcao1 === 'w' && novaDirecao1 !== 's') direcao1 = novaDirecao1
    if(direcao1 === 'a' && novaDirecao1 !== 'd') direcao1 = novaDirecao1
    if(direcao1 === 'd' && novaDirecao1 !== 'a') direcao1 = novaDirecao1
    if(direcao1 === 's' && novaDirecao1 !== 'w') direcao1 = novaDirecao1


}
//--- JOGADOR 2 APERTA TECLA
function apertoTecla2(tecla){
    let novaDirecao2 = tecla.key
    const array = ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"];
    if(array.indexOf(novaDirecao2) ==-1){
        novaDirecao2 = direcao2;
    }
    if(direcao2 === 'ArrowUp' && novaDirecao2 !== 'ArrowDown') direcao2 = novaDirecao2
    if(direcao2 === 'ArrowLeft' && novaDirecao2 !== 'ArrowRight') direcao2 = novaDirecao2
    if(direcao2 === 'ArrowRight' && novaDirecao2 !== 'ArrowLeft') direcao2 = novaDirecao2
    if(direcao2 === 'ArrowDown' && novaDirecao2 !== 'ArrowUp') direcao2 = novaDirecao2
    
}
colocarComida()

window.addEventListener('keydown', apertoTecla1)
window.addEventListener('keydown', apertoTecla2)

window.setTimeout(animacao,tamanho)
window.setTimeout(animacao2,tamanho)

window.setInterval(animacao, 50)
window.setInterval(animacao2, 50)

window.requestAnimationFrame(desenharCobra1)
window.requestAnimationFrame(desenharCobra2)