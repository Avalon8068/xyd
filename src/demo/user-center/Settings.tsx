import * as React from 'react';
import {Button, Text, View} from 'react-native';

export default function SettingsScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details Screen</Text>
      <Button title="Go to Details... again" onPress={() => navigation.push('DeviceInfo')} />
    </View>
  );
}
