import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, InputItem} from '@ant-design/react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class extends React.Component {
  render() {
    const title = this.props.title || 'No Title';
    const data = this.props.data || 'No Data';
    return (
      <View style={styles.container}>
        <InputItem name="username">用户名</InputItem>
        <InputItem name="password" type="password">
          密码
        </InputItem>
        <Button type="primary">
          登录
        </Button>
      </View>
    );
  }
}
