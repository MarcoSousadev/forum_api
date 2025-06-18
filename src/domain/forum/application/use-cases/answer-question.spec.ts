import { AnswerQuestionUseCase } from './answer-question'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'


let inMemoryAnswerRepository:InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('create Answer', ()=>{

  beforeEach(()=> {

    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

  })

  test('it should be able to create an answer', async () => {
  

  const result = await sut.execute({
    instructorId: '1',
    questionId: '1',
    content: 'conteudo da resposta'
  })

  expect(result.isRight()).toBe(true)
  expect(inMemoryAnswerRepository.items[0].id).toEqual(result.value?.answer)
})

})

