import React, {Component} from 'react';
import {Alert} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';
import CheckingScreen from './CheckingScreen';

export default class BarcodeScreenExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: undefined,
      value: undefined,
    };
  }

  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `"${event.type}" Button Pressed`,
      `${captureImages}`,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  render() {
    if (this.state.example) {
      const Screen = this.state.example;
      return <Screen value={this.state.value} />;
    }
    return (
      <CameraScreen
        actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
        onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
        flashImages={{
          on: require('../../assets/camera/flashOn.png'),
          off: require('../../assets/camera/flashOff.png'),
          auto: require('../../assets/camera/flashAuto.png'),
        }}
        scanBarcode
        showFrame
        laserColor="red"
        frameColor="white"
        onReadCode={event => {
          this.setState({example: CheckingScreen, value: event.nativeEvent.codeStringValue});
        }}
        hideControls
      />
    );
  }
}
