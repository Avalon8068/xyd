import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import {Image, StyleSheet} from 'react-native';
import {Router} from 'types';

const tabbar: Router[] = [
  {
    name: 'home',
    title: '首页',
    component: require('../views/Home').default,
    icon: require('../assets/img/1.png'),
    selectIcon: require('../assets/img/s1.png'),
  },
  {
    name: 'my',
    title: '我的',
    component: require('../views/My').default,
    icon: require('../assets/img/2.png'),
    selectIcon: require('../assets/img/s2.png'),
  },
];

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      {tabbar.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) => (
                <Image source={focused ? item.selectIcon : item.icon} style={[styles.image]} />
              ),
              title: item.title || item.name,
              headerShown: item.headerShown && item.headerShown,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
  },
});

export default TabNavigator;
