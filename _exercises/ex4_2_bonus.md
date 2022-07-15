---
title: '4.2 - Bônus'
breadcrumb: 'Módulo 4 > Aula 2 > Execício Bônus'
startingEditorCode: '// copie o código do enunciado e faça seus ajustes'
---

Bonus ☠) Descubra o que o código abaixo está fazendo e encontre os erros:

```js
let senhaDeAtendimento = 1
let continuarAtendimento = true

while (continuarAtendimento === false) {
  console.log(`Próximo paciente com senha: ${senhaDeAtendimento}`)
  let idade = +prompt("Qual a idade do paciente?")

  if (idade < 12) {
    console.log("Dirija-se à Pediatria")
  } else {
    console.log("Aguarde ser chamada(o) pelo nome")
  }
  
  let entrada = prompt("Chamar próxima senha? (Digite 's' ou 'n')")
  if (entrada !== 's') {
    continuarAtendimento = false
  }
}
```

**Obs**: Ao abrir o exercício pela primeira vez, o código acima será copiado para o editor para que sirva de ponto de partida
