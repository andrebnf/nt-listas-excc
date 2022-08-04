import { 
  getDadosDoArquivo, 
  getConteudo, 
  getConteudoBySlug, 
  DadosArquivo, 
  getSlugsIndividuais 
} from "../lib/conteudo"

it('busca metadados de um arquivo Markdown', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/aula4_3.md'
  const metadadosAula = getDadosDoArquivo(caminhoConteudo)

  expect(metadadosAula.titulo).toBe('Aula: Utilidades')
  expect(metadadosAula.slug).toBe('1_4_3-aula4_3')
  expect(metadadosAula.tipo).toBe('aula')
  expect(metadadosAula.caminhoArquivo).toBe(caminhoConteudo)
  expect(metadadosAula).not.toHaveProperty(['codigoInicial'])
  expect(metadadosAula).not.toHaveProperty(['breadcrumb'])
  expect(metadadosAula).not.toHaveProperty(['conteudo'])
})

it('busca dados de um arquivo Markdown', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/ex4_3_1.md'
  const dadosAula = getDadosDoArquivo(caminhoConteudo, { dadosCompletos: true }) as DadosArquivo

  expect(dadosAula.titulo).toBe('Exercício 1')
  expect(dadosAula.slug).toBe('1_4_3-ex4_3_1')
  expect(dadosAula.tipo).toBe('ex')
  expect(dadosAula.caminhoArquivo).toBe(caminhoConteudo)
  expect(dadosAula.conteudo.length).toBeGreaterThanOrEqual(300)
  expect(dadosAula.breadcrumb.startsWith('Módulo')).toBe(true)
  expect(dadosAula.codigoInicial?.startsWith('//')).toBe(true)
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

it('constroi path baseado em um slug', () => {
  const slug1 = '1_4_3-aula4_3'
  const conteudoCompleto1 = getConteudoBySlug(slug1)
  expect(conteudoCompleto1).toHaveProperty(['conteudo'])
  expect(conteudoCompleto1).toHaveProperty(['breadcrumb'])
  expect(conteudoCompleto1).toHaveProperty(['codigoInicial'])
})

it('busca todos os slugs insividalmente', () => {
  expect(getSlugsIndividuais()).toEqual(expect.arrayContaining(['1_4_3-aula4_3', '1_4_3-ex4_3_1']))
})