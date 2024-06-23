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
  devKey: 'whFRBaYoVDiPYmKJ2WGqx6',
  onInstallConversionDataListener: true,
  timeToWaitForATTUserAuthorization: 10,
  onDeepLinkListener: true,
  appId: '123456762',
};

export function AFInit() {
  if (Platform.OS === 'ios') {
    appsFlyer.setCurrentDeviceLanguage('EN');
  }
  //appsFlyer.setAppInviteOneLinkID('QDoA');

  appsFlyer.initSdk(initOptions, null, null);
}

export const onInstallGCDFailure = appsFlyer.onInstallConversionFailure(res => {
  console.log(JSON.stringify(res, null, 2));
});

export async function AFLogEvent(name, values) {
  await appsFlyer.logEvent(name, values, null, null);
}

export const getAfId = async () => {
  return await appsFlyer.getAppsFlyerUID();
};

export const installConversionListener = appsFlyer.onInstallConversionData(
  res => {
    if (JSON.parse(res.data.is_first_launch) === true) {
      if (res.data.af_status === 'Non-organic') {
        var media_source = res.data.media_source;
        var campaign = res.data.campaign;
        console.log(
          'This is first launch and a Non-Organic install. Media source: ' +
            media_source +
            ' Campaign: ' +
            campaign,
        );
      } else if (res.data.af_status === 'Organic') {
        console.log('This is first launch and a Organic Install');
      }
    } else {
      console.log('This is not first launch');
    }
  },
);

export const deepLinkListener = appsFlyer.onDeepLink(res => {
  console.log('RES DEEPLINK', res);
  if (res?.deepLinkStatus !== 'NOT_FOUND') {
    console.log(JSON.stringify(res?.data, null, 2));
  }
});
