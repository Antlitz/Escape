// @flow
import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import MainText from '../../components/MainText/MainText';
import COLORS from '../../constants/COLORS';
import Label from '../../components/Label/Label';

type Props = {
  onPress: () => void,
};

const UpgradePlan: Props => React.Node = ({onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          ss.container,
          {
            backgroundColor: COLORS.secondPlanColor,
            borderColor: COLORS.planColor,
          },
        ]}>
        <View style={ss.containerInner}>
          <View style={ss.titleWrap}>
            <MainText style={ss.title}>UPGRADE TO</MainText>
            <Label text={'PLUS'} style={{backgroundColor: COLORS.planColor}} />
          </View>
          <MainText style={ss.desc}>
            Experience full loóna effect each {'\n'}
            night! Unlock all exclusive content.{' '}
          </MainText>
        </View>
        <View style={[ss.upgrade, {backgroundColor: COLORS.planColor}]}>
          <MainText style={ss.upgradeText}>UPGRADE</MainText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ss = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  containerInner: {
    flex: 1,
    paddingRight: 18,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  desc: {
    fontSize: 11,
    lineHeight: 16,
  },
  upgrade: {
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 24,
  },
  upgradeText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UpgradePlan;
