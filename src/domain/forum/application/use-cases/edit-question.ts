import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'
import { Question } from '../../entrerprise/entities/question'

interface EditQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  questionId: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('question not found')
    }
    if (authorId != question.authorId.toString()) {
      throw new Error('not allowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question
    }
  }
}
