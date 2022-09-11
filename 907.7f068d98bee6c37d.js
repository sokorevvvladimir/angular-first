"use strict";(self.webpackChunkangular_phonebook_02=self.webpackChunkangular_phonebook_02||[]).push([[907],{1907:(F,y,c)=>{c.r(y),c.d(y,{LocationModule:()=>O});var v=c(6895),R=c(4421),b=function i(e,t){if(e===t)return!0;if(e&&t&&"object"==typeof e&&"object"==typeof t){if(e.constructor!==t.constructor)return!1;var n,s,a;if(Array.isArray(e)){if((n=e.length)!=t.length)return!1;for(s=n;0!=s--;)if(!i(e[s],t[s]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if((n=(a=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(s=n;0!=s--;)if(!Object.prototype.hasOwnProperty.call(t,a[s]))return!1;for(s=n;0!=s--;){var l=a[s];if(!i(e[l],t[l]))return!1}return!0}return e!=e&&t!=t};const w="__googleMapsScriptId";var u=(()=>{return(i=u||(u={}))[i.INITIALIZED=0]="INITIALIZED",i[i.LOADING=1]="LOADING",i[i.SUCCESS=2]="SUCCESS",i[i.FAILURE=3]="FAILURE",u;var i})();class p{constructor({apiKey:e,authReferrerPolicy:t,channel:n,client:s,id:a=w,language:l,libraries:r=[],mapIds:h,nonce:f,region:g,retries:C=3,url:P="https://maps.googleapis.com/maps/api/js",version:x}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=n,this.client=s,this.id=a||w,this.language=l,this.libraries=r,this.mapIds=h,this.nonce=f,this.region=g,this.retries=C,this.url=P,this.version=x,p.instance){if(!b(this.options,p.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(p.instance.options)}`);return p.instance}p.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?u.FAILURE:this.done?u.SUCCESS:this.loading?u.LOADING:u.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+=`?callback=${this.CALLBACK}`,this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){const e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(n=>{n?t(n.error):e(window.google)})})}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){if(document.getElementById(this.id))return void this.callback();const e=this.createUrl(),t=document.createElement("script");t.id=this.id,t.type="text/javascript",t.src=e,t.onerror=this.loadErrorCallback.bind(this),t.defer=!0,t.async=!0,this.nonce&&(t.nonce=this.nonce),document.head.appendChild(t)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version)return console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),void this.callback();this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}var m=c(5412),o=c(4650),L=c(4859);let k=(()=>{class i{constructor(t,n){this.dialogRef=t,this.message=n,this.onClickNo=()=>{this.dialogRef.close(!1)}}}return i.\u0275fac=function(t){return new(t||i)(o.Y36(m.so),o.Y36(m.WI))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-confirm-dialog"]],decls:7,vars:1,consts:[["mat-raised-button","","color","primary",3,"mat-dialog-close"],["mat-raised-button","","color","warn",3,"click"]],template:function(t,n){1&t&&(o.TgZ(0,"mat-dialog-content"),o._uU(1,"Do yoy consent the access to your current location?"),o.qZA(),o.TgZ(2,"mat-dialog-actions")(3,"button",0),o._uU(4," Yes "),o.qZA(),o.TgZ(5,"button",1),o.NdJ("click",function(){return n.onClickNo()}),o._uU(6,"No"),o.qZA()()),2&t&&(o.xp6(3),o.Q6J("mat-dialog-close",!0))},dependencies:[L.lW,m.ZT,m.xY,m.H8]}),i})();var d=c(4006),E=c(9549),M=c(4144);function S(i,e){if(1&i){const t=o.EpF();o.TgZ(0,"div")(1,"form",4),o.NdJ("submit",function(){o.CHM(t);const s=o.oxw();return o.KtG(s.find())}),o.TgZ(2,"mat-form-field",5)(3,"mat-label"),o._uU(4,"Search"),o.qZA(),o._UZ(5,"input",6),o.qZA(),o.TgZ(6,"button",7),o._uU(7,"Find!"),o.qZA()()()}if(2&i){const t=o.oxw();o.xp6(1),o.Q6J("formGroup",t.searchMapForm)}}const I=[{path:"",component:(()=>{class i{constructor(t,n){this.fb=t,this.dialog=n,this.route=!1,this.isConsentModalOpen=!1,this.loadMap=s=>{new p({apiKey:"AIzaSyAuYpUkcjl8Y8sdktFT0HSgEdGVlL9h9_o"}).load().then(()=>{this.map=new google.maps.Map(document.getElementById("map"),{center:{lat:32.371,lng:-16.274},zoom:s,mapTypeControl:!0,mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.HORIZONTAL_BAR,position:google.maps.ControlPosition.TOP_CENTER},zoomControl:!0,zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_CENTER},scaleControl:!0,streetViewControl:!1,fullscreenControl:!0}),this.infoWindow=new google.maps.InfoWindow,this.service=new google.maps.places.PlacesService(this.map);const l=document.createElement("div"),r=this.createReturnToMyPosControl();l.appendChild(r),this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(l);const h=document.createElement("div"),f=this.createShowRouteControl();h.appendChild(f),this.showRoute=h,this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(this.showRoute),this.hideShowRoute(this.showRoute);const g=document.createElement("div"),C=this.createClearRouteControl();g.appendChild(C),this.clearRoute=g,this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(this.clearRoute),this.hideShowRoute(this.clearRoute)})},this.hideShowRoute=s=>{s.style.display="none"},this.showShowRoute=s=>{s.style.display="block",s.style.position="absolute"},this.createCustomControl=(s,a,l)=>{const r=document.createElement("button");return r.style.backgroundColor=s,r.style.border="2px solid #fff",r.style.borderRadius="3px",r.style.boxShadow="0 2px 6px rgba(0,0,0,.3)",r.style.color=a,r.style.cursor="pointer",r.style.fontFamily="Roboto,Arial,sans-serif",r.style.fontSize="16px",r.style.lineHeight="38px",r.style.margin="8px 0 22px",r.style.padding="0 5px",r.style.textAlign="center",r.textContent=l,r.type="button",r},this.currentLocationAccess=()=>{this.openDialog()},this.locateUser=()=>{this.map.setCenter(this.pos),this.map.setZoom(13),this.infoWindow.setPosition(this.pos),this.infoWindow.setContent("Your current location"),this.infoWindow.open(this.map)},this.createReturnToMyPosControl=()=>(this.showUserLocationControl=this.createCustomControl("#00ff00","rgb(25,25,25)","My location"),this.isAllowed||this.showUserLocationControl.addEventListener("click",this.currentLocationAccess),this.showUserLocationControl.addEventListener("click",this.locateUser),this.showUserLocationControl),this.createRoute=()=>{this.calcRoute()},this.createShowRouteControl=()=>(this.showRouteControl=this.createCustomControl("#ff0000","#fff","Show route"),this.showRouteControl.addEventListener("click",this.createRoute),this.showRouteControl),this.removeRoute=()=>{this.deleteRoute()},this.createClearRouteControl=()=>(this.clearRouteControl=this.createCustomControl("#ff0000","#fff","Clear route"),this.clearRouteControl.addEventListener("click",this.removeRoute),this.clearRouteControl),this.calculateGeoLocation=()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(s=>{const a={lat:s.coords.latitude,lng:s.coords.longitude};this.pos=a,this.infoWindow.setPosition(a),this.infoWindow.setContent("Location found."),this.infoWindow.open(this.map),this.map.setCenter(a)},()=>{this.handleLocationError(!0,this.infoWindow,this.map.getCenter())}):this.handleLocationError(!1,this.infoWindow,this.map.getCenter())},this.openDialog=()=>{this.dialog.open(k,{}).afterClosed().subscribe(a=>{this.isAllowed=a,this.isConsentModalOpen=!0,this.isAllowed?(this.loadMap(13),this.calculateGeoLocation()):this.loadMap(3),this.initForm()})},this.initForm=()=>{this.searchMapForm=this.fb.group({search:[""]})},this.deleteRoute=()=>{this.directionsRenderer.setMap(null),this.hideShowRoute(this.clearRoute),this.route=!1},this.find=()=>{const{search:s}=this.searchMapForm.value;this.search=s,this.service.findPlaceFromQuery({query:s,fields:["name","geometry"]},(l,r)=>{if(r===google.maps.places.PlacesServiceStatus.OK&&l){for(let h=0;h<l.length;h++)this.createMarker(l[h]);this.map.setCenter(l[0].geometry.location),this.map.setZoom(13)}}),this.route=!1,this.searchMapForm.reset()}}ngOnInit(){this.openDialog()}ngOnDestroy(){google.maps.event.removeListener(this.markerCreateListener),google.maps.event.removeListener(this.routeCreateListener),google.maps.event.removeListener(this.routeHideListener),this.showUserLocationControl.removeEventListener("click",this.currentLocationAccess),this.showUserLocationControl.removeEventListener("click",this.locateUser),this.showRouteControl.removeEventListener("click",this.createRoute),this.clearRouteControl.removeEventListener("click",this.removeRoute)}handleLocationError(t,n,s){n.setPosition(s),n.setContent(t?"Error: The Geolocation service failed.":"Error: Your browser doesn't support geolocation."),n.open(this.map)}createMarker(t){!t.geometry||!t.geometry.location||(this.marker&&this.marker.setMap(null),this.marker=new google.maps.Marker({map:this.map,position:t.geometry.location}),this.markerCreateListener=google.maps.event.addListener(this.marker,"click",()=>{this.infoWindow.setContent(t.name||""),this.infoWindow.setPosition(t.geometry.location),this.infoWindow.open(this.map)}),this.routeCreateListener=google.maps.event.addListener(this.marker,"click",n=>{this.route||!this.pos||this.showShowRoute(this.showRoute)}),this.routeHideListener=google.maps.event.addListener(this.map,"click",n=>{this.hideShowRoute(this.showRoute)}))}calcRoute(){this.directionsRenderer&&this.directionsRenderer.setMap(null),this.directionsService=new google.maps.DirectionsService,this.directionsRenderer=new google.maps.DirectionsRenderer,this.directionsRenderer.setMap(this.map);const t={origin:this.pos,destination:this.search,travelMode:google.maps.TravelMode.DRIVING};this.directionsService.route(t,(n,s)=>{"OK"==s&&this.directionsRenderer.setDirections(n)}),this.hideShowRoute(this.showRoute),this.showShowRoute(this.clearRoute),this.route=!0}}return i.\u0275fac=function(t){return new(t||i)(o.Y36(d.qu),o.Y36(m.uw))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-location"]],decls:4,vars:1,consts:[[1,"map-container"],[4,"ngIf"],[1,"map-frame",2,"position","relative"],["id","map"],[1,"searchForm",3,"formGroup","submit"],["appearance","outline"],["matInput","","formControlName","search",2,"padding","0"],["mat-raised-button","","color","accent"]],template:function(t,n){1&t&&(o.TgZ(0,"div",0),o.YNc(1,S,8,1,"div",1),o.TgZ(2,"div",2),o._UZ(3,"div",3),o.qZA()()),2&t&&(o.xp6(1),o.Q6J("ngIf",n.isConsentModalOpen))},dependencies:[v.O5,d._Y,d.Fj,d.JJ,d.JL,d.sg,d.u,L.lW,E.KE,E.hX,M.Nt],styles:[".map-container[_ngcontent-%COMP%]{margin:0 20px;text-align:center}.map-frame[_ngcontent-%COMP%]{border:2px solid black;height:100%}#map[_ngcontent-%COMP%]{height:100%}.map-span[_ngcontent-%COMP%]{color:#ff0;margin-left:5px}.map-btn[_ngcontent-%COMP%]{margin-bottom:10px}.searchForm[_ngcontent-%COMP%]{display:flex;justify-content:center;margin-bottom:10px}  .mat-form-field-wrapper{padding-bottom:0}[_nghost-%COMP%]     .mat-form-field-appearance-outline .mat-form-field-wrapper{margin:0}"]}),i})()}];let T=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[R.Bz.forChild(I),R.Bz]}),i})();var A=c(3927);let O=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[v.ez,T,A.m]}),i})()}}]);