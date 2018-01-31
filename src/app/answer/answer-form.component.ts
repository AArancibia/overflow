import {Component, Input} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AnswerModel} from "../model/answer.model";
import {QuestionModel} from "../model/question.model";
import {User} from "../auth/user.model";
import {QuestionService} from "../question/question.service";
import SweetScroll from 'sweet-scroll';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styles: [`
          form {
            margin-top: 20px;
          }
  `],
  providers: [QuestionService]
})

export  class AnswerFormComponent {
  @Input()
  question: QuestionModel;

  sweetScroll: SweetScroll;

  constructor(private questionService: QuestionService, private authService: AuthService, private router: Router) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    const answer = new AnswerModel(
      form.value.description,
      this.question
    );
    this.questionService.addAnswer(answer)
      .subscribe(
        a => {
          this.question.answers.unshift(a);
            this.sweetScroll.to('#title');
        },
        this.authService.handledError
      );
    form.reset();
  }
}
