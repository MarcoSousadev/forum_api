import { faker } from '@faker-js/faker'

import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { QuestionComment, QuestionCommentProps } from 'src/domain/forum/entrerprise/entities/question-comment';

export function makeQuestionComments(
  override: Partial<QuestionCommentProps> = {}, 
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create({
        authorId:new UniqueEntityID().toString(),
        questionId:new UniqueEntityID(),
        content: faker.lorem.text(),
        ...override

      },
    id
  )

    return questionComment
}

