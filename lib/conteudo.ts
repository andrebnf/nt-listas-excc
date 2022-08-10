import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

let __conteudo: Conteudo | null = null

const caminhoBaseConteudo = 
  path.join(
    process.cwd(), 
    process.env.NODE_ENV === 'test' ? 
      '__tests__/artefatos/conteudo_teste' : '_conteudo'
  )
  
interface MetadadosArquivo {
  titulo: string,
  caminhoArquivo: string,
  slug: string,
  tipo: 'aula' | 'ex'
}

export interface DadosArquivo extends MetadadosArquivo {
  conteudo: string,
  breadcrumb: string,
  codigoInicial?: string
}

interface Aula {
  id: string,
  arquivos: MetadadosArquivo[]
}


interface Modulo {
  id: string,
  aulas: Aula[]
}

interface Turma {
  id: string,
  modulos: Modulo[]
}

export type Conteudo = Turma[]

export const getDadosDoArquivo = (
  caminhoConteudo: string, 
  options?: { dadosCompletos: boolean }
): MetadadosArquivo | DadosArquivo => {
  const caminhoCompleto = path.join(caminhoBaseConteudo, caminhoConteudo)
  const conteudoArquivo = fs.readFileSync(caminhoCompleto, 'utf8')

  const nomeArquivoSemExt = path.parse(caminhoConteudo).name
  const arquivoMatchGroup = caminhoConteudo.match(/.*turma(\d).*modulo(\d).*aula(\d)\/(aula|ex).*/)

  if (arquivoMatchGroup === null) {
    throw new Error(`Nome de arquivo com formato errado: ${nomeArquivoSemExt}`)
  }

  const [_, turmaId, moduloId, aulaId, tipo] = arquivoMatchGroup as [
    any, string, string, string, MetadadosArquivo['tipo']
  ]

  const slug = `${turmaId}_${moduloId}_${aulaId}-${nomeArquivoSemExt}`

  if (options && options.dadosCompletos) {
    let { 
      data: { titulo, breadcrumb, codigoInicial }, 
      content 
    } = matter(conteudoArquivo)

    return { 
      titulo, 
      caminhoArquivo: caminhoConteudo, 
      slug, 
      tipo, 
      conteudo: content, 
      breadcrumb,
      codigoInicial 
    } as DadosArquivo
  } else {
    let { data: { titulo } } = matter(conteudoArquivo)
    return { titulo, caminhoArquivo: caminhoConteudo, slug, tipo } as MetadadosArquivo
  }
}

export const getConteudo = (): Turma[] => {
  if (__conteudo !== null) return __conteudo

  let turmas: Turma[] = []
  const turmasDir: string[] = fs.readdirSync(caminhoBaseConteudo)
  
  for (let turmaDir of turmasDir) {
    let turma: Turma = {
      id: turmaDir.replace('turma', ''),
      modulos: []
    }
    
    let modulosDir = fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir))
    for (let moduloDir of modulosDir) {
      let modulo: Modulo = {
        id: moduloDir.replace('modulo', ''),
        aulas: []
      }

      let aulasDir = fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir, moduloDir))
      for (let aulaDir of aulasDir) {
        let aula: Aula = {
          id: aulaDir.replace('aula', ''),
          arquivos: []
        }

        let caminhoAula = path.join(caminhoBaseConteudo, turmaDir, moduloDir, aulaDir)
        let arquivos = fs.readdirSync(caminhoAula)
        for (let arquivo of arquivos) {
          let caminhoArquivoMd = path.join(turmaDir, moduloDir, aulaDir, arquivo)
          const metadados = getDadosDoArquivo(caminhoArquivoMd)
          aula.arquivos.push(metadados)
        }

        modulo.aulas.push(aula)
      }

      turma.modulos.push(modulo)
    }

    turmas.push(turma)
  }
  
  __conteudo = turmas
  return turmas
}

export const getSlugsIndividuais = (): string[] => {
  let slugs = []

  for (let turmaDir of fs.readdirSync(caminhoBaseConteudo)) {
    for (let moduloDir of fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir))) {
      let aulasDir = fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir, moduloDir))
      for (let aulaDir of aulasDir) {

        let caminhoAula = path.join(caminhoBaseConteudo, turmaDir, moduloDir, aulaDir)
        let arquivos = fs.readdirSync(caminhoAula)
        for (let arquivo of arquivos) {
          let slug = turmaDir.replace('turma', '') + '_' +
            moduloDir.replace('modulo', '') + '_' +
            aulaDir.replace('aula', '') + '-' + path.parse(arquivo).name

          slugs.push(slug)
        }
      }
    }
  }

  return slugs
}

export const getConteudoBySlug = (slug: string): DadosArquivo => {
  const slugMatchGroup = slug.match(/(\d)_(\d)_(\d)-(.*)/)

  if (slugMatchGroup === null) {
    throw new Error(`Formato do slug não reconhecido: ${slug}`)
  }

  const [_, turmaId, moduloId, aulaId, nomeBaseDoArquivo] = slugMatchGroup as [any, string, string, string, string]

  const caminhoDoArquivo = path.join(
    `turma${turmaId}`,
    `modulo${moduloId}`,
    `aula${aulaId}`,
    `${nomeBaseDoArquivo}.md`
  )
  return getDadosDoArquivo(caminhoDoArquivo, { dadosCompletos: true }) as DadosArquivo
}
