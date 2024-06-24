import appsFlyer from 'react-native-appsflyer';
import {Platform} from 'react-native';

// events
export const AF_viewCart = 'af_view_cart';
export const AF_addedToCart = 'af_added_to_cart';
export const AF_checkout = 'af_check_out';
export const AF_clickOnItem = 'af_click_on_item';
export const AF_clickGetStarted = 'af_click_get_started';

const initOptions = {
  isDebug: true,
  devKey: 'DhSFNQNxkjLkRvaWGdA8Tj',
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: true,
  appId: '123456742',
};

export function AFInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  appsFlyer.setAppInviteOneLinkID('wRLq');

  appsFlyer.initSdk(initOptions, null, null);
}

export const onInstallGCDFailure = appsFlyer.onInstallConversionFailure(res => {
  console.log(JSON.stringify(res, null, 2));
});

export async function AFLogEvent(name, values) {
  await appsFlyer.logEvent(name, values, null, null);
}
