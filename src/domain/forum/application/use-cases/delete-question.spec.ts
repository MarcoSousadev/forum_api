
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { makeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../entrerprise/entities/value-objects/slug'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('delete question', ()=>{

  beforeEach(()=> {

    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)

  })

  test('It should be able to delete a question', async () => {
    const newQuestion = makeQuestion({

      authorId: new UniqueEntityID('author-1')
    }, 
    
    new UniqueEntityID('question-1'))


   await inMemoryQuestionRepository.create(newQuestion) 
  

    await sut.execute({
    questionId: 'question-1',
    authorId:'author-1'
  })

    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

   test('It should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))


   await inMemoryQuestionRepository.create(newQuestion) 
  
    expect(()=> { 
    return sut.execute({
    questionId: 'question-1',
    authorId:'author-2'
  })
    }).rejects.toBeInstanceOf(Error)


  })

})

