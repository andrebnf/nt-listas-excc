---
titulo: "Aula: Exemplos de Funções"
breadcrumb: "Módulo 4 > Aula 4: Exemplos de Funções"
codigoInicial: "// copie aqui os exemplos e teste ou modifique a vontade!"
---


### Exemplo 1 - Como declarar e 'chamar' uma função
Aqui mostramos uma função simples que soma dois números. Depois 'guardamos' o resultado da 'chamada' dessa função e mostramos na tela esse resultado.


```js
function somaDoisNumeros(numeroX, numeroY) {
  let resultado = numeroX + numeroY;

  return resultado;
}

let resultadoDeUmaSoma = 0
alert(resultadoDeUmaSoma)

resultadoDeUmaSoma = somaDoisNumeros(1, 2)
alert(resultadoDeUmaSoma)
```


### Exemplo 2 - Usando um if dentro de uma função
Aqui também somamos dois números, porém só quando o primeiro número é maior que 5. Perceba que quando 'chamamos' a função a ordem dos 'argumentos' importa.

```js
function somaDoisNumerosEspecial(numeroX, numeroY) {
  if (numeroX > 5) {
    return numeroX
  } else {
    return numeroX + numeroY
  }
}

let resultadoDaSomaEspecial = 0
alert(resultadoDaSomaEspecial)

resultadoDaSomaEspecial = somaDoisNumerosEspecial(3, 2)
alert(resultadoDaSomaEspecial)

resultadoDaSomaEspecial = somaDoisNumerosEspecial(6, 3)
alert(resultadoDaSomaEspecial)

resultadoDaSomaEspecial = somaDoisNumerosEspecial(3, 6)
alert(resultadoDaSomaEspecial)
```


### Exemplo 3 - Usando um loop dentro de uma função
Aqui usamos um loop for dentro da função recebendo como argumento um texto qualquer e um número que representa a quantidade de vezes que queremos mostrar esse texto.

```js
function mostraUmTextoVariasVezes(texto, vezes) {
  for (let i = 0; i < vezes; i++) {
    alert(texto)
  }
}

mostraUmTextoVariasVezes('ola mundo', 4)
```


### Exemplo 4 - Usando uma função dentro de uma função
Aqui usamos uma função dentro de uma função. Olhe que legal! Nesse programa conseguimos mostrar o resultado de uma multiplicação sem usar o símbolo especial de vezes (*). Ou seja, conseguimos o resultado com um loop e a soma do numero uma certa quantidade de vezes.

```js
function multiplicaUmNumeroSemUsarMultiplicacao(numero, vezes) {
  let total = 0

  for (let i = 0; i < vezes; i++) {
    total = somaDoisNumeros(total, numero)
  }

  alert(total);
}

function somaDoisNumeros(numeroX, numeroY) {
  let resultado = numeroX + numeroY;

  return resultado;
}

multiplicaUmNumeroSemUsarMultiplicacao(2, 8)
```
