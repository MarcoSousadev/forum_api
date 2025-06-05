import { QuestionRepository } from 'src/domain/repositories/questions-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { Question } from '../../entrerprise/entities/question'
import { Slug } from '../../entrerprise/entities/value-objects/slug'


interface GetQuestionBySlugUseCaseRequest {
 slug: string
}

interface GetQuestionBySlugCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug
 
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugCaseResponse> {
      const question = await this.questionRepository.findBySlug(slug)

      
      if(!question){
        throw new Error('Question not found.')
      }

      return {
        question
      }

  }
}
