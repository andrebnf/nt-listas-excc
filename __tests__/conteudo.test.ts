import { getMetadadosConteudo } from "../lib/exercises"

it('getMetadadosConteudo', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/aula4_3.md'
  const metadadoAula = getMetadadosConteudo(caminhoConteudo)

  expect(metadadoAula.titulo).toBe('Aula: Utilidades')
  expect(metadadoAula.slug).toBe('aula4_3')
  expect(metadadoAula.tipo).toBe('aula')
  expect(metadadoAula.caminhoConteudo).toBe(caminhoConteudo)
})