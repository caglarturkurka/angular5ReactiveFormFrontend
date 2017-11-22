import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {User} from "../interfaces/User";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient){}

  listAll(): Observable<User[]>{
    return this.httpClient.get<User[]>("http://localhost:8080/api/user");
  }

  save(user: User): Observable<HttpResponse<User>>{
    return this.httpClient.post<User>("http://localhost:8080/api/user",user,{
      observe: "response",
      responseType: "json"
    });
  }

  update(user: User): Observable<User>{
    return this.httpClient.put<User>("http://localhost:8080/api/user",user);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete("http://localhost:8080/api/user/"+id,{
      observe: "response",
      responseType:"json"
    });
  }
}
