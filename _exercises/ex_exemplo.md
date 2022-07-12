---
title: 'Ex. Exemplo'
breadcrumb: 'Módulo 0 > Aula 0 > Execício Exemplo'
---

Nesse exercício vamos aprender sobre condicionais. Na lógica de programação, frequentemente é necessário criar condições para que o nosso código consiga representar um certo problema da vida real. Vamos supor que estamos criando um jogo entre dois oponentes (Ana e Bianca) e queremos saber quem ganhou o jogo. Neste caso, a condição que nos ajuda a descobrir quem tem maior pontuação é:

```js
let pontos_ana = 0
let pontos_bianca = 0

if (pontos_ana > pontos_bianca) {
  alert("Ana Ganhou")
} else {
  if (pontos_ana === pontos_bianca) {
    alert("Empate")
  } else {
    alert("Bianca Ganhou")
  }
}
```

Em seguida, copie o código acima, cole no editor ao lado e pressione **'Executar Código'**.