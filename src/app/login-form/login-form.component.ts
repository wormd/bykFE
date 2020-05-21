import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../_service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = false;
  errormsg: string;

  constructor(private route: ActivatedRoute, private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/']);
    }
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.authService.login(this.f.user.value, this.f.pwd.value).subscribe(d => {
      this.submitted = true;
      this.router.navigate(['/']);
      location.reload();
    }, e => {
      this.error = true;
      this.errormsg = e;
      this.loading = false;
    });
  }

}
