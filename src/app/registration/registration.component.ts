import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private fb: FormBuilder, private regService: WebserviceService) { }

  errorMessage: String='';
  successMessage: String='';
  show: boolean = false;
  isValid: boolean = false;

  registerForm: FormGroup;

  //validations for registration page
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(6)]],
      firstName: ['', [Validators.required,Validators.pattern('[a-zA-Z]')]],
      lastName: ['', [Validators.required,Validators.pattern('[a-zA-Z]')]]
    });
  }
  
  //registering data recieved from service
  register(data) {
    this.regService.registerData({ data })
      .subscribe(
        success =>{ this.successMessage = 'Successfully registered';
        this.isValid=true},
        error => this.errorMessage = 'Invalid data..Please try again');
    console.log("data posted");
  }
}
