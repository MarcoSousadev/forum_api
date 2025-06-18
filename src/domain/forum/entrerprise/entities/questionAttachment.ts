import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

interface QuestionAttachmentProps {
  questionId: string
  attachmentId: string
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps>{
  get questionId(){
    return this.props.questionId
  }
  get attacjmentId(){
    return this.props.attachmentId
  }

    static create(props: QuestionAttachmentProps, id?: UniqueEntityID){
      const attachment = new QuestionAttachment(props, id)
  
      return attachment
    }
}