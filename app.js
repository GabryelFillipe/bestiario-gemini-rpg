'use strict'
const cardContainer = document.getElementById("card-container")
const campoBusca = document.querySelector('.header-input') 
let dados = []


async function iniciarBusca() {
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error)
            return
        }
    }
    
    if (!campoBusca) {
        console.error("Campo de busca não encontrado no HTML");
        return
    }

    const termoBusca = campoBusca.value.toLowerCase();
    
    const dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    )
    renderizarCards(dadosFiltrados)
}

function renderizarCards(dados) {
    cardContainer.replaceChildren()

    for (let item of dados) {
        const article = document.createElement('article')
        article.classList.add('card')

        if (item.imagem) {
            const imagem = document.createElement('img')
            imagem.src = item.imagem
            imagem.alt = item.nome
            imagem.classList.add('card-imagem') 
            article.appendChild(imagem)
        }

        const cardTitulo = document.createElement('h2')
        cardTitulo.textContent = item.nome

        const criacao = document.createElement('p')
        criacao.innerHTML = `<strong>Origem:</strong> ${item.ano}`

        const descricao = document.createElement('p')
        descricao.textContent = item.descricao

        const documentacao = document.createElement('a')
        documentacao.textContent = 'Ler Lenda Completa'
        documentacao.href = item.link 
        documentacao.setAttribute('target', '_blank')

        article.appendChild(cardTitulo)
        article.appendChild(criacao)
        article.appendChild(descricao)
        article.appendChild(documentacao)
        
        cardContainer.appendChild(article)
    }
}

iniciarBusca()