
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { makeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../entrerprise/entities/value-objects/slug'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Question } from '../../entrerprise/entities/question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('edit question', ()=>{

  beforeEach(()=> {

    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)

  })

  // test('It should be able to edit a question', async () => {
  //   const newQuestion = makeQuestion({

  //     authorId: new UniqueEntityID('author-1')
  //   }, 
    
  //   new UniqueEntityID('question-1'))


  //   await inMemoryQuestionRepository.create(newQuestion) 
  

  //   await sut.execute({
  //   questionId: newQuestion.id.toValue(),
  //   authorId:'author-1',
  //   title: 'pergunta teste',
  //   content: 'Conteudo teste',
    
   
  // })


  // console.log(inMemoryQuestionRepository.items[0])


  //   expect(inMemoryQuestionRepository.items[0]).toMatchObject({
  //      title: 'pergunta teste',
  //      content: 'Conteudo teste',
  //   })
   
   test('It should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    }, new UniqueEntityID('question-1'))


   await inMemoryQuestionRepository.create(newQuestion) 
  
    expect(()=> { 
    return sut.execute({
    authorId:'author-2',
    title: 'pergunta teste',
    content: 'Conteudo teste',
    questionId: newQuestion.id.toValue()
  })
    }).rejects.toBeInstanceOf(Error)


  })

})
