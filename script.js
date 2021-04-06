var carta1 = {
    nome:"Collie",
    img: "https://www.petlove.com.br/images/breeds/197778/profile/original/collie.jpg?1540411007",
    atributos:{
        agilidade: 1000,
        obediencia: 9000,
        agressividade: 2000
    }
}

var carta2 = {
    nome:"Akita",
    img: "https://www.petlove.com.br/images/breeds/193433/profile/original/akita_p.jpg?1532538103",
    atributos:{
        agilidade: 2000,
        obediencia: 8000,
        agressividade: 7000
    }
}

var carta3 = {
    nome:"Border Collie",
    img: "https://www.royalpets.com.br/media/petbreed/content/border-4.png",
    atributos:{
        agilidade: 8000,
        obediencia: 9000,
        agressividade: 2000
    }
}

var carta4 = {
    nome:"Dálmata",
    img: "https://www.petz.com.br/cachorro/racas/dalmata/img/dalmata-caracteristicas-guia-racas.webp",
    atributos:{
        agilidade: 6000,
        obediencia: 6000,
        agressividade: 7000
    }
}

var carta5 = {
    nome:"Beagle",
    img:"https://www.petlove.com.br/images/breeds/193436/profile/original/beagle-p.jpg?1532538271",
    atributos:{
        agilidade: 9000,
        obediencia: 1000,
        agressividade: 5000
    }
}

var carta6 = {
    nome:"São Bernardo",
    img:"https://www.petlove.com.br/images/breeds/197841/profile/original/Screen_Shot_2019-11-15_at_02.37.18.png?1573796380",
    atributos:{
        agilidade: 1000,
        obediencia: 3000,
        agressividade: 6000
    }
}

var carta7 = {
    nome:"Husky Siberiano",
    img:"https://www.petz.com.br/cachorro/racas/husky-siberiano/img/husky-siberiano-caracteristicas-guia-racas.jpg",
    atributos:{
        agilidade: 6000,
        obediencia: 5000,
        agressividade: 8000
    }
}

var carta8 = {
    nome:"Pit Bull",
    img:"https://t1.ea.ltmcdn.com/pt/images/9/8/2/racas_de_cachorros_pitbull_20289_600_square.jpg",
    atributos:{
        agilidade: 8000,
        obediencia: 10000,
        agressividade: 9000
    }
}

var cartaMaquina
var cartaJogador
var cartas = [carta1, carta2, carta3, carta4, carta5, carta6, carta7, carta8]

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQntdCartas()

function atualizaQntdCartas(){
    var divQntdCartas = document.getElementById('quantidade-cartas')
    var html = "Quantidade de Cartas no Jogo: " + cartas.length
    
    divQntdCartas.innerHTML = html
}

function atualizaPlacar(){
    var divPlacar = document.getElementById('placar')
    var html = "Jogador "+ pontosJogador + "/" + pontosMaquina + " Máquina"

    divPlacar.innerHTML = html
}

function sortearCarta(){
    var numCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numCartaMaquina]
    cartas.splice(numCartaMaquina, 1)

    var numCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numCartaJogador]
    cartas.splice(numCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
    
}

function exibeCartaJogador(){
    var divCartaJogador = document.getElementById('carta-jogador')
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style="width:inherit; height:inherit; position:absolute">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.img})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for(var atributo in cartaJogador.atributos){
        opcoesTexto += "<input type='radio' name='atributo' value='"+atributo+"'>"+atributo+": "+cartaJogador.atributos[atributo] + "<br>"
    }
    
    var html = "<div id='opcoes' class='carta-status'>"
    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + "</div>"
}


function obtemAtributoSelecionado(){
    var radioAtributos = document.getElementsByName('atributo')
    for(var i=0; i < radioAtributos.length; i++){
        if(radioAtributos[i].checked){
            return radioAtributos[i].value
        }
    }
}

function jogar(){
    var divResultado = document.getElementById('resultado')
    var atributoSelecionado = obtemAtributoSelecionado()

    if(cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]){
        htmlResultado = '<p class="resultado-final">Yeah! Você Venceu!</p>'
        pontosJogador++
    }else if(cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]){
        htmlResultado = '<p class="resultado-final">Oh não! Você perdeu!</p>'
        pontosMaquina++
    }else {
        htmlResultado = '<p class="resultado-final">O jogo empatou!</p>'
    }
    
    if(cartas.length == 0){
        alert("Fim de Jogo")
        if(pontosJogador > pontosMaquina){
            htmlResultado = '<p class="resultado-final">Você Venceu!</p>'
        }else if(pontosMaquina > pontosJogador){
            htmlResultado = '<p class="resultado-final">Você Perdeu!</p>'
        }else {
            htmlResultado = '<p class="resultado-final">Empatou!</p>'
        }
    }else {
        document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true
    
    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQntdCartas()
}

function exibeCartaMaquina(){
    var divCartaMaquina = document.getElementById('carta-maquina')
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style="width:inherit; height:inherit; position:absolute">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.img})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for(var atributo in cartaMaquina.atributos){
        opcoesTexto += "<p type='radio' name='atributo' value='"+atributo+"'>"+atributo+": "+cartaMaquina.atributos[atributo] + "<br>"
    }
    
    var html = "<div id='opcoes' class='carta-status --spacing'>"
    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + "</div>"
}

function proximaRodada(){
    var divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> 
                            <div id="carta-maquina" class="carta"></div>`

    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    var divResultado = document.getElementById('resultado')
    divResultado.innerHTML = ""


}

