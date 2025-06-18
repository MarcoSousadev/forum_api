import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { FetchAnswerCommentUseCase } from "./fetch-answer-comments"

import { UniqueEntityID } from "src/core/entities/unique-entity-id"
import { makeAnswerComment } from "test/factories/make-answer-comment"



let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentRepository 
let sut: FetchAnswerCommentUseCase 

describe('Fetch answers answercommentss', ()=>{

  beforeEach(()=> {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentsRepository)

  })

  test('It should be able to fetch  answercommentss', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    const result = await sut.execute({
      page: 1,
      answerId: 'answer-1'
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  test('It should be able to fetch paginated answers answercommentss', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1')
        })
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })



})

