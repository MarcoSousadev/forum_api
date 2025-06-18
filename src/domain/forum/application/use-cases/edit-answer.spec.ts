
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('edit answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  // test('It should be able to edit a answer', async () => {
  //   const newAnswer = makeAnswer({

  //     authorId: new UniqueEntityID('author-1')
  //   },

  //   new UniqueEntityID('answer-1'))

  //   await inMemoryAnswerRepository.create(newAnswer)

  //   await sut.execute({
  //   answerId: newAnswer.id.toValue(),
  //   authorId:'author-1',
  //   content: 'Conteudo teste',

  // })

  // console.log(inMemoryAnswerRepository.items[0])

  // expect(inMemoryAnswerRepository.items[0]).toMatchObject({
  //    content: 'Conteudo teste',
  // })

  test('It should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('answer-1')
    )

    await inMemoryAnswerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      content: 'Conteudo teste',
      answerId: newAnswer.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
// })
