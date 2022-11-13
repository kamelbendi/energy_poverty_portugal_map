//import { useState } from 'react';
import { Component } from 'react';
import L from 'leaflet';
/* import { MapContainer} from 'react-leaflet/MapContainer'
import {GeoJSON} from 'react-leaflet';
import { TileLayer } from 'react-leaflet/TileLayer' */
import data from '../Data/dataPortugal.json'
import './Map.css';
//import ZoomOutButton from './ZoomOutButton';
//import SelectedRegion from './SelectedRegion.js';
/* const style = {
  width: "100%",
  height: "80vh"
}; */

//const obj = [{name: "faro", id: 8, heating: 13,cooling: 1200},{name: "leiria", id: 10, heating: 130,cooling: 12},{name: "castelo branco", id: 5, heating: 1300,cooling: 2},{name: "viseu",id: 18, heating: 500,cooling: 300},{name: "a\u00e7ores",id: 20, heating: 800,cooling: 100},{name: "guarda",id: 9,  heating: 13,cooling: 12},{name: "braga",id:3, heating: 13,cooling: 2},{name: "bragan\u00e7a", id: 4, heating: 13,cooling: 12},{name: "Faro", heating: 13,cooling: 39},{name: "Lisboa", heating: 13,cooling: 99},{name: "Portalegre", heating: 13,cooling: 12},{name: "Santarém", heating: 13,cooling: 12},{name: "Braga", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12},{name: "Azores", heating: 13,cooling: 12}]

class Map extends Component {
  constructor(){
    super();
    this.initialPosition=[39.5, -9];
    this.initialZoom = 7;
    this.state = {
        //region: 'district',
        heatingSelected : true
        //chosenDataToShow: 'heating'
        
    }
}

// -------------------------------

  componentDidMount() {

    this.map = L.map("map", {
      center: this.initialPosition,
      zoom: this.initialZoom,
      layers: [
        L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmxvcnZhbmRla2VyY2tob3ZlIiwiYSI6ImNqdGZyMmtrejAxYWw0M3A2OGtwdTMxNWEifQ.5U-KSDZfyKNC_Z74fEWj6g",
        {
          maxZoom: 10,
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: "streets-v9"
        })
      ]
    });

    this.geojson = L.geoJson(data, {
      style: (feature) => this.mapStyle(feature),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);

//  -------------------------------------Adding White Window for data 

    this.info = L.control();
    this.info.onAdd = function() {
      this._div = L.DomUtil.create("div", "info");
      this.update();
      return this._div;
    };

    this.info.update = function(props, state) {
      this._div.innerHTML =
        "<h4>Energy poverty in Portugal :</h4>" +
        (props

          ? state.heatingSelected ? 
          
          "<b>" +
            "Name : " + props.dis_name_upper +
            "</b><br />" +
            
             "Value :" + props.heating 
            
             : "<b>" +
             "Name : " + props.dis_name_upper +
             "</b><br />" +
             
              "Value : " + props.cooling 
            
          : "Hover over Region");
    };

    this.info.addTo(this.map);

    //--------------------------------------------------------
   /*  this.zoom = L.control();
    this.zoom.onAdd = function() {
      this._div = L.DomUtil.create("button", "zoom");
      this._div.innerHTML = "Zoom out";

      //this.zoomOutFunction();
      return this._div;
    };
    
    this.zoom.onAdd().addEventListener("click", () => {this.map.setView([40, -16.5], 5.5); console.log(("rrrr"))});

    //this.zoom.onAdd(this.zoomOut);
    this.zoom.addTo(this.map); */
//---------------------------------------------
/*   this.heatingCoolingButton = L.control();
  this.heatingCoolingButton.onAdd = function() {
  this._div = L.DomUtil.create("button", "heatingCoolingButton");
  //this._div.addEventListener("click", (update)());
  this._div.innerHTML = "Switch Data";
  
  //this.zoomOutFunction();
  //this.update();
  return this._div;
};




//this.heatingCoolingButton.onAdd().addEventListener("click", () => {this.setState({heatingSelected : !this.state.heatingSelected})});

//this.zoom.onAdd(this.zoomOut);
this.heatingCoolingButton.addTo(this.map); */
    // add layer
    this.layer = L.layerGroup().addTo(this.map);

    /* if (this.state.heatingSelected !== this.props.heatingSelected){ this.setState({ heatingSelected: this.props.heatingSelected });} */
  }

  componentDidUpdate(){
    this.geojson = L.geoJson(data, {
      style: (feature) => this.mapStyle(feature),
      onEachFeature: this.onEachFeature
    }).addTo(this.map);
  }
  
  mapStyle = (feature) => {
    return ({
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      fillColor: this.state.heatingSelected ? this.getColorHeating(feature.properties.heating) : this.getColorCooling(feature.properties.cooling)
    });
  }
  
  
  getColorHeating = (d) =>{
    return d > 15
    ? "#800026"
    : d > 14
      ? "#BD0026"
      : d > 13
        ? "#E31A1C"
        : d > 12
          ? "#FC4E2A"
          : d > 11
            ? "#FD8D3C"
            : d > 10 ? "#FEB24C" : d > 9 ? "#FED976" : "#FFEDA0";
  }
  
  getColorCooling = (d) =>{
    return d > 15
    ? "#000431"
    : d > 14
      ? "#01065A"
      : d > 13
        ? "#021CA4"
        : d > 12
          ? "#3099FE"
          : d > 11
            ? "#60B2FE"
            : d > 10 ? "#90CCFE" : d > 9 ? "#F0FFFE" : "#F0FFFE";
  }

  /* zoomOut = () => {
    this.map.setView([40, -16.5], 5.5);
  } */

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.zoomToFeature
    });
  }


  highlightFeature = (e) => {
    var layer = e.target;
    layer.setStyle({
      weight: 3,
      color: "#666",
      dashArray: "",
      fillOpacity: 0.7
    });
    layer.bringToFront();
    this.info.update(layer.feature.properties, this.state);   //update info in window
  }

  resetHighlight = (event) => {
    this.geojson.resetStyle(event.target);
    this.info.update();
  }

  zoomToFeature = (e) => {
    this.map.fitBounds(e.target.getBounds());
  }

 


  render() {
    return (
      <div id="container">
        <div className={"btn-group"}>
          {/* <button className='select_region'>Select Region</button> */}
          <button className={"switch_data_button"} onClick={()=>{this.setState({heatingSelected : !this.state.heatingSelected}); console.log(this.state.heatingSelected.toString())}}>Switch Data</button>
          <button className={"zoom"} onClick={() => {this.map.setView([39.5, -9], 7)}}>Center Map Position</button>
        </div>
        <div id="map"></div>
      </div>
      )} 
    }
    /* </div> */
    export default Map;
    /* {/* <div id="map"> 
    {/* <SelectedRegion />  
    {/* <ZoomOutButton title={"Zoom Out"} initialZoom={this.initialZoom} initialPosition={this.initialPosition}/> 
    {/* <button id="zoom" onClick={this.zoomOut}>Zoom Out</button> */

/* function Map({region, data}) {
  const mapStyle = {
    fillColor: "white",
    weight: 1,
    color: "black",
    fillOpacity: 1,
  };
    //const [position, setPosition] = useState([40, -16.5]);
    const position = [40, -16.5];
    const zoom = 5.5;
    const dataToWindow = "";

    return ( 
        <>
            <div className="map">
            <MapContainer center={position} zoom={zoom} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                  style={mapStyle}
                  data={data}
                />
            </MapContainer>
          </div>

          

          <Window dataToWindow={dataToWindow}/>
        </>
     );
}

export default Map; */