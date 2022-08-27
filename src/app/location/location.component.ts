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

  private map: google.maps.Map;
  private service: google.maps.places.PlacesService;
  private infoWindow: google.maps.InfoWindow;
  private isAllowed: boolean;
  private pos: { lat: number, lng: number };
  private marker: google.maps.Marker;
  private directionsService: google.maps.DirectionsService;
  private directionsRenderer: google.maps.DirectionsRenderer;
  private search: string;
  private route = false;
  private showRoute: HTMLElement;
  private clearRoute: HTMLElement;
  public searchMapForm: FormGroup;
  public isConsentModalOpen = false;

  constructor(private readonly fb: FormBuilder, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.openDialog(); 
  }

private loadMap = (zoomValue: number): void => {
    const loader = new Loader({
      apiKey: "AIzaSyAuYpUkcjl8Y8sdktFT0HSgEdGVlL9h9_o",
 
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 32.371, lng: -16.274 },
        zoom: zoomValue,
        mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      scaleControl: true,
      streetViewControl: false,
      fullscreenControl: true,
      });
      this.infoWindow = new google.maps.InfoWindow();
      this.service = new google.maps.places.PlacesService(this.map);
      const myPositionControlDiv = document.createElement('div');
      const myPositionControl = this.createReturnToMyPosControl(this.map);
      myPositionControlDiv.appendChild(myPositionControl);
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(myPositionControlDiv);
    
      const showRouteControlDiv = document.createElement('div');
      const showRouteControl = this.createShowRouteControl(this.map);
      showRouteControlDiv.appendChild(showRouteControl);
      this.showRoute = showRouteControlDiv;
      this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.showRoute);
      this.hideShowRoute(this.showRoute);

      const clearRouteControlDiv = document.createElement('div');
      const clearRouteControl = this.createClearRouteControl(this.map);
      clearRouteControlDiv.appendChild(clearRouteControl);
      this.clearRoute = clearRouteControlDiv;
      this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(this.clearRoute);
    this.hideShowRoute(this.clearRoute);
    }
  )

}
  private hideShowRoute = (control: HTMLElement) => {
  control.style.display = "none";
  }

  private showShowRoute = (control: HTMLElement) => {
   
  control.style.display = "block";
    control.style.position = "absolute";
    // control.style.left = event.pixel.x + 'px';
    // control.style.top = event.pixel.y + 'px';
  
}

  private createReturnToMyPosControl = (map: google.maps.Map) => {
    const controlButton = document.createElement('button');
    controlButton.style.backgroundColor = '#00ff00';
  controlButton.style.border = '2px solid #fff';
  controlButton.style.borderRadius = '3px';
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlButton.style.color = 'rgb(25,25,25)';
  controlButton.style.cursor = 'pointer';
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlButton.style.fontSize = '16px';
  controlButton.style.lineHeight = '38px';
  controlButton.style.margin = '8px 0 22px';
  controlButton.style.padding = '0 5px';
  controlButton.style.textAlign = 'center';

  controlButton.textContent = 'My location';
  controlButton.title = 'Click to show your location';
    controlButton.type = 'button';
    
    controlButton.addEventListener('click', () => {
      map.setCenter(this.pos);
      this.map.setZoom(13);
      
    })
    return controlButton;
  }

   private createShowRouteControl = (map: google.maps.Map) => {
    const controlButton = document.createElement('button');
    controlButton.style.backgroundColor = '#ff0000';
  controlButton.style.border = '2px solid #fff';
  controlButton.style.borderRadius = '3px';
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlButton.style.color = '#fff';
  controlButton.style.cursor = 'pointer';
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlButton.style.fontSize = '16px';
  controlButton.style.lineHeight = '38px';
  controlButton.style.margin = '8px 0 22px';
  controlButton.style.padding = '0 5px';
  controlButton.style.textAlign = 'center';

  controlButton.textContent = 'Show route';
  controlButton.title = 'Click to show route';
    controlButton.type = 'button';
    
    controlButton.addEventListener('click', () => {
      this.calcRoute();
      
    })
    return controlButton;
   }
  
  private createClearRouteControl = (map: google.maps.Map) => {
    const controlButton = document.createElement('button');
    controlButton.style.backgroundColor = '#ff0000';
  controlButton.style.border = '2px solid #fff';
  controlButton.style.borderRadius = '3px';
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlButton.style.color = '#fff';
  controlButton.style.cursor = 'pointer';
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlButton.style.fontSize = '16px';
  controlButton.style.lineHeight = '38px';
  controlButton.style.margin = '8px 0 22px';
  controlButton.style.padding = '0 5px';
  controlButton.style.textAlign = 'center';

  controlButton.textContent = 'Clear route';
  controlButton.title = 'Click to clear route';
    controlButton.type = 'button';
    
    controlButton.addEventListener('click', () => {
      this.deleteRoute();
      
    })
    return controlButton;
  }

  private calculateGeoLocation = (): void => {
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
  }
  
  private openDialog = (): void => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      this.isAllowed = res;
      this.isConsentModalOpen = true;

      if (this.isAllowed) {
        this.loadMap(13);
        this.calculateGeoLocation();
        
      } else {
        this.loadMap(3);
      }
    this.initForm();
    });  
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
    
private initForm = (): void => {
  this.searchMapForm = this.fb.group({
   search: ['']
  });
  };

  public calcRoute() {
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
    this.hideShowRoute(this.showRoute);
    this.showShowRoute(this.clearRoute);
    this.route = true;
  }
  
  private deleteRoute = () => {
    this.directionsRenderer.setMap(null);
    this.hideShowRoute(this.clearRoute);
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
    
    google.maps.event.addListener(this.marker, "rightclick", (event: any) => {
      if (this.route) {
        return;
      }
      
      // const X = event.pixel.x;
      // const Y = event.pixel.y;
      
     this.showShowRoute(this.showRoute);
    })

    google.maps.event.addListener(this.map, "click", (event: any) => {
      
    this.hideShowRoute(this.showRoute);
  });
  }

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
    this.route = false;
    // if (this.pos) {
      
    //   this.calcRoute();
    // }
    this.searchMapForm.reset();
  }
   
}
