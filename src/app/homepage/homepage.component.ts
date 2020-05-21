import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_service/auth.service';
import {User} from '../_model/user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AuthService, ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(i => this.user = i);
  }

}
