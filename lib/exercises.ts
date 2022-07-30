import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const exercisesDirectory = join(process.cwd(), '_exercises')

const getRealSlug = (slugWithFileFormat: string): string => {
  return slugWithFileFormat.replace(/\.md$/, '')
}

const readFileContents = (slug: string) => {
  const fullPath = join(exercisesDirectory, `${slug}.md`)
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
  startingEditorCode?: string
}

export function getExercisesSlugs(): string[] {
  return fs.readdirSync(exercisesDirectory).map(getRealSlug)
}

export function getExerciseBySlug(slug: string): ContentDetails {
  const { data, content } = readFileContents(slug)
  const { breadcrumb, title, startingEditorCode } = data
  return { title, breadcrumb, slug, content, startingEditorCode }
}

export function getExercisesSummary(): ContentSummary[] {
  const slugs = getExercisesSlugs()
  const exercises = slugs
    .map((slug) => getExerciseMetadataBySlug(slug))
  return exercises
}
