import {QuestionModel} from "./question.model";
import {User} from "../auth/user.model";

export class AnswerModel {
  constructor(
    public description: string,
    public question: QuestionModel,
    public createdAt?: Date,
    public user?: User
  ) {}
}
