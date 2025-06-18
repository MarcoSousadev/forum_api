import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { Question } from '../../entrerprise/entities/question'
import { Slug } from '../../entrerprise/entities/value-objects/slug'
import { Either, left, right } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseRespose = Either<
  null,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseRespose> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not Found')
    }

    return right({
      question
    })
  }
}
