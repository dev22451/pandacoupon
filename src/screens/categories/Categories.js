import React, { useEffect } from 'react';
import {
  VStack,
  Box,
  Input,
  theme,
  FlatList,
  HStack,
  Text,
  Spacer,
  IconButton,
  ScrollView,
} from 'native-base';

import I18n from '../../translations/i18n';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/respDimension';
import {TouchableOpacity} from 'react-native';
import {DBAppBar, CategoryFlatList} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import { getCategoryRequest } from '../../redux/slices/categorySlice';

const searchIcon = (
  <Box ml={wp(4)}>
    <Icon
      type="MaterialIcons"
      name="search"
      size={20}
      color={theme.colors.gray}
    />
  </Box>
);

const backIcon = (
  <Icon
    type="MaterialIcons"
    name="arrow-forward-ios"
    size={wp(4)}
    color={theme.colors.black}
  />
);

// const data = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     fullName: 'Saloon & Spa',
//     iconName: 'spa',
//   },
  
// ];

const Categories = ({navigation}) => {
  const dispatch = useDispatch();
  const categoryData = useSelector(state => state.categorySlice.categoryList);

  useEffect(()=>{dispatch(getCategoryRequest())},[])

  return (
    <>
      <DBAppBar
        account
        title="Categories"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      <Input
        w={{
          base: '100%',
          md: '25%',
        }}
        bg="white"
        placeholderTextColor="black"
        InputLeftElement={searchIcon}
        _focus={{borderColor: 'secondary.500'}}
        placeholder={I18n.t('Categories.search')}
      />
      <ScrollView>
        <FlatList
          data={categoryData}
          renderItem={({item}) => <CategoryFlatList item={item} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </>
  );
};

export default Categories;
