import {Router} from 'types';
import DemoNavigator from './DemoNavigator';

const router: Router[] = [
  {
    name: 'Launch', //跳转路径
    title: 'Launch', //头部展示标题
    component: require('../views/Launch').default,
    headerShown: false,
  },
  {
    name: 'Tab', //跳转路径
    title: 'Tab', //头部展示标题
    component: require('./TabNavigator').default,
    headerShown: false,
  },
  //只需要引入非Tabbar页面
  {
    name: 'DeviceInfo', //跳转路径
    title: 'DeviceInfo', //头部展示标题
    component: require('../views/DeviceInfo').default,
  },
  ...DemoNavigator,
];
export default router;
