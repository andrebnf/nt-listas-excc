import { 
  executaJavaScript
} from "../lib/executorDeCodigo"

type InputDeCenario = [
  codigo: string, 
  qtdeLogs: number, 
  deveFalhar: boolean, 
  linhaDoErro: number,
  erroEsperado: string,
  logsEsperados: string[]
]

// Teste tabular para diferentes cenarios de codigos com ou sem erros

const cenarios: InputDeCenario[] = [
  // sem erro:
  [`let x = 10
  for (let i = x; i > 0; i--) { 
    console.log(i)
  }`, 10, false, 0, '', []],

  [`let x = 2
  console.log(x)
  console.log(\`Soma: \${x + 8}\`)
  `, 2, false, 0, '', ['2', 'Soma: 10']],
  
  [`console.log(1 + 1)`, 1, false, 0, '', ['2']],
  
  [`function abc(str) {
    return str + '!'
  }
  console.log(abc('oi'))`, 1, false, 0, '', ['oi!']],
  
  // com erro:
  [`console.log(nao_declarada)`, 0, true, 1, 'nao_declarada', []],

  [`for (let i = 0; i < 10; i++) { 
    console.log(i)
    console.log(variavel_nao_definida)
  }`, 1, true, 3, 'variavel_nao_definida', []],

  [`// abc
  
  function abc(str) {
    return str + variavel_nao_definida
  }
  console.log(abc('oi'))`, 0, true, 4, 'variavel_nao_definida', []],

]

const fnTesteTabular = test.each<InputDeCenario>(cenarios)

fnTesteTabular('testa diversos pedacos de codigos', (
  codigo, qtdeLogs, deveFalhar, linhaDoErroEsperada, erroEsperado, logsEsperados
  ) => {
  let [logs, temErro, linhaDoErro, mensagemDeErro] = executaJavaScript(codigo)
  
  expect(logs.length).toEqual(qtdeLogs)
  expect(temErro).toBe(deveFalhar)
  expect(linhaDoErro).toEqual(linhaDoErroEsperada)
  erroEsperado !== '' && expect(mensagemDeErro).toContain(erroEsperado)

  if (logsEsperados.length > 0) {
    expect(logs).toEqual(logsEsperados)
  }
});
