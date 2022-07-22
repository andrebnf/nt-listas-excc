---
title: "Aula: Utilidades"
breadcrumb: "Módulo 4 > Aula 3: Inspeção de Código (debug)"
startingEditorCode: |
  console.log("Olá, mundo")
  let alunos = ["Dani", "Giovanna", "Nicollas"];

  let pessoas = [
    { nome: "Ana",     idade: 23 },
    { nome: "Eduardo", idade: 31 },
    { nome: "Pedro",   idade: 12 },
    { nome: "Renata",  idade: 9 },
  ];
---

### Mostrar mensagem com o `console.log`

Dois conceitos importantes em programação são _Entrada_ e _Saída_, ou **IO** (do inglês _Input_ e _Output_).
Até agora trabalhamos com um método de entrada e um método de saída: o `prompt` e o `alert`. Com o `prompt`, temos a _entrada_ de informação no programa, e com o `alert` temos a _saída_.

Um método bastante usado no JavaScript por programadores é o `console.log`:

```js
console.log("Olá, mundo");
```

Funciona de um jeito similar ao `alert`, mas enquanto o alert trava o site todo para mostrar a mensagem e espera um OK do usuário, o `console.log` apenas mostra em texto a informação e depois ja deixa o código seguir rodando, sem ser necessário o OK do usuário.

[📂Documentação console.log](https://developer.mozilla.org/pt-BR/docs/Web/API/console/log)

## Revisão de `for`

Como o `for` funciona exatamente? Vamos revisitar.

```
let inicio = 0;
let fim = 10;

for (let i = inicio; i < fim; i++) {
  // veremos o i várias vezes
  // observe que o valor de i muda!
  console.log(i);
}
```

Por que o `i` muda de valor em cada iteração do loop `for` , nós o usamos para passar pelos valores de um array:

```js
let alunos = ["Dani", "Giovanna", "Nicollas"];

for (let i = 0; i < 3; i++) {
  console.log(i); // i vai de 0 até 2
  // console.log(alunos[i])
}
```

## Inspeção de código?

Inspeção de código, ou debug (depuração).
Examinamos o código, procurando os erros de programação. Para saber quais são os erros, também é bom saber o que o código deveria fazer.

O código seguinte, parecido com o loop anterior, tem um erro. Ele deveria mostrar os números `0,1,2,3,4,5` , um de cada vez:

```js
// O que vai acontecer quando rodarmos esse código?
for (let contador = 0; contador >= 5; contador--) {
  console.log(contador);
}
```

O código seguinte deveria mostrar se uma pessoa pode ou não tirar uma CNH:

```js
idade = prompt("Qual a sua idade?");

if (idade === 18) {
  console.log("Pode ter CNH");
}
```

O código seguinte deveria criar um objeto `cursoOnline` e mostrar o nome de cada um dos dias de aula.

```js
let cursoOnline = {
	turmas = 1
	diasDeAula = [quinta, sexta]
	alunos = ['Dani', 'Giovanna', 'Nicollas']
}

for (let i = 0; i < diasDeAula.length; i++) {
	console.log(diasDeAula[i])
}
```

O código seguinte deveria mostrar os as pessoas com nomes com 5 letras ou menos.

```js
for (let i = 0; i < pessoas.length; i++) {
  if (pessoas[i].nome <= 5) {
    console.log(pessoas[i].nome);
  }
}
```
