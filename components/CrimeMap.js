import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CrimeDataProvider from '../data/CrimeDataProvider';
import CrimeCircle from './CrimeCircle';
import CrimeTriangle from './CrimeTriangle';

const CrimeMap = () => {
  const [mode, setMode] = useState('history'); // 'history' or 'forecast'
  const [days, setDays] = useState(7); // Day range
  const [selectedForecast, setSelectedForecast] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 41.9180,
    longitude: -87.7640,
  });

  const handleLocationChange = (field, value) => {
    setCurrentLocation((prevLocation) => ({
      ...prevLocation,
      [field]: parseFloat(value),
    }));
  };

  const handleDaysChange = (daysRange) => {
    setDays(daysRange);
  };

  const historicalEvents = CrimeDataProvider.getHistoricalEvents(days);
  const forecastPoints = CrimeDataProvider.getForecastedPoints(days);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        {/* Render historical markers */}
        {mode === 'history' &&
          historicalEvents.map((event, idx) => (
            <CrimeTriangle
              key={idx}
              event={event}
              onPress={(e) => setSelectedForecast(e)} // Reuse the popup state to display event details
            />
          ))}

        {/* Render forecast circles */}
        {mode === 'forecast' &&
          forecastPoints.map((fc, idx) => (
            <CrimeCircle
              key={idx}
              forecast={fc}
              onPress={() => setSelectedForecast(fc)}
            />
          ))}
      </MapView>

      {/* Location editor at top */}
      <View style={styles.locationInputContainer}>
        <Text>Current Location (Lat/Lon):</Text>
        <TextInput
          style={styles.locationInput}
          value={currentLocation.latitude.toString()}
          keyboardType="numeric"
          onChangeText={(text) => handleLocationChange('latitude', text)}
        />
        <TextInput
          style={styles.locationInput}
          value={currentLocation.longitude.toString()}
          keyboardType="numeric"
          onChangeText={(text) => handleLocationChange('longitude', text)}
        />
      </View>

      {/* Forecast info display */}
{selectedForecast && (
  <View style={styles.forecastInfo}>
    <Text style={styles.title}>
      {selectedForecast.crimes ? 'Forecast Details' : 'Crime Event'}
    </Text>
    <Text style={styles.text}>
      Lat: {selectedForecast.lat.toFixed(4)}, Lon: {selectedForecast.lon.toFixed(4)}
    </Text>
    {selectedForecast.crimes ? (
      Object.entries(selectedForecast.crimes).map(([crime, prob]) => (
        <Text key={crime} style={styles.text}>
          {crime}: {prob.toFixed(2)}
        </Text>
      ))
    ) : (
      <>
        <Text style={styles.text}>Type: {selectedForecast.type}</Text>
        <Text style={styles.text}>Date: {selectedForecast.date}</Text>
      </>
    )}
  </View>
)}

      {/* Toggle mode buttons */}
      <View style={styles.controls}>
        <Button title="History" onPress={() => setMode('history')} />
        <Button title="Forecast" onPress={() => setMode('forecast')} />
      </View>

      {/* Date range buttons */}
      <View style={styles.dateControls}>
        <Button title="Last 30 days" onPress={() => handleDaysChange(30)} />
        <Button title="Last 7 days" onPress={() => handleDaysChange(7)} />
        <Button title="Last 3 days" onPress={() => handleDaysChange(3)} />
        <Button title="Last 1 day" onPress={() => handleDaysChange(1)} />
      </View>

      {/* Forecast day buttons */}
      {mode === 'forecast' && (
        <View style={styles.dateControls}>
          <Button title="Forecast 1 day" onPress={() => setDays(1)} />
          <Button title="Forecast 3 days" onPress={() => setDays(3)} />
          <Button title="Forecast 7 days" onPress={() => setDays(7)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  controls: {
    position: 'absolute',
    bottom: 80,
    backgroundColor: '#fff',
    padding: 10,
    width: '100%',
  },
  dateControls: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  locationInputContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    zIndex: 2,
  },
  locationInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    paddingLeft: 5,
  },
  forecastInfo: {
    position: 'absolute',
    top: 120,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    elevation: 5,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
});

export default CrimeMap;