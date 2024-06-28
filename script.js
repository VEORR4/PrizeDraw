var adicionar = document.getElementById("participantes") // input
var add = document.getElementById("add") // Botão add
var draw = document.getElementById("draw") // Botão draw
var clear = document.getElementById("clear") //Botão clear
var tabela = document.querySelector("table tbody") // tabela
const information = document.querySelector(".information") // Div da tooltip
const tooltip = document.querySelector(".tooltip") // tooltip
var winnersList = document.getElementById("winners-list") // Lista de vencedores
var closeModalBtn = document.getElementById("close-modal") // Botão de fechar modal


// Função para exibir participantes na tabela
function exibirParticipantes() {
     tabela.innerHTML = "" // Limpar tabela
     var participantesSalvos = localStorage.getItem("participantes")
     if (participantesSalvos) {
          var participantes = participantesSalvos.split(",")
          participantes.forEach((p, index) => {
               var linha = tabela.insertRow()
               var numero = linha.insertCell()
               var nome = linha.insertCell()
               var acao = linha.insertCell()

               numero.append(index + 1)
               nome.append(p)

               // Adicionar botão de exclusão
               var deleteButton = document.createElement("button")
               deleteButton.innerHTML = "x"

               deleteButton.classList.add("delete-button")
               deleteButton.onclick = function () {
                    excluirParticipante(index)
               }
               acao.appendChild(deleteButton)
          })
     }
}

// Função para adicionar participantes
function adicionarParticipantes() {
     var participantes = adicionar.value.split(";")
     var participantesSalvos = localStorage.getItem("participantes")
     if (participantesSalvos) {
          participantes = participantesSalvos.split(",").concat(participantes)
     }
     // Converter para letras maiúsculas e remover espaços extras
     participantes = participantes.map((p) => p.trim().toUpperCase())
     localStorage.setItem("participantes", participantes.join(","))
     adicionar.value = ""
     exibirParticipantes()
}

// Função para realizar o sorteio
function sortear() {
     var participantesSalvos = localStorage.getItem("participantes")
     if (participantesSalvos) {
          var participantes = participantesSalvos.split(",")
          var sorteados = []
          while (sorteados.length < 20 && participantes.length > 0) {
               var index = Math.floor(Math.random() * participantes.length)
               var sorteado = participantes.splice(index, 1)[0]
               if (adicionar.value = sorteado){
               //      alert(adicionar.value)
                    sorteados.push(sorteado)
               }
          }
          winnersList.innerHTML = ""
          sorteados.forEach((w) => {
               var li = document.createElement("li")
               li.textContent = w
               winnersList.appendChild(li)
          })
          document.querySelector(".modal").style.display = "block"
     }
}


// Função para fechar o modal
function fecharModal() {
     document.querySelector(".modal").style.display = "none"
}

// Função para excluir participante
clear.addEventListener("click", excluirParticipante)

function excluirParticipante(index) {
     var participantesSalvos = localStorage.getItem("participantes")
     if (participantesSalvos) {
          var participantes = participantesSalvos.split(",")
          participantes.splice(index, 1)
          localStorage.setItem("participantes", participantes.join(","))
          exibirParticipantes()
     }
}

// Adicionar evento de clique aos botões
add.addEventListener("click", adicionarParticipantes)
draw.addEventListener("click", sortear)
closeModalBtn.addEventListener("click", fecharModal)

// Exibir tooltip ao passar o mouse sobre o input
adicionar.addEventListener("mouseover", () => {
     tooltip.style.display = "block"
})

adicionar.addEventListener("click", () => {
     tooltip.style.display = "none"
})

adicionar.addEventListener("mouseout", () => {
     tooltip.style.display = "none"
})

// Inicializar a tabela com participantes salvos
exibirParticipantes()
