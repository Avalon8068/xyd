import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@ant-design/react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => {}}>实人认证</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
