import React from 'react';
import { StyleSheet, View } from 'react-native';
import CrimeMap from './components/CrimeMap'; // adjust the path if needed

export default function App() {
  return (
    <View style={styles.container}>
      <CrimeMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});