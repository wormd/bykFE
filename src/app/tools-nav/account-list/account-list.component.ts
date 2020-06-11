import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Account} from '../../_model/account';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  @Input() accounts: Account[];


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {

  }

}
