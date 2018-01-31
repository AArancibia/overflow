import {QuestionDetailComponent} from "./question-detail.component";
import {Routes} from "@angular/router";
import {QuestionFormComponent} from "./question-form.component";
import {QuestionScreenComponent} from "./question-screen.component";

export const QUESTION_ROUTES: Routes = [
    { path: '', component: QuestionScreenComponent },
  { path: 'new', component: QuestionFormComponent},
    { path: ':id', component: QuestionDetailComponent}
];
