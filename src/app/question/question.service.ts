import {Injectable} from "@angular/core";
import {QuestionModel} from "../model/question.model";
import {Http, Headers, Response} from "@angular/http";
import {environment} from "../../environments/environment";
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {AnswerModel} from "../model/answer.model";

@Injectable()
export class QuestionService {

  private questionsUrl: string;

  constructor(private http: Http) {
    this.questionsUrl = urljoin(environment.apiUrl + 'questions');
  }

  getQuestions(sort): Promise<void | QuestionModel[]> {
    console.log(sort);
    return this.http.get(`${this.questionsUrl}?sort=${sort}`)
      .toPromise()
      .then(response => response.json() as QuestionModel[])
      .catch(this.handleError);
  }

  getQuestion(id): Promise<void | QuestionModel> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as QuestionModel)
      .catch(this.handleError);
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  addQuestion(question: QuestionModel) {
    const body = JSON.stringify(question);
    const headers = new Headers({'Content-Type': 'application/json'});

    const token  =  this.getToken();
    return this.http.post(this.questionsUrl + token, body, {headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  addAnswer(answer: AnswerModel) {
    const a = {
      description: answer.description,
      question: {
        _id: answer.question._id
      }
    };
    const body = JSON.stringify(a);
    const headers = new Headers({'Content-Type': 'application/json'});
    const url = urljoin(this.questionsUrl, answer.question._id, 'answers');
    const token = this.getToken();

    return this.http.post(url + token, body, {headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  handleError(error: any) {
    const errorMesg = error.message ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
    console.log(errorMesg);
  }
}
