import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const exercisesDirectory = join(process.cwd(), '_exercises')

const readFileContents = (slug: string) => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(exercisesDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return {...matter(fileContents), slug: realSlug}
}

export interface ExerciseSummary {
  title: string,
  slug: string
}

export interface ExerciseDetails {
  title: string,
  slug: string,
  content: string
}

export function getExercisesSlugs() {
  return fs.readdirSync(exercisesDirectory)
}

export function getExerciseBySlug(slugInput: string): ExerciseDetails {
  const { data, slug, content } = readFileContents(slugInput);
  return { slug: slug, title: data['title'], content }
}

export function getExerciseMetadataBySlug(slugInput: string): ExerciseSummary {
  const { data, slug } = readFileContents(slugInput);
  return { slug: slug, title: data['title'] }
}

export function getExercisesSummary(): ExerciseSummary[] {
  const slugs = getExercisesSlugs()
  const exercises = slugs
    .map((slug) => getExerciseMetadataBySlug(slug))
  return exercises
}
