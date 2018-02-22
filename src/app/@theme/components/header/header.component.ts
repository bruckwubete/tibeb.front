import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';

import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => {let payload = users.json(); payload.data.profile_pic.profile_pic_path = 'http://localhost:3000' + payload.data.profile_pic.profile_pic_path;  this.user = payload.data});
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  menuClick(item) {
    if (item.title === 'Log out') {
      this.router.navigate(['auth/logout']);
    }
  }
}
