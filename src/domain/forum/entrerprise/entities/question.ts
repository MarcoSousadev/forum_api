import { randomUUID } from 'node:crypto'
import { Slug } from './value-objects/slug'
import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import dayjs from 'dayjs'

export interface QuestionProps {
  authorId: UniqueEntityID
  bestAswerId?: UniqueEntityID
  title: string
  slug: Slug
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
  get bestAswerId() {
    return this.props.bestAswerId
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get slug() {
    return this.props.slug
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set bestAswerId(bestAswerId: UniqueEntityID | undefined) {
    this.props.bestAswerId = bestAswerId
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return question
  }
}
