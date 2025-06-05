import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'
import { AnswerRepository } from 'src/domain/forum/application/repositories/answer-repository'
import { Answer } from '../../entrerprise/entities/answer'


interface FetchQuestionsAnswersUseCaseRequest {
 page: number
 questionId: string
}

interface FetchQuestionsAnswersCaseResponse {
  answers: Answer[]
}

export class FetchQuestionsAnswersUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    page,
    questionId
 
  }: FetchQuestionsAnswersUseCaseRequest): Promise<FetchQuestionsAnswersCaseResponse> {
      const answers = await this.answerRepository.findManyByQuestionId(questionId ,
         { page })

      

      return {
        answers
      }

  }
}
