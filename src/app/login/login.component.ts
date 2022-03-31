import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { LoginModel } from '../model/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: LoginModel = {
    emailId: null,
    password: null
  };
  submitted = false;
  showErr = false;
  errMsg = '';

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.errMsg = null;
    if (form.invalid) return;
    this.submitted = true;
    this.appService.logIn(this.model).subscribe(res => {
      this.submitted = false;
      this.router.navigate(['/home'], { queryParams: { msgId: 2 } });
    }, (err: HttpErrorResponse) => {
      if (err.status === 401) this.showFormError("Sorry, that did't work, please try again.");
      this.submitted = false;
    })
  }

  showFormError(msg: string) {
    this.showErr = true;
    this.errMsg = msg;
    setTimeout(() => {
      this.errMsg = null;
      this.showErr = false;
    }, 5000);
  }
}
