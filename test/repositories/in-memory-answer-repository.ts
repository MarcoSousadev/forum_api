import { Answer } from "src/domain/forum/entrerprise/entities/answer";
import { AnswerRepository } from "src/domain/repositories/answer-repository";

export class InMemoryAnswerRepository implements AnswerRepository{
  public items: Answer[] = []

  async findById(id: string) {

    const answer = this.items.find(item => item.id.toString() === id)

    if(!answer){
      return null
    }
    return answer
    
  }
  

   async delete(answer: Answer){
      const itemIndex = this.items.findIndex((item) => item.id === answer.id)
  
      this.items.splice(itemIndex, 1)
    }

  async create(answer: Answer){
    this.items.push(answer)
  }
   async save(answer: Answer)  {
       const itemIndex = this.items.findIndex((item) => item.id === answer.id)
  
       this.items[itemIndex] = answer
    }
  

}