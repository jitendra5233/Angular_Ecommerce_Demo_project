import { Component } from '@angular/core';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {

  constructor (
    public route:ActivatedRoute,
    public router:Router
    ) { }
}
