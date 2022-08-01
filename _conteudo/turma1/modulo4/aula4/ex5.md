---
titulo: "Exercício 5"
breadcrumb: "Módulo 4 > Aula 4: Funções > Execício 5"
codigoInicial: "// copie o código do enunciado e faça seus ajustes"
---

5••••) O código abaixo funciona sem errors, porém várias operações poderiam ser abstraídas para funções. Identifique essas operações e converta-as em funções, modificado o programa original:


```js
let listaDeCompras = []
let listaDeProdutos = []

let arroz = { produto: "arroz", preco: 6 }
let feijao = { produto: "feijao", preco: 9 }

listaDeProdutos.push(arroz)
listaDeProdutos.push(feijao)

let resposta = prompt(`Digite uma das opções abaixo ou 'pare' para terminar:\n
  1- Cadastrar novo produto\n
  2- Adicionar um produto na lista de compras\n
  3- Calcular valor da compra\n
  4- Mostrar produtos disponíveis\n
  5- Mostrar lista de compras
`)

while (resposta !== "pare") {
  if (resposta === '1') {
    let nome = prompt("Digite o nome do produto")
    let valor = +prompt("Insira o valor do produto")
    let produto = ''

    for(let i = 0; i < listaDeProdutos.length; i++) {
      if(nome == listaDeProdutos[i].produto) {
        produto = listaDeProdutos[i]
      }
    }

    if(produto !== '') {
      alert("Produto já cadastrado")
    } else {
      listaDeProdutos.push({ produto: nome, preco: valor})
    }
  } else if (resposta === '2') {
    let nome = prompt("Digite o nome do produto")
    let produto = ''

    for(let i = 0; i < listaDeProdutos.length; i++) {
      if(nome == listaDeProdutos[i].produto) {
        produto = listaDeProdutos[i]
      }
    }

    if(produto !== '') {
      listaDeCompras.push(produto)
    } else {
      alert("Produto não cadastrado")
    }
  } else if (resposta === '3') {
    let soma = 0;

    for(let i = 0; i < listaDeCompras.length; i++) {
      soma += listaDeCompras[i].preco
    }

    alert(`Valor total da compra: ${soma}`)
  } else if (resposta === '4') {
    for(let i = 0; i < listaDeProdutos.length; i++) {
      alert(`Produto: ${listaDeProdutos[i].produto} - Preço: ${listaDeProdutos[i].preco}`)
    }
  } else if (resposta === '5') {
    for(let i = 0; i < listaDeCompras.length; i++) {
      alert(`Produto: ${listaDeCompras[i].produto} - Preço: ${listaDeCompras[i].preco}`)
    }
  } else {
    alert("Opção inválida!")
  }

  resposta = prompt(`Digite uma das opções abaixo ou 'pare' para terminar:\n
    1- Cadastrar novo produto\n
    2- Adicionar um produto na lista de compras\n
    3- Calcular valor da compra\n
    4- Mostrar produtos disponíveis\n
    5- Mostrar lista de compras
  `)
}

let soma = 0;

for(let i = 0; i < listaDeCompras.length; i++) {
  soma += listaDeCompras[i].preco
}

alert(`Valor total da compra: ${soma}`)
```
