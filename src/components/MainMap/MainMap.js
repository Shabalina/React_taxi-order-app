import React, { Component } from 'react';
import mapboxgl from "mapbox-gl";
import './Map.css';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import {getIsOrder, getRouteList} from '../../modules/Order';

const styles = ({
  container :{
    position: 'relative',
    zIndex: '-10'
},

map : {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    width: '100%',
    height: '592px'
}
})

class Map extends Component {
  map = null;
  mapContainer = React.createRef();
  route = ''

  componentDidMount() {    
    mapboxgl.accessToken = "pk.eyJ1Ijoic2hhYmFsaW5hc3R5YSIsImEiOiJjanJqdW5rd3AwMGhwM3lvNnZsaTN0NXRnIn0.tr3NyP--TM-FEtyZeHIHFA";
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [30.2656504, 59.8029126],
      zoom: 15
    });    
  }

  componentDidUpdate(){    
    const {isOrder, routeList} = this.props    
    if (isOrder){  
      this.route=`route${routeList[0]}&${routeList[-1]}`
      this.toggleVisible('visible')   
      this.mapFlyTo()  
      } else {
        this.toggleVisible('none')      
    }
  }

  toggleVisible(option){
    const {isOrder} = this.props
    if(this.map.getLayer(this.route)){
        this.map.setLayoutProperty(this.route, 'visibility', option);
    }
    else {
      if (isOrder){
        this.addRouteLayer()
      }
    }
  }

  addRouteLayer(){
    const {routeList} = this.props
    this.map.addLayer({
      "id": this.route,
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": routeList
              }
          }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
        },
      "paint": {
        "line-color": "#888",
        "line-width": 8
        }
      }); 
  }

  mapFlyTo(){
    const {routeList} = this.props
    this.map.flyTo({
      center: routeList[0],
      zoom: 15,
      speed: 0.8,
      curve: 1,
      easing(t) {
        return t;
      }
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const { classes } = this.props;

    return (
    <div className={classes.container}>
      <div className={classes.map} ref={this.mapContainer} />
    </div>
    )
  }
}

const mapStateToProps = state => ({
  isOrder: getIsOrder(state),
  routeList: getRouteList(state)
})

export default connect(mapStateToProps, null)(withStyles(styles)(Map));