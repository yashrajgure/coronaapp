import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Dimensions, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import axios from 'axios';
export default function App() {

  const [info,setInfo] = useState({})

  const [country,setCountry]= useState('')
  
  const [newCountry,setNewCountry] = useState('world')

  const buttonHandler = () => {
    setNewCountry(country);
    Keyboard.dismiss();
  }

  useEffect( () => {
      axios
          .get(`https://corona.lmao.ninja/countries/${newCountry}`)
          .then(res => {
              console.log(res)
              setInfo(res.data)
          })
          .catch(err => {
              console.log(err)
          })
  }, [newCountry])

  return (
    <TouchableWithoutFeedback onPress={()=> {
      Keyboard.dismiss();
    }}>
      <ImageBackground source={require('./assets/a1.png')} style={styles.container}>
        <TextInput 
          placeholder= 'Enter Country'
          style={styles.input}
          onChangeText= { val => setCountry(val)}/>
        <TouchableHighlight 
          style={styles.button} 
          underlayColor= 'coral'
          activeOpacity={0.7}
          onPress={ () => buttonHandler() }>
          <Text style={styles.buttonText}>CHECK</Text>
        </TouchableHighlight>
        <View style={styles.output}>
          <Text style={styles.head}>Country:</Text>
          <Text style={styles.text}>{ info.country }</Text>
          <Text style={styles.head}>Total Cases:</Text>
          <Text style={styles.text}>{ info.cases }</Text>
          <Text style={styles.head}>Active Cases:</Text>
          <Text style={styles.text}>{ info.active }</Text>
          <Text style={styles.head}>Deaths:</Text>
          <Text style={styles.text}>{ info.deaths }</Text>
          <Text style={styles.head}>Recovered:</Text>
          <Text style={styles.text}>{ info.recovered }</Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    position: 'absolute',
    left:0,
    top:0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height+100,
  },
  input:{
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 10,
    margin: 20,
    width: 300,
    height: 60,
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: '#3A3838',
  },
  output:{
    marginTop: 40,
    padding : 30,
    fontSize: 20,
    backgroundColor: '#3A3838',
    borderRadius: 30,
  },
  head:{
    fontSize:24,
    alignSelf:'center',
    fontWeight:'bold',
    color: 'white',
  },
  text:{
    fontSize:20,
    alignSelf:'center',
    fontWeight:'bold',
    color: 'coral',
  },
  button:{
    borderWidth: 3,
    borderRadius: 50,
    borderColor: 'white',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    width: 150,
    height: 50,
    backgroundColor: 'white',
    shadowColor: '#3A3838',
  },
  buttonText:{
    fontSize:20,
    alignSelf:'center',
    fontWeight:'bold',
    justifyContent:"center",
  },
});
