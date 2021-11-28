import {Router} from 'types';

const router: Router[] = [
  {
    name: 'AntForm', //跳转路径
    title: 'AntForm', //头部展示标题
    component: require('../views/AntForm').default,
    headerShown: true,
  },
];

export default router;
