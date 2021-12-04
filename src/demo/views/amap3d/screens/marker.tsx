import * as React from 'react';
import {MapView, Marker} from 'react-native-amap3d';
import {Toast} from '@ant-design/react-native';

export default () => (
  <MapView>
    <Marker
      draggable
      position={{latitude: 39.806901, longitude: 116.397972}}
      icon={require('../images/flag.png')}
      onPress={() => Toast.info('onPress')}
      onDragEnd={({nativeEvent}) => Toast.info(`onDragEnd: ${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
    />
  </MapView>
);
