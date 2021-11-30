import React, {Component} from 'react';
import {Alert} from 'react-native';
import {CameraScreen} from 'react-native-camera-kit';

export default class CameraScreenExample extends Component {
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
    return (
      <CameraScreen
        actions={{rightButtonText: 'Done', leftButtonText: 'Cancel'}}
        onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
        flashImages={{
          on: require('../../assets/camera/flashOn.png'),
          off: require('../../assets/camera/flashOff.png'),
          auto: require('../../assets/camera/flashAuto.png'),
        }}
        cameraFlipImage={require('../../assets/camera/cameraFlipIcon.png')}
        captureButtonImage={require('../../assets/camera/cameraButton.png')}
        torchOnImage={require('../../assets/camera/torchOn.png')}
        torchOffImage={require('../../assets/camera/torchOff.png')}
        showCapturedImageCount
      />
    );
  }
}
