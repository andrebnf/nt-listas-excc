---
titulo: "Exercício 4"
breadcrumb: "Módulo 4 > Aula 3: Inspeção de Código (debug) > Execício 4"
codigoInicial: "// copie o código do enunciado e faça seus ajustes"
---

4•••) João gostaria agora de analisar o preço de uma marmita. Para cada ingrediente, some seus valores e exiba na tela. Ao final, se o preço for maior ou igual a R$15, exiba um texto (com `console.log`) para o usuário

```js
let arroz = { nome: "arroz", preco: 6 };
let feijao = { nome: "feijão", preco: 9 };

let marmita = [arroz, arroz];

let somaTotal = 0;
for (let i = 0; i < marmita.length; i++) {
  somaTotal = marmita[i].preco;
}

if (somaTotal <= 15) {
  console.log("O preço chegou ou ultrapassou R$15,00");
}
```
