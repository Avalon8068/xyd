import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import RNAliFaceVerify from 'react-native-ali-face-verify';

export default function App() {
  const verify = (url, certifyId) => {
    RNAliFaceVerify.verify(url, certifyId, response => {
      console.log('verify=>', response);
      if (response) {
        // 处理业务逻辑
        console.log('处理业务逻辑...');
      } else {
        console.log('认证失败');
      }
    });
  };
  /**
   * 调用自己后台服务器接口 获取认证需要参数
   */
  const getZimid = (certName: string, certNo: string) => {
    RNAliFaceVerify.getZimFace(
      certName,
      certNo,
      response => {
        console.log('getZimid=>', response);
        let responseJson = JSON.parse(response);
        if (responseJson.code == 200) {
          // 调用刷脸SDK
          verify(responseJson.data.certifyUrl, responseJson.data.certifyId);
        } else {
          console.log('===err===', response.message);
        }
      },
      error => {
        console.log(error);
      },
    );
  };
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          getZimid('', '');
        }}>
        实人认证
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
