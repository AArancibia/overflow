import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuestionModel} from "../model/question.model";
import {QuestionService} from "./question.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
  providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit, OnDestroy{
  question?: QuestionModel;
  loading = true;
  sub: any;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.questionService.getQuestion(params.id)
        .then((question: QuestionModel) => {
            this.question = question;
            console.log(this.question.answers);
            this.loading = false;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
