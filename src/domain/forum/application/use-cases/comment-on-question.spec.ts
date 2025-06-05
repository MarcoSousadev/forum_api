import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comments-repository"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-questions-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { makeQuestion } from "test/factories/make-questions"

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Choose question best answer', ()=>{

  beforeEach(()=> {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new CommentOnQuestionUseCase( 
     inMemoryQuestionRepository, 
     inMemoryQuestionCommentRepository
    )

  })

  test('It should be able to comment on question ', async () => {

    const question = makeQuestion()
    
    await inMemoryQuestionRepository.create(question)

    await sut.execute({
    questionId: question.id.toString(),
    authorId: question.authorId.toString(),
    content:'comentário teste'
  })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual('comentário teste')
  })

})

