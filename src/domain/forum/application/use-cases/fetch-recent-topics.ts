import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'


interface FetchRecentQuestionsUseCaseRequest {
 page: number
}

interface FetchRecentQuestionsCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page
 
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsCaseResponse> {
      const questions = await this.questionRepository.findManyRecent({ page })

      

      return {
        questions
      }

  }
}
