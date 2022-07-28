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
  const { data } = readFileContents(slug)
  return { slug, title: data['title'] }
}

export interface ContentSummary {
  title: string,
  slug: string
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
