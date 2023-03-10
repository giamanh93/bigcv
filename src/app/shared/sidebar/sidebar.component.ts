import { Component, OnInit } from '@angular/core';
import {Event, RouterEvent, Router, NavigationEnd} from '@angular/router';
import { menus } from './sidebar-routes.config';
// import { menus } from './sidebar-routes.config';
declare var $: any;
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    menuItems: any[] = [];
    constructor (
        private router: Router,
    ) {
      
    }

    ngOnInit() {
        const pathname  = window.location.pathname ;
        this.menuItems = menus.filter(menuItem => menuItem);
            // this.parseObjectProperties(this.menuItems, pathname);
            this.menuItems = [...this.menuItems];
    }


    parseObjectProperties(obj: any[], pathname: string = '') {
        for (let k of obj) {
            k.label = k.title;
            // if (k.path && k.classs !== 'navigation-header') {
            //     k.routerLink = k.path
            // }
            // if (k.submenus && k.submenus.length > 0) {
            //     k.items = k.submenus.filter((d: any) => d.classs && (d.classs.indexOf("hidden") < 0));
            // }
            if (k.routerLink) {
                // active menu con
                if(k.isExternalLink) {
                    if (k.routerLink && pathname.includes(k.routerLink)) {
                        k.styleClass ='parent_active' + ' ' + k.classs
                    } else {
                        k.styleClass ='parent_no_active' + ' ' + k.classs
                    }
                }else {
                    if (k.routerLink && pathname.includes(k.routerLink)) {
                        k.styleClass = k.path === '/hop-dong-dai-ly/xu-ly-dat-coc' ?  'active hidden' : 'active'
                    } else {
                        k.styleClass =  k.path === '/hop-dong-dai-ly/xu-ly-dat-coc' ?  'no-active hidden' : 'no-active'
                    }
                }
               
            } else {
                //active cha
                if (k.badgeClass && pathname && pathname.split('/').indexOf(k.badgeClass) > -1 && k.classs === 'navigation-header') {
                    k.styleClass ="parent_active" + ' ' + k.classs
                } else {
                    k.styleClass ="parent_no_active" + ' ' + k.classs
                }
            }

            if (k.hasOwnProperty('items') && Array.isArray(k.items) && k.items.length > 0) {
                this.parseObjectProperties(k.items, pathname);
            }
        }
    }


}
