import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface CommentProps {
  authorId: string
  content: string
  createdAt: Date
  updatedAt?: Date 
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {

  get authorId() {
    return this.props.authorId
  }

  private touch() {
    this.props.updatedAt = new Date()
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


  set content(content: string) {
    this.props.content = content
    this.touch()
  }
}
