import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_service/auth.service';
import {User} from '../_model/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../_service/account.service';
import {Account} from '../_model/account';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public prefs: Account[];
  public user: User;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(d => this.user = d);
    const starred: string[] = JSON.parse(localStorage.getItem('starred'));
    if (starred) {
      this.accountService.get(starred).then(d => {
        this.prefs = d;
      });
    }
  }
}
