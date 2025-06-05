import { faker } from '@faker-js/faker'

import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from 'src/domain/forum/entrerprise/entities/answer-comment';

  export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {}, 
  id?: UniqueEntityID,
) {
  const answersComments = AnswerComment.create({
        authorId:new UniqueEntityID().toString(),
        answerId:new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override

      },
    id
  )

    return answersComments
}
