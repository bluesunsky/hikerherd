import type { FC } from "react";

import React from "react";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Icon } from "@chakra-ui/icon";
import { Tooltip } from "@chakra-ui/react";
type UserMapProps = {};

const UserMap: FC<UserMapProps> = ({}) => {
  return (
    <div style={{ display: "flex", height: "400px" }}>
      <SimpleMap></SimpleMap>
    </div>
  );
};

class SimpleMap extends React.Component {
  static defaultProps = {
    zoom: 11,
  };

  render() {
    /*const center = {
      lat: 43.296482,
      lng: 5.36978,
    };*/
    const locations = [
      {
        id: "1",
        name: "Benjamin",
        lat: 43.251151952880704,
        lng: 5.425290819313107,
      },
      {
        id: "2",
        name: "Test",
        lat: 43.3,
        lng: 5.5,
      },
      {
        id: "3",
        name: "Trois",
        lat: 43.2,
        lng: 5.6,
      },
    ];
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100%", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyA310OSihYQrxbka1OV0ge8FVwIBQcP1LY",
          }}
          defaultCenter={{
            lat: 43.296482,
            lng: 5.36978,
          }}
          defaultZoom={8}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              text={location.name}
              lat={location.lat}
              lng={location.lng}
            ></Marker>
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

type MarkerProps = { text: string; lat: number; lng: number };

const Marker: FC<MarkerProps> = ({ text }) => {
  const w = 8;
  const h = 8;
  return (
    <Tooltip label={text}>
      <Icon
        color="red.500"
        w={w}
        h={h}
        as={FaMapMarkerAlt}
        left={-w / 2}
        top={-h}
        position="relative"
      />
    </Tooltip>
  );
};

export default UserMap;
