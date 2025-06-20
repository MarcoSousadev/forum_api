import { PaginationParams } from 'src/core/repositories/pagination-params'
import { AnswerCommentsRepository } from 'src/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from 'src/domain/forum/entrerprise/entities/answer-comment'



export class InMemoryAnswerCommentRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []


   async findById(id: string) {
    const answerComment = this.items.find(item => item.id.toString() === id)

    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
      const itemIndex = this.items.findIndex(item => item.id === answerComment.id)
  
      this.items.splice(itemIndex, 1)
    }

   async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
        const answerComments = this.items
          .filter(item => item.answerId.toString() === answerId)
          .slice((page - 1) * 20, page * 20)
    
        return answerComments
      }
}
