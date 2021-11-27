/**
 * 设备信息，只获取Android和IOS都支持的,(目前不全，按需添加）
 * 详细查看 https://github.com/react-native-device-info/react-native-device-info
 */
export type Device = {
  platform: string;
  applicationName: string; //当前应用名称
  brand: string;
  deviceId: string;
  deviceType: string;
  uniqueId: string;
};
