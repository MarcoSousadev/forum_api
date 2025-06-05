import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"


interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string 
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentRepository: AnswerCommentsRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,

 
  }: DeleteAnswerCommentUseCaseRequest) {

    const answerComment = await this.answerCommentRepository.findById(answerCommentId)

    if(!answerComment){
      throw new Error('Answer not found')
    }

    if(answerComment.authorId.toString()!== authorId){
      throw new Error('not allowed')
    }
    
    await this.answerCommentRepository.delete(answerComment)

    return {}
  }
}
