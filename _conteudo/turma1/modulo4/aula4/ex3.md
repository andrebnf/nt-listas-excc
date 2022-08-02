---
titulo: "Exercício 3"
breadcrumb: "Módulo 4 > Aula 4: Funções > Execício 3"
codigoInicial: "// copie o código do enunciado e faça seus ajustes"
---

3••) Crie uma função que receba uma marmita e um ingrediente e que adiciona o ingrediente na marmita. Crie também uma função que pergunte ao usuário um ingrediente para ser adicionado à marmita e retorne a resposta. Utilize as duas funções para resolver de novo o exercício 4.3.3 (o exercício 3 da aula passada).

```js
function adicionaIngrediente(marmita, ingredient) {
    // escreva a implementação da função aqui
}

function perguntaIngrediente() {
    // escreva a implementação da função aqui
}

// modifique o código abaixo para usar as duas funções implementadas acima
let marmita = [];

let textoDoPrompt = "Informe o ingrediente ou 'pare' para parar";
let resposta = prompt(textoDoPrompt);

if (resposta !== "pare") {
  marmita.push(resposta);
  resposta = prompt(textoDoPrompt);
}

while (marmita.length > 0) {
  console.log(`O primeiro ingrediente informado foi: ${marmita[0]}`);
}
```
