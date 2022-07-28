---
title: "Aula: Funções"
breadcrumb: "Módulo 4 > Aula 4: Funções"
startingEditorCode: |
  function olaMundo() {
    console.log("Olá, mundo!")
  }

  olaMundo()
---

### Criando funções com a _keyword_ `function`

Um conceito importante na programação é o conceito de funções. Uma função nada mais é do que um trecho de código encapsulado num dado nome[^1] (identificador) para ser chamado a qualquer momento dentro do nosso código. Nós já utilizamos diversas funções fornecidas por padrão pelo Javascript ao longo do curso, como as funções `prompt`, `alert`, `console.log` etc. No Javascript, definimos funções atráves da _keyword_ (palavra-chave) `function` e com a seguinte notação:

[^1]: Existem funções ditas _anônimas_ (sem nome) que são declaradas sem um nome. Veremos seu funcionamento e seus usos futuramente.

```js
function olaMundo() {
  console.log("Olá, mundo!")
}
```

Uma vez definida, podemos chamar (executar) uma função no nosso código utilizando parênteses (`()`):

```js
olaMundo()
```

Ao chamar a função, veremos que a string `"Olá, Mundo!"` será impressa no console.

### Funções com parâmetros

Funções podem receber parâmetros para utilizar durante sua execução. Por exemplo, se quisermos criar uma função que mostre no console uma mensagem de bom dia personalizada com o nome do usuário, podemos fazer algo como:

```js
function bomDia(nome) {
  console.log("Bom dia, " + nome + "!")
}
```

Assim, ao chamar a função `bomDia` com um valor para o parâmetro `nome` dela, será impresso no console uma mensagem de bom dia com o nome passado para a função:

```js
bomDia("Dani")     // vai imprimir "Bom dia, Dani!"
bomDia("Giovanna") // vai imprimir "Bom dia, Giovanna!"
bomDia("Nicollas") // vai imprimir "Bom dia, Nicollas!"
```

Não há limite de parâmetros que uma função pode possuir, mas é importante notar que a ordem dos valores passados na hora de chamar a função importa. Então no caso de uma função que recebe dois números e mostra o resultado da subtração deles, poderíamos ter uma situação como essa:

```js
function subtrai(n1, n2) {
  console.log(n1 - n2)
}

subtrai(5, 3) // vai imprimir 2 (pois 5 - 3 = 2)
subtrai(3, 5) // vai imprimir -2 (pois 3 - 5 = -2)
```

### Retorno da função

Funções podem retornar valores ao final de sua execução. Para isso, utilizamos a _keyword_ `return`:

```js
function subtraiERetorna(n1, n2) {
  return n1 - n2
}
```

Nesse caso, o resultado da subtração de `n1` com `n2` é retornado pela função para ser utilizado no restante do programa. Nós já utilizamos uma função com retorno: a função `prompt`, pois ela devolve pra gente o que o usuário digitou na caixinha de prompt.

Vale dizer que, assim que o Javascript encontra a _keyword_ `return`, a execução daquela função é interrompida imediatamente e o que aparece após o `return` é retornado por ela:

```js
function retornoAntecipado() {
  console.log("Eu vou ser imprimido no console")
  return 0
  console.log("Eu não vou ser imprimido no console")
}
```

Esse comportamento é útil, por exemplo, quando possuímos algum condicional (`if`) no corpo da nossa função e o valor que essa função retorna é diferente conforme a condição for verdadeira ou falsa:

```js
function adultoOuCrianca(idade) {
  if (idade >= 18) {
    return "Adulto"
  } else {
    return "Criança"
  }
}
```

### Por que usamos funções?

Funções são úteis em básicamente dois cenários:

- Abstrair um código complicado em algo mais legível quando a forma que a operação é feita em si não importa, por exemplo, o seguinte código encontra e imprime no console o maior número de uma lista de números:

  ```js
  let numeros = [2, 4, -1, 10, 15, 9, 1, 13]

  let maior = numeros[0]

  for(let i = 1; i < numeros.length; i++) {
    if(maior < numeros[i]) {
      maior = numeros[i]
    }
  }

  console.log(maior)
  ```

  Podemos encapsular boa parte desse código numa função, assim o programa se tornaria mais legível para alguém que não precise saber detalhes sobre o algoritmo de encontrar o maior elemento da lista:

  ```js
  function encontraMaior(lista) {
    let maior = lista[0]

    for(let i = 1; i < lista.length; i++) {
      if(maior < lista[i]) {
        maior = lista[i]
      }
    }

    return maior
  }

  let numeros = [2, 4, -1, 10, 15, 9, 1, 13]

  let maior = encontraMaior(numeros)

  console.log(maior)
  ```

- Criar uma forma de reutilizar código em várias partes diferentes do programa, por exemplo, no problema de encontrar o maior elemento de uma lista, imagine que em vez de encontrar o maior elemento de uma única lista, teremos que encontrar o maior elemento de várias listas e vários momentos diferentes do nosso programa:

  ```js
  let lista1 = [...]

  let maior1 = lista1[0]

  for(let i = 1; i < lista1.length; i++) {
    if(maior1 < lista1[i]) {
      maior1 = lista1[i]
    }
  }

  // .
  // .
  // .

  let lista2 = [...]

  let maior2 = lista2[0]

  for(let i = 1; i < lista2.length; i++) {
    if(maior2 < lista2[i]) {
      maior2 = lista2[i]
    }
  }

  // .
  // .
  // .

  let lista3 = [...]

  let maior3 = lista3[0]

  for(let i = 1; i < lista3.length; i++) {
    if(maior3 < lista3[i]) {
      maior3 = lista3[i]
    }
  }

  // .
  // .
  // .

  let lista4 = [...]

  let maior4 = lista4[0]

  for(let i = 1; i < lista4.length; i++) {
    if(maior4 < lista4[i]) {
      maior4 = lista4[i]
    }
  }
  ```

  Repetir esse algoritmo várias e várias vezes pode ser exaustivo e aumenta as chances de cometer erros. Além disso, se por algum motivo ele precisar ser alterado, teríamos que alterar ele em todos os lugares que ele ocorre. Se convertemos esse algoritmo em uma função, esses dois problemas desaparecem e o programa se torna muito mais enxuto e bem organizado:

  ```js
  function encontraMaior(lista) {
    let maior = lista[0]

    for(let i = 1; i < lista.length; i++) {
      if(maior < lista[i]) {
        maior = lista[i]
      }
    }

    return maior
  }

  let lista1 = [...]

  let maior1 = encontraMaior(lista1)

  // .
  // .
  // .

  let lista2 = [...]

  let maior2 = encontraMaior(lista2)

  // .
  // .
  // .

  let lista3 = [...]

  let maior3 = encontraMaior(lista3)

  // .
  // .
  // .

  let lista4 = [...]

  let maior4 = encontraMaior(lista4)
  ```




