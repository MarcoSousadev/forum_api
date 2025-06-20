import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";

interface AnswerAttachmentProps {
  answerId: string
  attachmentId: string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>{
  get answerId(){
    return this.props.answerId
  }
  get attachmentId(){
    return this.props.attachmentId
  }

    static create(props: AnswerAttachmentProps, id?: UniqueEntityID){
      const attachment = new AnswerAttachment(props, id)
  
      return attachment
    }
}