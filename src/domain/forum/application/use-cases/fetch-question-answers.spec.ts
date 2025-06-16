import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository 
let sut: FetchQuestionsAnswersUseCase 

describe('Fetch questions answers', ()=>{

  beforeEach(()=> {

    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)

  })

  test('It should be able to fetch  answers', async () => {
   
    
    await inMemoryAnswerRepository.create(makeAnswer(
     { questionId: new UniqueEntityID('question-1')}
    ))
    await inMemoryAnswerRepository.create(makeAnswer(
     { questionId: new UniqueEntityID('question-1')}
    ))
    await inMemoryAnswerRepository.create(makeAnswer(
     { questionId: new UniqueEntityID('question-1')}
    ))

    

    const { answers } = await sut.execute({
      page: 1,
      questionId:'question-1'
    })

    expect(answers).toHaveLength(3)

  })

  test('It should be able to fetch paginated questions answers', async () => {
    for(let i = 1; i <= 22; i++ ){
    
    await inMemoryAnswerRepository.create(makeAnswer(
      {
        questionId: new UniqueEntityID('question-1')
      }
    ))
   
    }

    const { answers } = await sut.execute({
      questionId:'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)

  })



})

