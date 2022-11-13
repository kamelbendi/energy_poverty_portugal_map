import { Component } from "react";
import L from 'leaflet';
import { useMap } from "react-leaflet";

class ZoomOutButton extends Component{
    helpDiv;

  
    createButtonControl() {

      const MapHelp = L.Control.extend({
        onAdd: (map) => {
          const helpDiv = L.DomUtil.create("button", "");
          this.helpDiv = helpDiv;
          helpDiv.innerHTML = this.props.title;
  
          helpDiv.addEventListener("click", () => {
            
            /* const marker = L.marker()
              .set(this.props.markerPosition)
              .bindPopup(this.props.description)
              .addTo(map);
  
            marker.openPopup(); */
          });
  
          //a bit clueless how to add a click event listener to this button and then
          // open a popup div on the map
          return helpDiv;
        }
      });
      return new MapHelp({ position: "bottomright" });
    }
  
    componentDidMount() {
      const { map } = this.props;
      const control = this.createButtonControl();
      control.addTo(map);
      control.setPosition()
    }
  
    componentWillUnmount() {
      this.helpDiv.remove();
    }
  
    render() {
      return null;
    }
  }
  
  function withMap(Component) {
    return function WrappedComponent(props) {
      const map = useMap();
      return <Component {...props} map={map} />;
    };
  }
  
  export default withMap(ZoomOutButton);