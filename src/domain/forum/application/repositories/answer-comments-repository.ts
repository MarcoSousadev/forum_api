
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { AnswerComment } from '../../entrerprise/entities/answer-comment'

export interface AnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
  
 }
