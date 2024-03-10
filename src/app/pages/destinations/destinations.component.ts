import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Destioantion,
  Reservation,
} from 'src/app/components/destination/destination.component';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit {
  destinations: Destioantion[] = [
    //cluj-napoca
    new Destioantion(1, 'Rux', 'Cluj Napoca', 2, 200, false),
    new Destioantion(2, 'Belvedere', 'Cluj Napoca', 4, 300, true),
    new Destioantion(3, 'Grand', 'Cluj Napoca', 5, 400, false),
    new Destioantion(4, 'Transilvania', 'Cluj Napoca', 6, 400, true),
    new Destioantion(5, 'City Plaza', 'Cluj Napoca', 2, 400, false),

    //baia mare
    new Destioantion(6, 'Rivulus', 'Baia Mare', 2, 500, false),
    new Destioantion(7, 'Carpati', 'Baia Mare', 4, 500, true),
    new Destioantion(8, 'Mara', 'Baia Mare', 7, 700, false),
    new Destioantion(9, 'Seneca', 'Baia Mare', 2, 100, true),
    new Destioantion(10, 'Diafan', 'Baia Mare', 7, 900, false),

    //brasov
    new Destioantion(11, 'Brux', 'Brasov', 3, 200, true),
    new Destioantion(12, 'Kronwell', 'Brasov', 2, 100, true),
    new Destioantion(13, 'Kolping', 'Brasov', 4, 700, false),
    new Destioantion(14, 'Cubix', 'Brasov', 5, 800, false),
    new Destioantion(15, 'Armatti', 'Brasov', 2, 800, false),

    //bucuresti
    new Destioantion(16, 'Residence', 'Bucuresti', 10, 1000, false),
    new Destioantion(17, 'Hilton', 'Bucuresti', 2, 200, true),
    new Destioantion(18, 'Continental', 'Bucuresti', 10, 500, true),
    new Destioantion(19, 'Radisson', 'Bucuresti', 1, 300, false),
    new Destioantion(20, 'Epoque', 'Bucuresti', 4, 1200, false),

    //alba-iulia
    new Destioantion(21, 'Cetate', 'Alba Iulia', 2, 100, true),
    new Destioantion(22, 'Medieval', 'Alba Iulia', 1, 50, true),
    new Destioantion(23, 'Astoria', 'Alba Iulia', 10, 1000, false),
    new Destioantion(24, 'Apulum', 'Alba Iulia', 4, 800, false),
    new Destioantion(25, 'Parc', 'Alba Iulia', 6, 1400, false),
  ];

  reservations: Reservation[] = [
    new Reservation(1, 1, new Date(2024, 2, 1), new Date(2024, 2, 3)),
    new Reservation(2, 2, new Date(2024, 2, 1), new Date(2024, 2, 3)),
    new Reservation(3, 3, new Date(2024, 2, 1), new Date(2024, 2, 3)),
  ];

  locations: string[] = [''];
  myControl = new FormControl('');
  options = ['One', 'Two', 'Three'];
  filteredLocations: string[] = [];
  selectedLocation: string | undefined;
  filledLocation: string | undefined;
  filteredDestinations: Destioantion[] = [];
  justDiscounts = false;
  selectedStartDate: Date | undefined;
  selectedEndDate: Date | undefined;

  ngOnInit(): void {
    this.locations = [
      ...new Set(this.destinations.map((destination) => destination.location)),
    ];
    this.filteredLocations = this.locations;
    this.filteredDestinations = this.destinations;
  }

  setLocation(i: number) {
    this.selectedLocation = this.locations[i];
    this.filterDestinations();
  }

  filterLocations() {
    this.filteredLocations = this.locations;

    if (this.filledLocation)
      this.filteredLocations = this.locations.filter((l) =>
        l.toLocaleLowerCase().includes(this.filledLocation!.toLocaleLowerCase())
      );
  }

  changeJustDiscounts() {
    this.justDiscounts = !this.justDiscounts;
    this.filterDestinations();
  }

  filterDestinations() {
    this.filteredDestinations = this.destinations;

    if (this.justDiscounts) {
      this.filteredDestinations = this.filteredDestinations.filter(
        (d) => d.isDiscount
      );
    }

    if (this.selectedLocation) {
      this.filteredDestinations = this.filteredDestinations.filter(
        (d) => d.location === this.selectedLocation
      );
    }

    if (this.selectedStartDate && this.selectedEndDate) {
      var currentReservations = this.reservations.filter(
        (r) =>
          (this.selectedStartDate! >= r.checkinDate &&
            this.selectedStartDate! <= r.checkoutDate) ||
          (this.selectedEndDate! >= r.checkinDate &&
            this.selectedEndDate! <= r.checkoutDate)
      );
      console.log(this.selectedStartDate);
      console.log(this.reservations[0].checkinDate);
      console.log(currentReservations);
      if (currentReservations.length > 0)
        this.filteredDestinations = this.filteredDestinations.filter(
          (d) => !currentReservations.map((r) => r.destinationId).includes(d.id)
        );
    }
  }

  setSelectedDate(dateRange: FormGroup) {
    if (dateRange.value.start && dateRange.value.end && dateRange.valid) {
      this.selectedStartDate = new Date(
        dateRange.value.start.getFullYear(),
        dateRange.value.start.getMonth(),
        dateRange.value.start.getDate()
      );
      this.selectedEndDate = new Date(
        dateRange.value.end.getFullYear(),
        dateRange.value.end.getMonth(),
        dateRange.value.end.getDate()
      );
    } else {
      this.selectedStartDate = undefined;
      this.selectedEndDate = undefined;
    }
    this.filterDestinations();
  }
}
