import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { makeAnswer } from "test/factories/make-answer"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', ()=>{

  beforeEach(()=> {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()

    sut = new CommentOnAnswerUseCase( 
     inMemoryAnswerRepository, 
     inMemoryAnswerCommentRepository
    )

  })

  test('It should be able to comment on answer ', async () => {

    const answer = makeAnswer()
    
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
    answerId: answer.id.toString(),
    authorId: answer.authorId.toString(),
    content:'comentário teste'
  })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual('comentário teste')
  })

})

