import { faker } from '@faker-js/faker'

import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Question, QuestionProps } from "src/domain/forum/entrerprise/entities/question";
import { Slug } from "src/domain/forum/entrerprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<QuestionProps> = {}, 
  id?: UniqueEntityID,
) {
  const question = Question.create({
        authorId:new UniqueEntityID(),
        title: faker.lorem.sentence(),
        content: faker.lorem.text(),
        slug: Slug.create('example-question'),
        ...override

      },
    id
  )

    return question
}

