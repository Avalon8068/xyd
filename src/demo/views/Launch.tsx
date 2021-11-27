import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Login from './Login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Launch extends React.Component {
  render() {
    return (
      <View {...this.props} style={styles.container}>
        <Text>Welcome2222</Text>
        <Login />
      </View>
    );
  }
}

export default Launch;
