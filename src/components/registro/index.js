import { Input } from '@rneui/base';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function Registro() {
  return (
    <>
      <View style={styles.image}>
      <Image
        source={require("../../images/tinwork-logo.png")}
        resizeMode="contain"
        style={styles.image} />
      </View>
      <View style={styles.form}>
        <Input />
      </View>
    </>
)
}

const styles = StyleSheet.create({
  image : {
    height: 150,
    width: "100%",
    marginBottom: 20
  }
})
