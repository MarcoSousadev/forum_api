
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

import { makeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../entrerprise/entities/value-objects/slug'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('get question by slug', ()=>{

  beforeEach(()=> {

    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)

  })

  test('It should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question')
    })


   await inMemoryQuestionRepository.create(newQuestion) 
  

  const result = await sut.execute({
    slug: 'example-question'
  })

  expect(result.value?.question.id).toBeTruthy()
  expect(result.value?.question.title).toEqual(newQuestion.title)
})


})

