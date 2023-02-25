// - 1 - definir local

//definir const para os docuemntos em html
const form = document.getElementById("novoItem") //novo item - nome + quantidade
const lista = document.getElementById("lista")//lista q fica do lado
//definir um const para o itens NÃO sumir quando recarrego || => se for falso fique vazio
const itens = JSON.parse(localStorage.getItem("itens")) || []

//para cada elemento da const itens eu vou criar um novo elemento no banco de dados do navegador
itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

//-1




// - 2 - criar elementos

//crio uma const ao clicar em "adicionar" ele vai trasformar a função de um obj para um string
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    //eu crio/separo uma cont para os dois elementos q eu quero q estão drento da function EVENTO, q está dentro do FORM
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //crio uma const para definir os elementos da lista como nome e valor - ficar melhor do navegador ler, apenas para achar = O código acima verifica se existe algum elemento com o mesmo nome. Caso exista, ele guarda o objeto na const existe, ou undefined caso não exista
    const existe = itens.find( elemento => elemento.nome === nome.value )

    //oq foi dito a cima soh q n para achar, mas para DEFINIR
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //Se eu coloco um elemento q já está lah ele é criado, se n ele eh reinventado como um número maior
    //defino o item ID
    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    //coloco uma condição para o ID - ponto de interrogação = POREM = ele vai adicionar um em baixo do outro, e n pode ser valor negativo = id + 1
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        //.push diz q os ITENS vão ser uma const gigante = itemAtual.id
        itens.push(itemAtual)
    }

    //n desaparecer quando carregado - serve para armazenar dados
    localStorage.setItem("itens", JSON.stringify(itens))

    //defino como o nada, pq n eh um valor mas um condição
    nome.value = ""
    quantidade.value = ""
})

// - 2


// - 3 - deletar elementos

//function para criar elemento - id e quantidade
function criaElemento(item) {

    const novoItem = document.createElement("li")
    novoItem.classList.add("item")

    const numeroItem = document.createElement("strong")
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//function para deletar elemento da lista, como um todo
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")//vai virar um texto
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao //escrever 
}

//funcution para deletar o elemento em especifico
function deletaElemento(tag, id) {
    tag.remove()
    //Item - splice = definir a posição
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    //n desaparecer quando selecionado
    localStorage.setItem("itens", JSON.stringify(itens))
}

// - 3