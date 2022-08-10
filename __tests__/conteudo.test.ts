import { 
  getDadosDoArquivo, 
  getConteudo, 
  getConteudoBySlug, 
  DadosArquivo, 
  getSlugsIndividuais 
} from "../lib/conteudo"

it('busca metadados de um arquivo Markdown', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/aula3.md'
  const metadadosAula = getDadosDoArquivo(caminhoConteudo)

  expect(metadadosAula.titulo).toBe('Aula: Utilidades')
  expect(metadadosAula.slug).toBe('1_4_3-aula3')
  expect(metadadosAula.tipo).toBe('aula')
  expect(metadadosAula.caminhoArquivo).toBe(caminhoConteudo)
  expect(metadadosAula).not.toHaveProperty(['codigoInicial'])
  expect(metadadosAula).not.toHaveProperty(['breadcrumb'])
  expect(metadadosAula).not.toHaveProperty(['conteudo'])
})

it('busca dados de um arquivo Markdown', () => {
  const caminhoConteudo = 'turma1/modulo4/aula3/ex2.md'
  const dadosAula = getDadosDoArquivo(caminhoConteudo, { dadosCompletos: true }) as DadosArquivo

  expect(dadosAula.titulo).toBe('Exercício 2')
  expect(dadosAula.slug).toBe('1_4_3-ex2')
  expect(dadosAula.tipo).toBe('ex')
  expect(dadosAula.caminhoArquivo).toBe(caminhoConteudo)
  expect(dadosAula.conteudo).toContain('let listaDeIngredientes =')
  expect(dadosAula.breadcrumb.startsWith('Módulo')).toBe(true)
  expect(dadosAula.codigoInicial?.startsWith('//')).toBe(true)
})


it('busca estrutura de conteudo no sistema de arquivos', () => {
  const turmas = getConteudo();
  
  const testaAula = (aula: any, id: string, numeroDeArquivos: number) => {
    expect(aula.id).toBe(id)
    expect(aula.arquivos.length).toEqual(numeroDeArquivos)
  }

  testaAula(turmas[0].modulos[0].aulas[0], '3', 3)
  testaAula(turmas[0].modulos[0].aulas[1], '4', 2)
  testaAula(turmas[1].modulos[0].aulas[0], '1', 2)
})

it('constroi path baseado em um slug', () => {
  const slug1 = '2_1_1-aula1'
  const dadosDoConteudo = getConteudoBySlug(slug1)
  expect(dadosDoConteudo).toHaveProperty(['conteudo'])
  expect(dadosDoConteudo).toHaveProperty(['breadcrumb'])
  expect(dadosDoConteudo).toHaveProperty(['codigoInicial'])
  expect(dadosDoConteudo.conteudo).toContain("Texto aula teste 1")
  expect(dadosDoConteudo.codigoInicial).toContain("let ola")
  expect(dadosDoConteudo.breadcrumb).toEqual("Teste")

  
})

it('busca todos os slugs insividalmente', () => {
  expect(getSlugsIndividuais()).toEqual([
    "1_4_3-aula3", 
    "1_4_3-ex1", 
    "1_4_3-ex2", 
    "1_4_4-aula4_parte1_fundamentos", 
    "1_4_4-ex1_nome_grande_do_exercicio", 
    "2_1_1-aula1", "2_1_1-ex1"
  ])
})