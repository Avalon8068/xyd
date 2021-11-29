import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, InputItem, Toast} from '@ant-design/react-native';
import {Props} from 'types';
import storage from 'common/service/storage';
import {post} from 'common/service/axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
  }

  // 生命周期挂载阶段
  componentDidMount() {
    storage.load({key: 'userName'}).then(userName => {
      this.handleChange('username', userName);
    });
  }

  // 表单值变化回调
  handleChange(key: string, value: any) {
    this.setState((prevState: any) => {
      return {
        user: {
          ...prevState.user,
          [key]: value,
        },
      };
    });
  }

  async login() {
    try {
      let data = await post('/login', this.state.user);
      if (data && data.token) {
        await storage.save({key: 'userName', data: this.state.user.username});
        await storage.save({key: 'token', data: data.token});
        this.props.navigation.navigate('Tab', {screen: 'home'});
      } else {
        Toast.fail('登录失败', 1);
      }
    } catch (error: any) {
      Toast.fail(error.message, 1);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <InputItem
          name="username"
          onChange={(value: any) => {
            this.handleChange('username', value);
          }}
          value={this.state.user.username}>
          用户名
        </InputItem>
        <InputItem
          name="password"
          type="password"
          onChange={(value: any) => {
            this.handleChange('password', value);
          }}>
          密码
        </InputItem>
        <Button type="primary" onPress={() => this.login()}>
          登录
        </Button>
      </View>
    );
  }
}
