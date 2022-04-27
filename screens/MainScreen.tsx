import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationProp, ParamListBase} from '@react-navigation/native';


type Props = {
    navigation: NavigationProp<ParamListBase> //TODO proveriti ovo
}

const MainScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>MainScreen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({})