import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'
import { Either, right } from 'src/core/either'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({
      questions
    })
  }
}
