---
titulo: "Exercício 5"
breadcrumb: "Módulo 4 > Aula 3: Inspeção de Código (debug) > Execício 5"
codigoInicial: "// copie o código do enunciado e faça seus ajustes"
---

5••••) João está escrevendo um programa para a Marta utilizar. Ela é quem administra os ingredientes da Cozinha Solidária do seu bairro.

Hoje a Marta utiliza uma caneta e um pedaço de papel para analisar a produção da cozinha: de tempos em tempos, ela escreve quantas marmitas foram feitas desde a última vez que ela anotou. Após anotar, é preciso somar a quantidade total de marmitas até o momento para saber se a Cozinha pode continuar produzindo.

Ela fica repetindo este processo. Quando o número total atingir 300 marmitas, a Marta deve alertar a cozinha, pois este é o número máximo de marmitas que dados os ingredientes que a cozinha tem.

Encontre os erros no programa abaixo que João escreveu para automatizar o trabalho da Marta:

```js
let somaTotal = 0;
let maximoDeMarmitas = 300;
let textoPrompt = "Quantas marmitas finalizadas?";

let quantidadeDeMarmitas = +prompt(textoPrompt);

if (quantidadeDeMarmitas > maximoDeMarmitas) {
  quantidadeDeMarmitas = +prompt(textoPrompt);
  console.log("Soma até o momento:");
  console.log(somaTotal);
}
```
