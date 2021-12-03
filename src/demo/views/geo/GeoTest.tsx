import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet, Platform} from 'react-native';
import {Button, Toast} from '@ant-design/react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

class GeoTest extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      coords: null,
      address: null,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    // 监听扫码页面获取的值
    let {barCodeData} = nextProps.route.params;
    let that = this;
    if (barCodeData && barCodeData.typeValue && barCodeData.typeName === 'testScan') {
      // console.log('update scan result:', barCodeData);
      that.setState({
        inputValue: barCodeData.typeValue,
      });
    }
  }
  handleScanCheck() {
    this.props.navigation.navigate('BarcodeScan_RN');
  }

  async getGeoLocation() {
    const this_ = this;
    const hasLocationPermission = await this.hasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          this_.setState({
            coords: position.coords,
          });
          this_.queryLocation(position.coords);
        },
        error => {
          // See error code charts below.
          Toast.fail('未打开定位服务:' + error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  queryLocation({longitude, latitude}) {
    const url = `https://restapi.amap.com/v3/geocode/regeo?key=8a330c740ce7997d96bffe83bef562fb&location=${longitude},${latitude}&radius=1000&extensions=base&batch=false&roadlevel=0`;
    axios.get(url).then(response => {
      const result = response.data;
      if (result.infocode === '10000') {
        if (result.regeocode && result.regeocode.formatted_address) {
          this.setState({
            address: result.regeocode.formatted_address,
          });
        }
      }
    });
  }

  async hasLocationPermission() {
    if (Platform.OS === 'ios') {
      const result = await Geolocation.requestAuthorization('whenInUse');
      if (result !== 'granted') {
        Toast.fail('请启用定位服务');
        return false;
      }
    }
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scan_info_box}>
          <Button onPress={() => this.getGeoLocation()}>记录轨迹</Button>
        </View>
        <Text>坐标数据：</Text>
        {this.state.coords && (
          <>
            <Text>经度:{this.state.coords.longitude}</Text>
            <Text>纬度:{this.state.coords.latitude}</Text>
          </>
        )}
        {this.state.address && (
          <>
            <Text>地址:{this.state.address}</Text>
          </>
        )}
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const Height = () => {
  return height;
};

const Width = () => {
  return width;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scan_top_box: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 24,
    height: 24,
  },
  scan_camera: {
    flex: 1,
    height: Height(),
  },
  scan_cont_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scan_cont_circle: {
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scan_circle_init: {
    width: 250,
    height: 1,
    backgroundColor: '#00ff00',
  },
  scan_info_box: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    width: Width(),
  },
  scan_info: {
    color: '#fff',
  },
  info: {
    width: Width(),
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
});

export default GeoTest;
