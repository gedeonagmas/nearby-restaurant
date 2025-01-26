"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet"; // Import Leaflet to use custom icon
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import client from "../lib/apolloClient"; // Import the Apollo Client

// Styled component for the Popup content
const PopupContent = styled.div`
  width: 200px;
  padding: 15px;
  font-family: Arial, sans-serif;
  background-color: green;
  color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

// GraphQL Query to fetch nearby restaurants
const GET_NEARBY_RESTAURANTS = gql`
  query GetNearbyRestaurants(
    $latitude: Float!
    $longitude: Float!
    $radius: Float!
    $rating: Float!
  ) {
    nearbyRestaurants(
      latitude: $latitude
      longitude: $longitude
      radius: $radius
      rating: $rating
    ) {
      id
      name
      latitude
      longitude
      address
      openingHours
      rating
    }
  }
`;

export default function Page() {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [locationError, setLocationError] = useState(null); // State for location error

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ lat: latitude, lng: longitude });

            // Fetch the user's address based on the coordinates
            axios
              .get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              )
              .then((response) => {
                setUserAddress(response.data.display_name);
              });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setLocationError(
                  "Location access denied. Please enable location services."
                );
                break;
              case error.POSITION_UNAVAILABLE:
                setLocationError("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                setLocationError("The request to get your location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                setLocationError("An unknown error occurred.");
                break;
            }
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const [radiusValue, setRadiusValue] = useState(5);
  const [rating, setRating] = useState(0);
  const { data, loading, error } = useQuery(GET_NEARBY_RESTAURANTS, {
    variables: {
      latitude: userLocation?.lat || 0,
      longitude: userLocation?.lng || 0,
      radius: Number(radiusValue),
      rating: Number(rating),
    },
    skip: !userLocation, // Skip query until userLocation is available
    client, // Use the Apollo Client
  });

  if (locationError) {
    return (
      <div className="flex mt-5 w-full items-center justify-center">
        <p>{locationError}</p>
        <button
          onClick={() => setLocationError(null)}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="flex items-center justify-center w-full mt-5">
        Please Enable your location access.
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex w-full mt-5 items-center justify-center">
        Loading restaurants...
      </div>
    );
  if (error)
    return (
      <div className="flex mt-5 w-full items-center text-red-500 justify-center">
        Error loading restaurants: {error.message}
      </div>
    );

  const restaurants = data?.nearbyRestaurants || [];

  // Custom pointer icons for the map markers
  const userIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/ff0000/place-marker.png", // Red icon for user's location
    iconSize: [32, 32], // Size of the pointer
    iconAnchor: [16, 32], // Point of the icon that will be placed at the marker's position
    popupAnchor: [0, -32], // Position of the popup relative to the icon
  });

  const restaurantIcon = new L.Icon({
    iconUrl: "https://img.icons8.com/ios-filled/50/00ff00/place-marker.png", // Green icon for restaurants
    iconSize: [32, 32], // Size of the pointer
    iconAnchor: [16, 32], // Point of the icon that will be placed at the marker's position
    popupAnchor: [0, -32], // Position of the popup relative to the icon
  });

  const ZoomHandler = () => {
    const map = useMap();

    useEffect(() => {
      const adjustRadius = () => {
        const zoomLevel = Number(map.getZoom());
        if (zoomLevel === 6) {
          setRadiusValue(0);
        } else if (zoomLevel === 8 || zoomLevel === 9) {
          setRadiusValue(0.5);
        } else if (zoomLevel === 10 || zoomLevel === 11) {
          setRadiusValue(1);
        } else if (zoomLevel === 12 || zoomLevel === 13) {
          setRadiusValue(3);
        } else if (zoomLevel === 14 || zoomLevel === 15) {
          setRadiusValue(5);
        } else if (zoomLevel === 16 || zoomLevel === 7) {
          setRadiusValue(10);
        } else if (zoomLevel === 18) {
          setRadiusValue(15);
        } else {
          setRadiusValue(1);
        }
      };

      // Attach zoomend event
      map.on("zoomend", adjustRadius);

      // Clean up the event listener on component unmount
      return () => {
        map.off("zoomend", adjustRadius);
      };
    }, [map, rating]);

    return null; // This component doesn't render anything
  };

  return (
    <div className="h-[100vh]">
      <div className="grid grid-cols-1 text-sm md:grid-cols-3 lg:grid-cols-4 w-full items-center gap-4 justify-end bg-[#00aeff] text-white py-3 px-3">
        <p className="self-start flex items-center justify-start mt-2 ">
          Nearby Restaurant's
        </p>

        <p className="self-start flex items-center justify-start mt-2 ">
          Total Restaurants: {restaurants?.length}
        </p>
        <div className="flex text-gray-600 items-center gap-2">
          <p className="text-white"> Filter by distance</p>
          <select
            value={radiusValue}
            className="py-2 px-4 w-44 rounded-lg border border-gray-400"
            onChange={(e) => setRadiusValue(e?.target?.value)}
          >
            <option value={0.5}>0.5 km radius</option>
            <option value={1}>1 km radius</option>
            <option value={3}>3 km radius</option>
            <option value={5}>5 km radius</option>
            <option value={10}>10 km radius</option>
            <option value={15}>15 km radius</option>
          </select>
        </div>

        <div className="flex text-gray-600 items-center gap-2">
          <p className="text-white">Filter by rating</p>
          <select
            value={rating}
            className="py-2 px-4 w-44 rounded-lg border border-gray-400"
            onChange={(e) => setRating(e?.target?.value)}
          >
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>
      </div>
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={13}
        style={{ width: "100%", height: "540px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User's location marker with the red pointer icon */}
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
          <Popup>
            <PopupContent className="flex text-xs flex-col w-72 items-start">
              <h3>Your Location</h3>
              <p className="flexd items-start flex-col justify-start">
                <strong>Address:</strong> {userAddress || "Fetching..."}
              </p>
              <p className="flex items-start gap-2 justify-start">
                <strong>Latitude:</strong> {userLocation.lat}
              </p>
              <p className="flex items-start gap-2 justify-start">
                <strong>Longitude:</strong> {userLocation.lng}
              </p>
            </PopupContent>
          </Popup>
        </Marker>
        <ZoomHandler />
        {/* Markers for nearby restaurants with the green pointer icon */}
        {restaurants?.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
            icon={restaurantIcon}
          >
            <Popup>
              <PopupContent>
                <h3>{restaurant.name}</h3>
                <p>
                  <strong>Address:</strong> {restaurant.address}
                </p>
                <p>Opening Hours: {restaurant?.openingHours}</p>
                <p>Latitude: {restaurant?.latitude}</p>
                <p>Longitude: {restaurant?.longitude}</p>
                <p>Rating: {restaurant?.rating}</p>
              </PopupContent>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
