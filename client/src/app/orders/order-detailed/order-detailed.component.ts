import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private orderService: OrdersService, private activatedRoute: ActivatedRoute,
              private bcService: BreadcrumbService) {
      this.bcService.set('@OrderDetailed', '');
     }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrderDetail(+this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe((order: IOrder) => {
        this.order = order;
        this.bcService.set('@OrderDetailed', `Order # ${order.id} - ${order.status}`);
      }, error => {
        console.log(error);
      });
  }

}
