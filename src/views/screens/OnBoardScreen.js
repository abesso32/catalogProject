/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import appsFlyer from 'react-native-appsflyer';
import {SafeAreaView} from 'react-native-safe-area-context';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';
import {AFInit, AFLogEvent, AF_clickGetStarted} from '../components/Appsflyer';
import useAppContext from '../../hooks/useAppContext';

const OnBoardScreen = ({navigation}) => {
  const {setIsFirstTime, setSelectedCategory} = useAppContext();

  useEffect(() => {
    AFInit();

    const installConversionListener = appsFlyer.onInstallConversionData(res => {
      if (JSON.parse(res.data.is_first_launch) === true) {
        setIsFirstTime(true);
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
    });

    const deepLinkListener = appsFlyer.onDeepLink(res => {
      if (res?.deepLinkStatus !== 'NOT_FOUND') {
        const idCategory = res?.data?.deep_link_sub1;
        setSelectedCategory(Number(idCategory));
        console.log(JSON.stringify(res?.data, null, 2));
      }
    });

    return () => {
      installConversionListener();
      deepLinkListener();
    };
  }, []);

  const getStarted = () => {
    AFLogEvent(AF_clickGetStarted, null);

    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{height: 400}}>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            top: -150,
          }}
          source={require('../../assets/onboardImage.png')}
        />
      </View>
      <View style={style.textContainer}>
        <View>
          <Text style={{fontSize: 32, fontWeight: 'bold', textAlign: 'center'}}>
            Delicious Food
          </Text>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center',
              color: COLORS.grey,
            }}>
            We help you to find best and delicious food
          </Text>
        </View>
        <View style={style.indicatorContainer}>
          <View style={style.currentIndicator} />
          <View style={style.indicator} />
          <View style={style.indicator} />
        </View>
        <PrimaryButton onPress={getStarted} title="Get Started" />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default OnBoardScreen;
