import {Component, Input, OnInit} from "@angular/core";
import {QuestionModel} from "../model/question.model";
import {QuestionService} from "./question.service";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styles: [ `
        i {
          font-size: 48px;
        }
    
        i.help {
          width: 48px !important;
          height: 48px !important;
          padding: 0 !important;
          font-size: 48px !important;
        }
  `],
  providers: [QuestionService]
})

export  class QuestionListComponent implements OnInit{

  @Input() sort = '-createdAt';
  questions: QuestionModel[];
  loading = true;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    console.log(this.sort);
    this.questionService.getQuestions(this.sort)
      .then((questions: QuestionModel[]) => {
          this.questions = questions;
          this.loading = false;
      });
  }
}
