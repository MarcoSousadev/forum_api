
import { PaginationParams } from 'src/core/repositories/pagination-params'
import { QuestionComment } from '../../entrerprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
  findById(id: string):Promise< QuestionComment| null>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
 }
