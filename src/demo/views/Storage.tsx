import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {Button, Toast, ListView} from '@ant-design/react-native';
import storage from 'common/service/storage';

class Storage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      results: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const ids: string[] = await storage.getIdsForKey('rnd');
    storage.getBatchDataWithIds({key: 'rnd', ids}).then(value => {
      if (value) {
        console.log(value);
        this.setState({
          loaded: true,
          results: value.map((v, index) => {
            return {
              id: ids[index],
              value: v,
            };
          }),
        });
      }
    });
  }

  async insertRandomValue() {
    const id = Math.random();
    const value = `${id}_value`;
    this.setState({
      loaded: false,
    });
    storage
      .save({key: 'rnd', id: `${id}`, data: value})
      .then(() => {
        Toast.info('插入成功');
        this.loadData();
      })
      .catch(reason => {
        Toast.fail(reason);
        this.setState({
          loaded: true,
        });
      });
  }
  onFetch = async (page = 1, startFetch, abortFetch) => {
    try {
      startFetch(this.state.results, 30);
    } catch (err) {
      abortFetch(); //manually stop the refresh or pagination if it encounters network error
    }
  };

  removeById(id: string) {
    this.setState({
      loaded: false,
    });
    storage
      .remove({key: 'rnd', id})
      .then(() => {
        Toast.info('删除成功');
        this.loadData();
      })
      .catch(reason => {
        Toast.fail(reason);
        this.setState({
          loaded: true,
        });
      });
  }

  renderItem = item => {
    return (
      <View style={{padding: 10}}>
        <Text>
          {item.value} <Button type={'warning'} onPress={() => this.removeById(item.id)}>删除</Button>
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scan_info_box}>
          <Button onPress={() => this.insertRandomValue()}>插入随机值</Button>
        </View>
        <Text>数据：</Text>
        {this.state.loaded && (
          <ListView keyExtractor={(item, index) => `${item.id}`} onFetch={this.onFetch} renderItem={this.renderItem} />
        )}
      </View>
    );
  }
}

const {width, height} = Dimensions.get('window');

const Height = () => {
  return height;
};

const Width = () => {
  return width;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scan_top_box: {
    position: 'absolute',
    left: 20,
    top: 20,
    width: 24,
    height: 24,
  },
  scan_camera: {
    flex: 1,
    height: Height(),
  },
  scan_cont_box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scan_cont_circle: {
    width: 260,
    height: 260,
    borderWidth: 1,
    borderColor: '#919191',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  scan_circle_init: {
    width: 250,
    height: 1,
    backgroundColor: '#00ff00',
  },
  scan_info_box: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    width: Width(),
  },
  scan_info: {
    color: '#fff',
  },
  info: {
    width: Width(),
    height: 80,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'space-around',
  },
});

export default Storage;
