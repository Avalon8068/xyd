import * as React from 'react';
import {ScrollView} from 'react-native';
import {Button} from '@ant-design/react-native';
import {Props} from 'types';

export default function Home(props: Props) {
  return (
    <ScrollView>
      <Button onPress={() => props.navigation.navigate('AntForm')}>Antd Mobile RN - From</Button>
    </ScrollView>
  );
}
