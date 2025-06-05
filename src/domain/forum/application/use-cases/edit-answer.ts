import { AnswerRepository } from 'src/domain/forum/application/repositories/answer-repository'
import { Answer } from '../../entrerprise/entities/answer'

interface EditAnswerUseCaseRequest {
  authorId: string
  content: string
  answerId: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('answer not found')
    }
    if (authorId != answer.authorId.toString()) {
      throw new Error('not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer
    }
  }
}
