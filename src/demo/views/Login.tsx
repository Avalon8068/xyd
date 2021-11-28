import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, InputItem} from '@ant-design/react-native';
import {Props} from 'types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class extends React.Component<Props> {
  constructor(props: Readonly<Props> | Props) {
    super(props);
  }

  goHome() {
    this.props.navigation.navigate('Tab', {screen: 'home'});
  }

  render() {
    return (
      <View style={styles.container}>
        <InputItem name="username">用户名</InputItem>
        <InputItem name="password" type="password">
          密码
        </InputItem>
        <Button type="primary" onPress={() => this.goHome()}>
          登录
        </Button>
      </View>
    );
  }
}
