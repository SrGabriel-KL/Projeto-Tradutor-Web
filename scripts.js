/* 
Lógica de Programacao
    - Falar a lingua do computador
Algoritmo
    - Receita de bolo. Os passos na sequencia certa

JavaScript
    - Variáveis - pedacinho na memória do computador
        que voce pode guardar o que voce quiser

    - Funcoes
        pedacinho de código que, só executa quando
        eu chamo
        
    - Como se comunicar com o HTML
        Manipular a DOM

    console.log() mostra o que eu quiser na tela

    [x] Saber quando o botão foi clicado
    [ ] Pegar o texto que o usário digitou
    [ ] Mando para o servidor traduzir
    [ ] Receber a resposta do servidor (traducao)  
    [ ] Colocar o texto na tela   

    // JavaScript - scripts
    // HTML - document
    querySelector - procurar alguem no HTML
    value = valor - o texto que tem nele

   padrao =  https://api.mymemory.translated.net/get?q=
   traduzir =  Hello World!
   idioma = &langpair=pt-BR|en

   fetch / ferramenta do javascript para entrar em contato com um servidor
   await (Espere) - async (async & await)
   json (formato mais amigavel)
*/

let inputTexto = document.querySelector(".input-texto")
let textoTraduzido = document.querySelector(".traducao")
let seletorIdioma = document.querySelector(".idioma")

// ===== TRADUÇÃO =====
async function traduzir() {

    if (inputTexto.value.trim() === "") {
        textoTraduzido.innerText = "Digite ou fale um texto para traduzir."
        return
    }

    let idiomaDestino = "en" // padrão

    if (seletorIdioma.value === "Inglês") {
        idiomaDestino = "en"
    } else if (seletorIdioma.value === "Alemão") {
        idiomaDestino = "de"
    } else if (seletorIdioma.value === "Russo") {
        idiomaDestino = "ru"
    }

    let endereco =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(inputTexto.value) +
        "&langpair=pt-BR|" + idiomaDestino

    let resposta = await fetch(endereco)
    let dados = await resposta.json()

    textoTraduzido.innerText = dados.responseData.translatedText
}

// ===== MICROFONE =====
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

if (!SpeechRecognition) {
    alert("Seu navegador não suporta reconhecimento de voz.")
}

const recognition = new SpeechRecognition()

recognition.lang = "pt-BR"
recognition.continuous = false
recognition.interimResults = false

function ativarMicrofone() {
    recognition.start()
}

// Quando terminar de falar
recognition.onresult = function (event) {
    let textoFalado = event.results[0][0].transcript
    inputTexto.value = textoFalado

    // 👉 TRADUZ AUTOMATICAMENTE
    traduzir()
}

recognition.onerror = function (event) {
    console.error("Erro no microfone:", event.error)
}

