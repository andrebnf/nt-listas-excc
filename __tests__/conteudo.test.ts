import { getMetadadosDoArquivo, getConteudo } from "../lib/exercises"

it('busca metadados de um arquivo Markdown', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/aula4_3.md'
  const metadadoAula = getMetadadosDoArquivo(caminhoConteudo)

  expect(metadadoAula.titulo).toBe('Aula: Utilidades')
  expect(metadadoAula.slug).toBe('aula4_3')
  expect(metadadoAula.tipo).toBe('aula')
  expect(metadadoAula.caminhoArquivo).toBe(caminhoConteudo)
})

it('busca estrutura de conteudo no sistema de arquivos', () => {
  const turmas = getConteudo();
  const aula1 = turmas[0].modulos[0].aulas[0]
  const aula2 = turmas[0].modulos[0].aulas[1]

  expect(aula1.id).toBe('3')
  expect(aula1.arquivos.length).toEqual(7)

  expect(aula2.id).toBe('4')
  expect(aula2.arquivos.length).toEqual(8)
})