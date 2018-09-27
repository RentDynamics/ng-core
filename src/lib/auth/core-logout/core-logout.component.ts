import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rd-core-logout',
  templateUrl: './core-logout.component.html',
  styleUrls: ['./core-logout.component.css']
})
export class CoreLogoutComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
      this.router.navigateByUrl('/auth/login');
  }

}
