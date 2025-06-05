import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Question } from '../../entrerprise/entities/question'

export interface QuestionRepository {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
