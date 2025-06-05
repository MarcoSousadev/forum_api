import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'
import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'

interface ChooseBestAswerUseCaseRequest {
  authorId: string
  answerId: string
  
}

interface ChooseBestAswerUseCaseResponse {
  question: Question
}

export class ChooseBestAswerUseCase {
  constructor(private answerRepository: AnswerRepository,
    private questionRepository: QuestionRepository
  ) {}

  async execute({
    answerId,
    authorId
  }: ChooseBestAswerUseCaseRequest): Promise<ChooseBestAswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if(!answer){
      throw new Error('Answer not found') 
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString()
    )

    if(!question){
      throw new Error('question not found')
    }

    if(authorId !== question.authorId.toString()){
      throw new Error('not allowed')
    }
    question.bestAswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question
    }
  }
}
