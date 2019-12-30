import { Directive, ElementRef, OnInit, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var google: any;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;

  constructor(
    elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place) {
    if (!place.address_components || !place.formatted_address) {
      return null;
    }

    return {
      address_components: place.address_components,
      address_formatted: place.formatted_address,
      address_url: place.url,
      address_location: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const autocomplete = new google.maps.places.Autocomplete(this.element);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
      });
    }

  }

}