import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainPage from './src/ui/pages/MainPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import storyReducer from './src/state/Reducers';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={createStore(storyReducer)}>
        <MainPage />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
