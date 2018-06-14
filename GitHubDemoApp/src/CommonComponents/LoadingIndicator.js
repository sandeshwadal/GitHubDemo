import React,{Component} from 'react';

import {
    ActivityIndicator,
    View,
    StyleSheet
  } from 'react-native'

export default LoadingIndicator= Comp => ({isLoading,children,...props}) => {
  if(!isLoading){
    return (
      <Comp {...props}>
          {children}
        </Comp>
         
  )
  }
    else{
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" /> 
     </View>     
    )
    }
  

  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    }
  })