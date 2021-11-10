import React from 'react';
import {SafeAreaView} from 'react-native';
import {
  Text,
  Button,
  Center,
  useColorMode,
  useColorModeValue,
} from 'native-base';

import styles from './styles';
import AppBar from '../../components/appbar/AppBar';

const Home = ({navigation}) => {
  const {toggleColorMode} = useColorMode();
  return (
    <>
      <AppBar navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <Center flex={1} bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
          <Text fontSize="lg" display="flex" mb={10}>
            The active color mode is{' '}
            <Text bold fontSize="18px">
              {useColorModeValue('Light', 'Dark')}
            </Text>
          </Text>
          <Button onPress={toggleColorMode}>Toggle</Button>
        </Center>
      </SafeAreaView>
    </>
  );
};

export default Home;
