import React from 'react';
import {FlatList, VStack} from 'native-base';

import {hp, wp} from '../../helpers/respDimension';
import {CardComponent, DBAppBar} from '../../components';

const Redeem = ({navigation}) => {
  return (
    <>
      <DBAppBar
        title="Redeem history"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <VStack alignItems="center" width={wp(100)}>
        <FlatList
          keyExtractor={item => item.id}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <CardComponent item={item} />}
          contentContainerStyle={{marginTop: hp(2)}}
        />
      </VStack>
    </>
  );
};

export default Redeem;
