import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ParamMap } from '@angular/router/src/shared';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  tab: string;
  id: number;
  activeTab: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  get orderId() {
    return this.id;
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: ParamMap) => {
      this.tab = params['tab'];
      this.id = +params['id'];

      if (this.tab) {
        this.activeTab = this.tab;
      }
    });
  }

  public beforeChange(event: NgbTabChangeEvent) {
    this.router.navigate(['../../', this.id, event.nextId], {
      relativeTo: this.activeRoute
    });
  }
}
