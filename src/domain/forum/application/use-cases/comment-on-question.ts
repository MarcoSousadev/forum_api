import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../entrerprise/entities/answer'
import { Question } from '../../entrerprise/entities/question'
import { QuestionComment } from '../../entrerprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'


interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  constructor(private questionRepository: QuestionRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    content
 
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

    const question = this.questionRepository.findById(questionId)

    if(!question){
      throw new Error('Question not found')
    }


     const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId).toString(),
      questionId: new UniqueEntityID(questionId),
      content,
     })

     await this.questionCommentsRepository.create(questionComment)

      return {
        questionComment
      }

  }
}
