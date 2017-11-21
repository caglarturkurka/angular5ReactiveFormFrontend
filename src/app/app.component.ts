import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {User} from "./interfaces/User";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  users: User[];
  form: FormGroup;
  isDataLoading: boolean;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      "name": [''],
      "surname": [''],
      "birthDate": ['']
    })
    this.isDataLoading = false;
    this.listAll();
  }

  listAll(){
    this.isDataLoading = true;
    this.userService.listAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.isDataLoading = false;
      }
    )
  }

  saveUser(){
    this.userService.save(this.form.value).subscribe(
      data => {
        this.form.reset();
      },
      error=> {
        console.log(error);
      },
      () => {
        this.listAll();
      }
    )
  }
}
