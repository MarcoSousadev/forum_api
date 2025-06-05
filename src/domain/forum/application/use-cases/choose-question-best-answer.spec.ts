
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { ChooseBestAswerUseCase } from './choose-question-best-answer'
import { makeQuestion } from 'test/factories/make-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChooseBestAswerUseCase

describe('Choose question best answer', ()=>{

  beforeEach(()=> {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository()

    sut = new ChooseBestAswerUseCase(
          inMemoryAnswerRepository, 
          inMemoryQuestionRepository)

  })

  test('It should be able to choose best answer', async () => {

    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })


    
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
    answerId: answer.id.toString(),
    authorId: question.authorId.toString()
  })

    expect(inMemoryQuestionRepository.items[0].bestAswerId).toEqual(answer.id)
  })

   test('It should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new  UniqueEntityID('author-1')
     })

    const answer = makeAnswer({
      questionId: question.id
    })


    
    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)
  
    expect(()=> { 
    return sut.execute({
    answerId: answer.id.toString(),
    authorId:'author-2'
  })
    }).rejects.toBeInstanceOf(Error)

  })

})

