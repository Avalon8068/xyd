// 用来实施错误收集的服务
import * as Sentry from '@sentry/react-native';

const init = () => {
  Sentry.init({dsn: 'https://2595e0d350394195af7475d65d8124b0@o1079898.ingest.sentry.io/6085089', autoInitializeNativeSdk: false});
  Sentry.configureScope(function (scope) {
    scope.setLevel(Sentry.Severity.Error);
  });
};

export {Sentry, init};
