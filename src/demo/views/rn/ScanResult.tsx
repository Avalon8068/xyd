import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

class ScanResult extends Component<any, any> {
  constructor(props: any) {
    super(props);
    if (props.route && props.route.params) {
      const {barCodeData} = props.route.params;
      // console.log('initial with value:', barCodeData);
      const {typeValue = ''} = barCodeData;
      this.state = {
        inputValue: typeValue,
      };
    } else {
      this.state = {
        inputValue: '',
      };
    }
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

  render() {
    let {inputValue} = this.state;
    return (
      <View>
        <Text>展示条形码数据：</Text>
        <Text>{inputValue}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleScanCheck()}>
          <Image source={require('../../assets/camera/cameraButton.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ScanResult;
