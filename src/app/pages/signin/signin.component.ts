import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { iUser } from '../../interfaces/i-user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(''),
      // email pass
      email: this.fb.control(''),
      password: this.fb.control('', [Validators.required]),
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Form Submitted!', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  isValid(fieldName: string) {
    // console.log(this.form.get(`data.${fieldName}`)?.valid);

    return this.form.get(`data.${fieldName}`)?.valid;
  }

  isTouched(fieldName: string) {
    return this.form.get(`data.${fieldName}`)?.touched;
  }

  isInvalidTouched(fieldName: string) {
    return !this.isValid(fieldName) && this.isTouched(fieldName);
  }

  register() {
    console.log(this.form.value);

    this.authSvc.register(this.form.value).subscribe((res) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
