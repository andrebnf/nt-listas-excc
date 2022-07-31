import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const exercisesDirectory = path.join(process.cwd(), '_ignored_exercises')
const caminhoBaseConteudo = path.join(process.cwd(), '_conteudo')

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

// export function groupSummary(contentList: ContentSummary[]): ModulesGroup {
//   const group: ModulesGroup = {}

//   for (let i = 0; i < contentList.length; i++){
//     const content = contentList[i];
//     const classContent = group[content.moduleId].classContentList || []
//     const exerciseContent = group[content.moduleId].exerciseContentList || []

//     if (content.type === 'aula') {
//       group[content.moduleId] = {
//         classId: content.classId,
//         classContentList: [...classContent, content],
//         exerciseContentList: [...exerciseContent, content]
//       }
//     }
//   }

//   console.log(JSON.stringify(group))

//   return group as ModulesGroup
// }

// interface ModulesGroup {
//   [moduleId: string]: {
//     [classId: string]: {
//       classContentList: ContentSummary[],
//       exerciseContentList: ContentSummary[]
//     }
//   }
// }


interface MetadadosConteudo {
  titulo: string,
  caminhoDoArquivo: string,
  slug: string,
  tipo: 'aula' | 'ex'
}

interface Aula {
  id: string,
  conteudo: MetadadosConteudo[]
}


interface Modulo {
  id: string,
  aulas: Aula[]
}

interface Turma {
  id: string,
  modulos: Modulo[]
}

type x = Turma[]

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

export const getMetadadosConteudo = (caminhoConteudo: string): MetadadosConteudo => {
  const caminhoCompleto = path.join(caminhoBaseConteudo, caminhoConteudo)
  const conteudoArquivo = fs.readFileSync(caminhoCompleto, 'utf8')

  const { data: { title } } = matter(conteudoArquivo)
  const filename = path.basename(caminhoConteudo)
  const slug = path.parse(caminhoConteudo).name

  const slugMatchGroup = filename.match(/^(aula|ex).*/)

  if (slugMatchGroup === null) {
    throw new Error(`Nome de arquivo com formato errado: ${slug}`)
  }

  const [_, tipo] = slugMatchGroup as [any, MetadadosConteudo['tipo']]

  return { titulo: title, caminhoDoArquivo: caminhoConteudo, slug, tipo }
}

// export function getTurmasForSidebar(): Turma[] {
//   let turmas: Turma[] = []
//   const turmasDir: string[] = fs.readdirSync(caminhoBaseConteudo);
  
//   let turmas = []
//   let turmasDir = fs.readdirSync(caminhoBaseConteudo);
//   for (let turmaDir of turmasDir) {
//     // let modulos: Modulo[] = []
//     // modulos = []
//     turma = {
//       id: turmaDir.replace('turma', ''),
//       modulos: []
//     }
    
//     modulosDir = fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir))
//     for (let moduloDir of modulosDir) {
//       modulo = {
//         id: moduloDir.replace('modulo', ''),
//         aulas: []
//       }

//       aulasDir = fs.readdirSync(path.join(caminhoBaseConteudo, turmaDir, moduloDir))
//       for (let aulaDir of aulasDir) {


//         console.log(aulaDir)
//       }
//     }
//   }
  
//   const x = fs.readdirSync(caminhoBaseConteudo)
//     .map(getRealSlug)
  
//   return []
// }

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
