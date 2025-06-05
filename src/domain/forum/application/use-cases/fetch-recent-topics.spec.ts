
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-questions'
import { FetchRecentQuestionsUseCase } from './fetch-recent-topics'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase 

describe('Fetch recent questions', ()=>{

  beforeEach(()=> {

    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)

  })

  test('It should be able to fetch recent  questions', async () => {
   
    
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022,0,20)}))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022,0,18)}))
    await inMemoryQuestionRepository.create(makeQuestion({ createdAt: new Date(2022,0,23)}))

    

    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2022,0,23)
      }),
      expect.objectContaining({
        createdAt: new Date(2022,0,20)
      }),
      expect.objectContaining({
        createdAt: new Date(2022,0,18)
      })
    ])

  })

  test('It should be able to fetch recent  questions', async () => {
    for(let i = 1; i <= 22; i++ ){
    
    await inMemoryQuestionRepository.create(makeQuestion())
   
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)

  })



})

