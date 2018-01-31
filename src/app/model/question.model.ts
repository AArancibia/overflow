import {AnswerModel} from "./answer.model";
import {User} from "../auth/user.model";

export  class QuestionModel {
  _id?: string;
  title: string;
  description: string;
  createdAt?: Date;
  icon?: string;
  answers: AnswerModel[];
  user?: User[];
  constructor(
    title: string,
    description: string,
    createdAt?: Date,
    icon?: string
  ) {
    this._id = '1';
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.icon = icon;
    this.answers = [];
    this.user = [];
  }
}
