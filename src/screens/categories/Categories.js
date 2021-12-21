import React, { useState, useEffect, useCallback } from 'react';
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
import { wp } from '../../helpers/respDimension';
import { TouchableOpacity, View, ActivityIndicator} from 'react-native';
import { DBAppBar, CategoryFlatList, Loader } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryRequest,updateCategoryRequest } from '../../redux/slices/categorySlice';
//import {Loader} from '../../../components';

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


const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  //const [fetchingStatus,setfetchingStatus] = useState(false)
  // console.log(page);

//  const BottomView = () => {
//     return (
//       <View>
//         {
//           (fetchingStatus)
//             ?
//             <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 6 }} />
//             :
//             null
//         }
//       </View>
//     )
//   }

  const { categoryList, isLoading } = useSelector(state => state.categorySlice);
  //  console.log(categoryList,'fgeufg');
  const handleLoadMore = useCallback(
    () => {
      if(!isLoading){
         setPage(page + 1)
        dispatch(updateCategoryRequest(page))
      }
    }
    ,[dispatch,setPage])
  
  useEffect(() => { dispatch(getCategoryRequest()) }, [])

  return (
    <>
      <DBAppBar
        //account
        back
        onBackPress={() => { console.log('call') }}
        title="Categories"
        iconColor="white"
        titleColor="white"
        bgColor="secondary.500"
        navigation={navigation}
      />
      {/* <Input
        w={{
          base: '100%',
          md: '25%',
        }}
        bg="white"
        placeholderTextColor="black"
        InputLeftElement={searchIcon}
        _focus={{borderColor: 'secondary.500'}}
        placeholder={I18n.t('Categories.search')}
      /> */}
      {isLoading ? (
        <Loader />
      ) : (
          <FlatList
            data={categoryList}
            renderItem={({ item }) => <CategoryFlatList item={item} navigation={navigation} />}
            keyExtractor={item => item._id}
            onEndReached={() => handleLoadMore()}
            refreshing={isLoading}
            onEndReachedThreshold={0.5}
            //ListFooterComponent={BottomView}
          />
      )}
    </>
  );
};

export default Categories;
