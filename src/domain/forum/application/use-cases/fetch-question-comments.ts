import { Either, right } from 'src/core/either'
import { QuestionComment } from '../../entrerprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page
      })

    return right({
      questionComments
    })
  }
}
