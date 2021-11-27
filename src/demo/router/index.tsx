const router = [
  {
    name: 'Launch', //跳转路径
    title: 'Launch', //头部展示标题
    component: require('../views/Launch'),
  },
  {
    name: 'Tab', //跳转路径
    title: 'Tab', //头部展示标题
    component: require('./TabNavigator').default,
  },
  //只需要引入非Tabbar页面
];
export default router;
