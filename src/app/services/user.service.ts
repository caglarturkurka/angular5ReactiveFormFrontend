import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/User";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient){}

  listAll(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/user");
  }

  save(user: User): Observable<User>{
    return this.httpClient.post<User>("http://localhost:8080/api/user",user);
  }
}
