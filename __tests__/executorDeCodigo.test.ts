import { 
  executaJavaScript
} from "../lib/executorDeCodigo"

it('retorna corretamente os logs do código', () => {
  let codigo = `let x = 1
  let y = 2
  console.log(x)
  console.log(y)
  console.log(\`Soma: \${x + y}\`) 
  `

  let [logs, temErro, linhaDoErro, mensagemDeErro] = executaJavaScript(codigo)
  expect(logs.length).toEqual(3)
  expect(logs).toEqual(['1', '2', 'Soma: 3'])
  
  expect(temErro).toBe(false)
  expect(linhaDoErro).toEqual(0)
  expect(mensagemDeErro).toEqual('')
})

it('retorna linha com erro de runtime', () => {
  let codigo = `console.log(w)`
  let [logs, temErro, linhaDoErro, mensagemDeErro] = executaJavaScript(codigo)
  
  expect(logs.length).toEqual(0)
  expect(temErro).toBe(true)
  expect(linhaDoErro).toEqual(1)
  expect(mensagemDeErro).toMatch(/w/)
})

// it.each([
//   [`let x = 10
//   for (let i = x; i > 0; i--) { 
//     console.log(i)
//   }                            `, 10, false, 0],
// ])