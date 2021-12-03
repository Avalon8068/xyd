ANT MOBILE RN
peer dependency:
@react-native-community/cameraroll
@react-native-picker/picker
@react-native-community/segmented-control
@react-native-community/slider
react-native-pager-view
react-native-gesture-handler

@react-navigation/native
peer dependency:
react-native-screens
react-native-safe-area-context





添加axios库，demo-server 模拟登录请求，

1.进入demo-server, 执行npm install后启动服务，执行npm start
2.增加.env.local--》从.env复制，修改具体变量值，使用本地ip地址，不要使用localhost或127.0.0.1

参考文档
1.@react-navigation/native
https://reactnavigation.org/docs/getting-started/
2.ANT MOBILE RN
https://rn.mobile.ant.design/docs/react/introduce-cn
3.expo-camera
https://docs.expo.dev/versions/v43.0.0/sdk/camera


#android，编译 react-native-background-fetch 需要手动修改 node_modules/react-native-background-fetch/android/build.gradle文件
----
implementation(group: 'com.transistorsoft', name:'tsbackgroundfetch', version: '+')
----
这行注释掉，添加下面这行
implementation files('libs/com/transistorsoft/tsbackgroundfetch/0.5.4/tsbackgroundfetch-0.5.4.aar')


