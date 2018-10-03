import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../../@auth/reducers';
import { map, take } from 'rxjs/operators';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {  Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LayoutService } from '../../../@core/data/layout.service';

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
              private router: Router,
              private store: Store<fromAuth.State>,
              private layoutService: LayoutService) {

                this.store.select(fromAuth.getUser)
                .subscribe(user => { if(user) { user.value.pic_path = environment.origin + user.value.images[0].path; this.user = user.value;}});
  }

  ngOnInit() {
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

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
