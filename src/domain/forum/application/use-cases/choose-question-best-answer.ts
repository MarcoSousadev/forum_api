import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'
import { Either, left, Left, right } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface ChooseBestAswerUseCaseRequest {
  authorId: string
  answerId: string
}

type ChooseBestAswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseBestAswerUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository
  ) {}

  async execute({
    answerId,
    authorId
  }: ChooseBestAswerUseCaseRequest): Promise<ChooseBestAswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }
    question.bestAswerId = answer.id

    await this.questionRepository.save(question)

    return right({
      question
    })
  }
}
