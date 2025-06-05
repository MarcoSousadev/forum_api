import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { Question } from '../../entrerprise/entities/question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionRepository.create(question)

    return {
      question
    }
  }
}
