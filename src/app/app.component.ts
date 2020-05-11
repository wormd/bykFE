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

  constructor(private router: Router, private authService: AuthService, ) {
    if (authService.loggedIn()) {
      this.authService.getCurrentUserOrGoLogin().subscribe(
        x => {this.user = x; });
    } else {
      this.logout();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
