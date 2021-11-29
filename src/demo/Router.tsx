import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createStackNavigator();
import router from './router';
import {Router} from 'types';
import {Route} from '@react-navigation/routers';
import {Button} from '@ant-design/react-native';
import {navigate} from 'common/service/navigation';

const StackNavigator = () => {
  //从子导航器获取路由名称
  const getChildTitle = (route: Partial<Route<string>>) => {
    return getFocusedRouteNameFromRoute(route);
  };
  return (
    <Stack.Navigator>
      {router.map((item: Router, index: number) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={({route}) => ({
              title: getChildTitle(route) || item.title,
              headerTitle: getChildTitle(route) || item.title,
              headerStyle: {
                backgroundColor: '#fff',
                height: 40,
              },
              headerTitleStyle: {
                color: '#000',
                fontSize: 15,
              },
              headerRight: () => <Button size="small" type="ghost" onPress={() => navigate('CameraScreen')} />,
              headerShown: item.headerShown && item.headerShown,
            })}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default StackNavigator;
