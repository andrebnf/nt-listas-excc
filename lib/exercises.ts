import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const exercisesDirectory = path.join(process.cwd(), '_ignored_exercises')

const getRealSlug = (slugWithFileFormat: string): string => {
  return slugWithFileFormat.replace(/\.md$/, '')
}

const readFileContents = (slug: string) => {
  const fullPath = path.join(exercisesDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return matter(fileContents)
}

function getExerciseMetadataBySlug(slug: string): ContentSummary {
  const { data: { title } } = readFileContents(slug)

  const slugMatchGroup = slug.match(/(aula|ex)(\d)_(\d)/)

  if (slugMatchGroup === null) {
    throw new Error(`Nome de arquivo com formato errado: ${slug}`)
  }

  const [_, type, moduleId, classId] = slugMatchGroup as [any, 'aula' | 'ex', string, string]

  return { 
    slug, 
    title,
    moduleId,
    classId,
    type 
  }
}

// TODO refatorar acima

const caminhoBaseConteudo = path.join(process.cwd(), '_conteudo')

interface MetadadosArquivo {
  titulo: string,
  caminhoArquivo: string,
  slug: string,
  tipo: 'aula' | 'ex'
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

export const getMetadadosDoArquivo = (caminhoConteudo: string): MetadadosArquivo => {
  const caminhoCompleto = path.join(caminhoBaseConteudo, caminhoConteudo)
  const conteudoArquivo = fs.readFileSync(caminhoCompleto, 'utf8')

  const { data: { titulo } } = matter(conteudoArquivo)
  const filename = path.basename(caminhoConteudo)
  const slug = path.parse(caminhoConteudo).name

  const slugMatchGroup = filename.match(/^(aula|ex).*/)

  if (slugMatchGroup === null) {
    throw new Error(`Nome de arquivo com formato errado: ${slug}`)
  }

  const [_, tipo] = slugMatchGroup as [any, MetadadosArquivo['tipo']]

  return { titulo, caminhoArquivo: caminhoConteudo, slug, tipo }
}

export const getConteudo = (): Turma[] => {
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
          const metadados = getMetadadosDoArquivo(caminhoArquivoMd)
          aula.arquivos.push(metadados)
        }

        modulo.aulas.push(aula)
      }

      turma.modulos.push(modulo)
    }

    turmas.push(turma)
  }
  
  return turmas
}

// todo refatorar abaixo

export interface ContentSummary {
  title: string,
  slug: string,
  moduleId: string,
  classId: string,
  type: 'aula' | 'ex' // também são os prefixos dos arquivos
}

export interface ContentDetails {
  title: string,
  breadcrumb: string,
  slug: string,
  content: string,
  codigoInicial?: string
}

export function getExercisesSlugs(): string[] {
  return fs.readdirSync(exercisesDirectory).map(getRealSlug)
}

export function getExerciseBySlug(slug: string): ContentDetails {
  const { data, content } = readFileContents(slug)
  const { breadcrumb, title, codigoInicial } = data
  return { title, breadcrumb, slug, content, codigoInicial }
}

export function getExercisesSummary(): ContentSummary[] {
  const slugs = getExercisesSlugs()
  const exercises = slugs
    .map((slug) => getExerciseMetadataBySlug(slug))
  return exercises
}
