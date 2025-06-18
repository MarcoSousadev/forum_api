import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Either, right } from 'src/core/either'
import { QuestionAttachment } from '../../entrerprise/entities/questionAttachment'
import { Question } from '../../entrerprise/entities/question'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId).toValue(),
        questionId: question.id.toString()
      })
    })

    question.attachments = questionAttachments

    await this.questionRepository.create(question)

    return right({
      question
    })
  }
}
