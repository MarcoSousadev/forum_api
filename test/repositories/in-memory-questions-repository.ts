import { PaginationParams } from 'src/core/repositories/pagination-params'
import { Question } from 'src/domain/forum/entrerprise/entities/question'
import { QuestionRepository } from 'src/domain/forum/application/repositories/questions-repository'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if (!question) {
      return null
    }
    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async findBySlug(slug: string) {
    const question = this.items.find(item => item.slug.value === slug)

    if (!question) {
      return null
    }
    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items[itemIndex] = question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex(item => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
