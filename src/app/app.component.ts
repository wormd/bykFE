import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './_service/auth.service';
import {User} from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BykFE';
  user: User;
  navShow = true;
  userShow = false;
  dropdownShow = true;

  constructor(private router: Router, public authService: AuthService, ) {
    if (authService.loggedIn()) {
      this.authService.fetchCurrentUser();
      this.authService.currentUser$.subscribe(d => this.user = d);
    } else {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
