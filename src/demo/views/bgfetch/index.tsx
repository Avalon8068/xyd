import React, {useEffect, useState, FC} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import BackgroundFetch from 'common/service/bgfetch';

import {Event} from './types';

import {backgroundColor, loadEvents, persistEvents, getTimestamp, styles} from './utils';

import {EventItem, Footer, Header, Notice} from './components';

declare var global: {HermesInternal: null | {}};

type IProps = {
  navigation: any;
};

/// Execute a BackgroundFetch.scheduleTask
///
export const scheduleTask = async (name: string) => {
  try {
    await BackgroundFetch.scheduleTask({
      taskId: name,
      stopOnTerminate: false,
      enableHeadless: true,
      delay: 5000, // milliseconds (5s)
      forceAlarmManager: true, // more precise timing with AlarmManager vs default JobScheduler
      periodic: false, // Fire once only.
    });
  } catch (e) {
    console.warn('[BackgroundFetch] scheduleTask fail', e);
  }
};

const App: FC<IProps> = (props: IProps) => {
  const [enabled, setEnabled] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('unknown');
  const [events, setEvents] = useState([] as Event[]);

  /// [Clear] button-handler.
  ///
  const onClickClear = () => {
    setEvents([]);
    persistEvents([]);
  };

  /// Switch handler in top-toolbar.
  ///
  const onToggleEnabled = async (value: boolean) => {
    try {
      if (value) {
        await BackgroundFetch.start();
      } else {
        await BackgroundFetch.stop();
      }
      setEnabled(value);
      console.warn(`[BackgroundFetch] ${value ? 'start' : 'stop'} success`);
    } catch (e) {
      console.warn(`[BackgroundFetch] ${value ? 'start' : 'stop'} falied`, e);
    }
  };

  /// BackgroundFetch event-handler.
  /// All events from the plugin arrive here, including #scheduleTask events.
  ///
  const onBackgroundFetchEvent = async (taskId: string) => {
    console.log('[BackgroundFetch] Event taskId: ', taskId);

    // Add fetch-event to List
    const events = (await loadEvents<Event[]>()) || [];
    events.unshift({
      isHeadless: false,
      taskId,
      timestamp: getTimestamp(),
    });
    setEvents([...events]);
    persistEvents(events);

    if (taskId === 'react-native-background-fetch') {
      // Test initiating a #scheduleTask when the periodic fetch event is received.
      try {
        //await scheduleTask('com.transistorsoft.customtask');
      } catch (e) {
        console.warn('[BackgroundFetch] scheduleTask falied', e);
      }
    }
    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(taskId);
  };

  const onBackgroundFetchTimeout = async (taskId: string) => {
    // The OS has signalled the end of your available background time.
    // You must stop what you're doing an immediately call .finish(taskId).
    console.log('[BackgroundFetch] TIMEOUT taskId: ', taskId);

    // Required: Signal completion of your task to native code
    // If you fail to do this, the OS can terminate your app
    // or assign battery-blame for consuming too much background-time
    BackgroundFetch.finish(taskId);
  };
  /// Configure BackgroundFetch
  ///
  const init = async () => {
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 1, // <-- minutes (15 is minimum allowed)
        // Android options
        forceAlarmManager: false, // <-- Set true to bypass JobScheduler.
        stopOnTerminate: false,
        enableHeadless: true,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE, // Default
        requiresCharging: false, // Default
        requiresDeviceIdle: false, // Default
        requiresBatteryNotLow: false, // Default
        requiresStorageNotLow: false, // Default
      },
      onBackgroundFetchEvent,
      onBackgroundFetchTimeout,
    );
    console.log('[BackgroundFetch] configure status: ', status);

    // Turn on the enabled switch.
    onToggleEnabled(true);
    // Load the list with persisted events.
    const events = await loadEvents<Event[]>();
    events && setEvents(events);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      <SafeAreaView style={[styles.body, styles.container, styles.flex1]}>
        <Header enabled={enabled} onToggleEnabled={onToggleEnabled} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.paddingLR10, styles.container, styles.wide]}>
          {!events.length && <Notice />}
          {events.map((event, i) => (
            <EventItem key={`${i}:${event.timestamp}`} {...event} />
          ))}
        </ScrollView>
        <Footer onClear={onClickClear} defaultStatus={defaultStatus} />
      </SafeAreaView>
    </>
  );
};

export default App;
