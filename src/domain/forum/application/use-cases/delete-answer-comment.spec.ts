import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment"
import { makeAnswerComment } from "test/factories/make-answer-comment"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete answer comment', ()=>{

  beforeEach(()=> {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepository)

  })

  test('It should be able to delete a answer comment  ', async () => {

    const answerComment = makeAnswerComment()
    
    await inMemoryAnswerCommentRepository.create(answerComment)

    await sut.execute({
    answerCommentId: answerComment.id.toString(),
    authorId: answerComment.authorId.toString(),
  })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  test('It should not be able to delete a another user answer comment  ', async () => {

    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1').toString()
    })
    
    await inMemoryAnswerCommentRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2'
    })
    
    
      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NotAllowedError)
  })
    
  })

  
  
