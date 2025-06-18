import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository"
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments"
import { makeQuestionComments } from "test/factories/make-question-comments"
import { UniqueEntityID } from "src/core/entities/unique-entity-id"


let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentRepository 
let sut: FetchQuestionCommentsUseCase 

describe('Fetch questions questioncommentss', ()=>{

  beforeEach(()=> {

    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)

  })

  test('It should be able to fetch  questioncommentss', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({ questionId: new UniqueEntityID('question-1') })
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({ questionId: new UniqueEntityID('question-1') })
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComments({ questionId: new UniqueEntityID('question-1') })
    )

    const result = await sut.execute({
      page: 1,
      questionId: 'question-1'
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  test('It should be able to fetch paginated questions questioncommentss', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComments({ questionId: new UniqueEntityID('question-1') })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })



})

