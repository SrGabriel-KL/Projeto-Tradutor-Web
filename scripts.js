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

async function traduzir() {
    const texto = inputTexto.value.trim()

    if (texto === "") {
        textoTraduzido.innerText = ""
        return
    }

    let idiomaDestino = "en"
    if (seletorIdioma.value === "Inglês") idiomaDestino = "en"
    else if (seletorIdioma.value === "Alemão") idiomaDestino = "de"
    else if (seletorIdioma.value === "Russo") idiomaDestino = "ru"

    try {
        let endereco =
            "https://api.mymemory.translated.net/get?q=" +
            encodeURIComponent(texto) +
            "&langpair=pt-BR|" + idiomaDestino

        let resposta = await fetch(endereco)
        let dados = await resposta.json()

        if (inputTexto.value.trim() === texto) {
            textoTraduzido.innerText = dados.responseData.translatedText
        }
    } catch (e) {
        console.error(e)
    }
}

//  MICROFONE
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.lang = "pt-BR"
recognition.interimResults = false

function ativarMicrofone() {
    recognition.start()
}

recognition.onresult = (event) => {
    const textoFalado = event.results[0][0].transcript
    inputTexto.value = textoFalado
    traduzir()
}

recognition.onerror = (event) => {
    alert("Erro no microfone: " + event.error)
}

// Automático
inputTexto.addEventListener("input", traduzir)
seletorIdioma.addEventListener("change", traduzir)



