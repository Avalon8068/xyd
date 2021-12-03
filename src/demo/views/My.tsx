import * as React from 'react';
import {View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {Props} from 'types';

export default function My(props: Props) {
  return (
    <View>
      <Button onPress={() => props.navigation.navigate('DeviceInfo')}>设备信息</Button>
      <Button onPress={() => props.navigation.navigate('Storage')}>存储信息</Button>
    </View>
  );
}
