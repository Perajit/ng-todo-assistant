import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fake-line-login',
  templateUrl: './fake-line-login.component.html',
  styleUrls: ['./fake-line-login.component.css']
})
export class FakeLineLoginComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  handleClickLogin() {
    const { redirect_uri, state } = this.route.snapshot.queryParams;
    const apiUrl = 'http://localhost:3000/fake-line-api/auth-callback';
    window.location.href = `${apiUrl}?redirect_uri=${redirect_uri}&state=${state}`;
  }
}
