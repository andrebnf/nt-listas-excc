---
titulo: "Exercício 3"
breadcrumb: "Módulo 4 > Aula 3: Inspeção de Código (debug) > Execício 3"
codigoInicial: "// copie o código do enunciado e faça seus ajustes"
---

3••) Agora que a Cozinha Solidária está expandindo, João escreveu um programa que cria uma marmita. Para isto, ele pergunta ao usuário os ingredientes a serem adicionados. Enquanto o usuário não informar 'pare', continue adicionando os ingredientes na marmita. Ao final, João gostaria de comparar se a marmita está vazia. Caso não esteja vazia, exiba o primeiro ingrediente (com `console.log`)

```js
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
