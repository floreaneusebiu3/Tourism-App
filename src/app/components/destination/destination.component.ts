import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent {
  @Input() destination = new Destioantion(0, '', '', 0, 0, false);
}

export class Destioantion {
  id: number;
  title: string;
  location: string;
  noRooms: number;
  price: number;
  isDiscount: boolean;

  constructor(
    id: number,
    title: string,
    location: string,
    noRooms: number,
    price: number,
    isDiscount: boolean
  ) {
    (this.id = id), (this.title = title);
    this.location = location;
    this.noRooms = noRooms;
    this.price = price;
    this.isDiscount = isDiscount;
  }
}

export class Reservation {
  id: number;
  destinationId: number;
  checkinDate: Date;
  checkoutDate: Date;

  constructor(
    id: number,
    destinationId: number,
    checkinDate: Date,
    checkoutDate: Date
  ) {
    this.id = id;
    this.destinationId = destinationId;
    this.checkinDate = checkinDate;
    this.checkoutDate = checkoutDate;
  }
}
