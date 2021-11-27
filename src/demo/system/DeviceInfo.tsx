import {Button, Text, View, Platform} from 'react-native';
import * as React from 'react';
import DeviceInfo from 'react-native-device-info';
import {Device} from 'common/model/Device';

function loadDeviceInfo(): Device {
  return {
    deviceType: DeviceInfo.getDeviceType(),
    applicationName: DeviceInfo.getApplicationName(),
    brand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    platform: Platform.OS,
    uniqueId: DeviceInfo.getUniqueId(),
  };
}

export default function DetailsScreen({navigation}) {
  const device = loadDeviceInfo();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>DeviceInfo Screen</Text>
      <Text>{JSON.stringify(device)}</Text>
      <Button title="Go to Details... again" onPress={() => navigation.push('Details')} />
    </View>
  );
}
