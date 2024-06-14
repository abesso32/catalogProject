import appsFlyer from 'react-native-appsflyer';
import {Platform} from 'react-native';
import Config from 'react-native-config';

// events
export const AF_viewCart = 'af_view_cart';
export const AF_addedToCart = 'af_added_to_cart';
export const AF_checkout = 'af_check_out';
export const AF_clickOnItem = 'af_click_on_item';
export const AF_clickGetStarted = 'af_click_get_started';

const initOptions = {
  isDebug: true,
  devKey: 'your_dev_key',
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: true,
  appId: 'your_app_id',
};

export function AFInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  appsFlyer.setAppInviteOneLinkID('QDoA');

  appsFlyer.initSdk(initOptions, null, null);
}

export async function AFLogEvent(name, values) {
  await appsFlyer.logEvent(name, values, null, null);
}
