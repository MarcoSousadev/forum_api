
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('create question', ()=>{

  beforeEach(()=> {

    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

  })

  test('create an question', async () => {
  

  const {question} = await sut.execute({
    authorId: '1',
    title: 'Nova resposta',
    content: 'conteudo da pergunta',
  })

  expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

})

})

