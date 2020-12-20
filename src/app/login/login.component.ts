import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './Login';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = new Login();
  users: any[];
  valid: boolean = true;
  isLoggedIn = 'false';

  constructor(private fb: FormBuilder, private router: Router, private loginService: WebserviceService) { }

  errorMessage: String;
  successMessage: String;

  loginForm: FormGroup;

  //validation for input values
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  //login using data recieved from service
  login(data: any) {
    this.loginService.loginData({ data })
      .subscribe((success) => {
        this.successMessage = "Login successful";
        // console.log(this.successMessage);
      },
        (error) => { this.errorMessage = <any>error; }
      )
  }

  //checking credentials and routing to welcome page
  onSubmit() {
    this.valid = true;
    const name = this.loginForm.value.email;
    sessionStorage.setItem('email', this.loginForm.value.email);
    const password = this.loginForm.value.password;
    const user = (name === "eve.holt@reqres.in" && password === "cityslicka");
    if (user) {
      this.isLoggedIn = 'true';
      sessionStorage.setItem('isLoggedIn', this.isLoggedIn);
      this.login(this.loginForm.value);
      setTimeout(()=>{alert("Login Successful"),5000});
      this.router.navigate(['/welcome']);
    } 
    else {
      this.isLoggedIn = 'false';
      sessionStorage.setItem('isLoggedIn', this.isLoggedIn);
      this.valid = false;
    }
  }
}