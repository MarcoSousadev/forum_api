import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { makeQuestion } from "test/factories/make-questions"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { makeQuestionComments } from "test/factories/make-question-comments"
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  test('It should be able to delete a question comment  ', async () => {
    const questionComment = makeQuestionComments()

    await inMemoryQuestionCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString()
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  test('It should not be able to delete a another user question comment  ', async () => {
    const questionComment = makeQuestionComments({
      authorId: new UniqueEntityID('author-1').toString()
    })

    await inMemoryQuestionCommentRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(false)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

  
  
