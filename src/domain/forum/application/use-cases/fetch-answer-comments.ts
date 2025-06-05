import { AnswerRepository } from 'src/domain/forum/application/repositories/answer-repository'
import { Answer } from '../../entrerprise/entities/answer'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswerComment } from '../../entrerprise/entities/answer-comment'


interface FetchAnswerCommentUseCaseRequest {
 page: number
 answerId: string
}

interface FetchAnswerCommentCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId
 
  }:FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentCaseResponse> {
      const answerComments = await this.answerCommentsRepository.findManyByAnswerId( 
        answerId, {
          page
        }
      )

      

      return {
        answerComments
      }

  }
}
