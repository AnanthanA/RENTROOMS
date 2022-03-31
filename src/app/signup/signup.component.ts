import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { UserInfoModel } from '../model/userinfo.model';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: UserInfoModel = {
    emailId: null,
    password: null,
    mobileNumber: null,
    type: null,
    sellerName: null,
    hotelName: null,
    hotelImageUrl: null,
    hotelAddress: null
  };
  submitted = false;
  imageChosen = '';
  showErr = false;
  errMsg = '';

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void { }

  onSelectFile(event) {
    this.model.hotelImageUrl = null;
    this.imageChosen = '';
    const index = 0;
    const files = <FileList>event.target.files;
    const file = files[index];

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.model.hotelImageUrl = reader.result;
      this.imageChosen = file.name;
    }, false);
    if (file) reader.readAsDataURL(file);
  }

  submit(form: NgForm) {
    this.errMsg = null;
    if (form.invalid) return;
    if (!this.model.hotelImageUrl) {
      this.showFormError('Please select an image.');
      return
    };
    this.submitted = true;
    this.appService.checkEmail(this.model.emailId).subscribe(res => {
      this.showFormError('Sorry, E-mail is already in use.')
      this.submitted = false;
    }, (err: HttpErrorResponse) => {
      if (err.status === 404)
        this.appService.signUp(this.model).subscribe(res => {
          this.submitted = false;
          this.router.navigate(['/home'], { queryParams: { msgId: 1 } });
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.submitted = false;
        });
    });
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
