import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public isConsentModalOpen = false;
  private map: google.maps.Map;
  private service: google.maps.places.PlacesService;
  private infoWindow: google.maps.InfoWindow;
  private isAllowed: boolean;
  private pos: { lat: number, lng: number };
  private marker: google.maps.Marker;
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;
  private search: string;

  public openDialog = (): void => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      this.isAllowed = res;
      this.isConsentModalOpen = true;

      if (this.isAllowed) {
      const loader = new Loader({
        apiKey: "AIzaSyAuYpUkcjl8Y8sdktFT0HSgEdGVlL9h9_o",
 
      });

      loader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: 32.371, lng: -16.274 },
          zoom: 13,
        });
        this.infoWindow = new google.maps.InfoWindow();
        this.service = new google.maps.places.PlacesService(this.map);
        
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
           
            this.pos = pos;
          
            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent("Location found.");
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
           
          },
          () => {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
          }
        );
      } else {
     
      this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
      });
      
      
    
    } else {
       const loader = new Loader({
        apiKey: "AIzaSyAuYpUkcjl8Y8sdktFT0HSgEdGVlL9h9_o",
 
      });

      loader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat: 32.371, lng: -16.274 },
          zoom: 3,
        });
        this.infoWindow = new google.maps.InfoWindow();
        this.service = new google.maps.places.PlacesService(this.map);
      });
    }
    this.initForm();
    });
  
    
    
  }

  
  ngOnInit(): void {
    this.openDialog();
    
  }
  private handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(this.map);
  }
  
  public searchMapForm: FormGroup;
  constructor(private readonly fb: FormBuilder, public dialog: MatDialog) { }
  
private initForm = (): void => {
  this.searchMapForm = this.fb.group({
   search: ['']
  });
  };

  public find = () => {
    const {search} = this.searchMapForm.value;
    this.search = search;
    const request = {
    query: search,
    fields: ["name", "geometry"],
    };
    
    this.service.findPlaceFromQuery(
    request,
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        for (let i = 0; i < results.length; i++) {
          this.createMarker(results[i]);
        }

        this.map.setCenter(results[0].geometry!.location!);
        this.map.setZoom(13);
        
  
      }
    }
    );
    if (this.pos) {
      
      this.calcRoute();
    }
    this.searchMapForm.reset();
  }

  private calcRoute() {
  if (this.directionsRenderer) { this.directionsRenderer.setMap(null) };
    
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
      
    this.directionsRenderer.setMap(this.map);
    
  const request = {
    origin: this.pos,
    destination: this.search,
    travelMode: google.maps.TravelMode.DRIVING
  };
  this.directionsService.route(request, (result, status) => {
    if (status == 'OK') {
      this.directionsRenderer.setDirections(result);
    }
  });
}

  private createMarker(place: google.maps.places.PlaceResult) {
  if (!place.geometry || !place.geometry.location) return;
    if(this.marker) this.marker.setMap(null);

  this.marker = new google.maps.Marker({
    map: this.map,
    position: place.geometry.location,
  });
  
    
  google.maps.event.addListener(this.marker, "click", () => {
    this.infoWindow.setContent(place.name || "");
    this.infoWindow.setPosition(place.geometry!.location);
    this.infoWindow.open(this.map);
  });
}
}
