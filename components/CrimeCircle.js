// components/CrimeCircle.js
import React from 'react';
import { Marker, Circle } from 'react-native-maps';

const getColorFromProb = (prob) => {
  if (prob > 0.7) return 'rgba(255,0,0,0.6)';      // red
  if (prob > 0.3) return 'rgba(255,165,0,0.6)';    // orange
  return 'rgba(255,255,0,0.6)';                    // yellow
};

const CrimeCircle = ({ forecast, onPress }) => {
  const { lat, lon, crimes } = forecast;

  // Compute total probability across all crimes
  const totalProb = Object.values(crimes).reduce((acc, p) => acc + p, 0);
  const fillColor = getColorFromProb(totalProb / Object.keys(crimes).length);

  return (
    <>
      {/* Invisible marker to capture onPress */}
      <Marker
        coordinate={{ latitude: lat, longitude: lon }}
        onPress={() => onPress(forecast)}
        opacity={0}
      />
      <Circle
        center={{ latitude: lat, longitude: lon }}
        radius={50}
        strokeWidth={0}
        fillColor={fillColor}
      />
    </>
  );
};

export default CrimeCircle;
