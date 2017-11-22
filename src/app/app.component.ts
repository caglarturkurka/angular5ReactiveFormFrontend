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
  isSaving: boolean;
  selectedUser: User;

  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit() {
    this.form = this.fb.group({
      "id":[''],
      "name": [''],
      "surname": [''],
      "birthDate": ['']
    })
    this.isDataLoading = false;
    this.isSaving=true;
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
        this.isSaving=true;
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

  update(){
    this.userService.update(this.form.value).subscribe(
      data => {
        this.isSaving=true;
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


  delete(user: User){
    this.userService.delete(user.id).subscribe(
      data => {
        this.isSaving=true;
        this.form.reset();
        this.listAll();
      },
      error => {
        console.log(error);
      },
      ()=> {

      }
    )
  }

  cancel(){
    this.isSaving=true;
    this.form.reset();
  }

  onRowSelect(event) {
    this.isSaving = false;
    let date: Date =  new Date(event.data.birthDate);
    date.setDate(date.getDate() + 1);
    this.form.patchValue({
      "id":event.data.id,
      "name":event.data.name,
      "surname":event.data.surname,
      "birthDate": date
    });

  }

  onRowUnselect(event) {
    console.log(event.data);
  }
}
