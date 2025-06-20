import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Answer } from '../../entrerprise/entities/answer'

export interface AnswerRepository {
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams
  ): Promise<Answer[]>
}
