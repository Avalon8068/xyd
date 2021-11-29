import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions, Text} from 'react-native';
import RootSiblings from 'react-native-root-siblings';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let sibling = null;
let tip;
let loadingStatus = false;

const Loading = {
  // 显示菊花
  show: (title = '加载中...') => {
    // 防止显示两个菊花
    if (sibling) {
      // 销毁
      sibling.destroy();
      loadingStatus = false;
    }
    // new新对象
    sibling = new RootSiblings(
      (
        <View style={styles.maskStyle}>
          <View style={styles.backViewStyle}>
            <ActivityIndicator size="small" color="white" />
            <Text style={{color: '#fff', textAlign: 'center', marginTop: 10}}>{title}</Text>
          </View>
        </View>
      ),
    );
    // 记录状态
    loadingStatus = true;
    // 设置超时时间
    setTimeout(() => {
      // 隐藏
      Loading.hidden();
    }, 30000);
  },
  // 显示文字，2后自动隐藏
  showText: (title = '加载中...') => {
    // 防止显示两个菊花
    if (sibling) {
      // 销毁
      sibling.destroy();
      loadingStatus = false;
    }
    // new新对象
    sibling = new RootSiblings(
      (
        <View style={styles.maskStyle}>
          <View style={styles.backViewStyle}>
            <ActivityIndicator size="small" color="white" />
            <Text style={{color: '#fff', textAlign: 'center', marginTop: 10}}>{title}</Text>
          </View>
        </View>
      ),
    );
    // 记录状态
    loadingStatus = true;
    // 设置超时时间
    setTimeout(() => {
      // 隐藏
      Loading.hidden();
    }, 2000);
  },
  // 隐藏
  hidden: () => {
    if (sibling instanceof RootSiblings) {
      if (tip !== undefined) {
        tip.close();
      }
      // 销毁
      sibling.destroy();
    }
    // 记录状态
    loadingStatus = false;
  },
  // 获取状态
  isLoading: () => {
    return loadingStatus;
  },
};

const styles = StyleSheet.create({
  maskStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backViewStyle: {
    backgroundColor: '#404040',
    width: 100,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export {Loading};
