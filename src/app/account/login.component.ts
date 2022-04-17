import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    validation = false;
    htmlStr: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onFocus(): void {
        this.htmlStr = "";
        this.validation = false;
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        // if (this.form.invalid) {
        //     return;
        // }

        // this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/willy']);
            },
            error => {
                //this.alertService.error(error);
                this.loading = false;
                this.validation = true
                this.htmlStr = "Wrong username or password please try again";
            });
        //this.router.navigate(['/willy']);
            // .subscribe(
            //     data => {
            //         this.router.navigate([this.returnUrl]);
            //     },
            //     error => {
            //         this.loading = false;
            //     });
    }
}