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
  

  const { answer } = await sut.execute({
    instructorId: '1',
    questionId: '1',
    content: 'conteudo da resposta',
  })

  expect(answer.id).toBeTruthy()
  expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
})

})

