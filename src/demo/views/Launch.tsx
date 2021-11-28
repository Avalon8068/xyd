import React from 'react';
import {View, StyleSheet} from 'react-native';
import Login from './Login';
import {Props} from 'types';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

class Launch extends React.Component<Props> {
  render() {
    return (
      <View {...this.props} style={styles.container}>
        <Login {...this.props} />
      </View>
    );
  }
}

export default Launch;
