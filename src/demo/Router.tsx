import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
import router from './router';
import {Router} from 'types';
import {Route} from '@react-navigation/routers';
import screens from 'demo/views/amap3d/screens';

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
              headerShown: item.headerShown && item.headerShown,
            })}
          />
        );
      })}
      {Object.keys(screens).map(name => (
        // @ts-ignore
        <Stack.Screen key={name} name={name} component={screens[name]} />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigator;
