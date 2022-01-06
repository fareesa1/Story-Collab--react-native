import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import Constants from 'expo-constants';
import db from './config';
import { Spinner, NativeBaseProvider } from 'native-base';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      code: '',
      status: 'start',
      code_2:"",
      otherPlayer: 'notJoined',
    };
  }

  componentDidMount(){
     const interval = setInterval(() => {
    if(this.state.status=="wait"){
    db.ref("main/"+this.state.code_2+"/").on("value",(data)=>{
      var x = data.val()
      console.log(x.player_2)
      if(x.player_1!="" && x.player_2!=""){
        console.log("navigate")
        this.setState({status:"play"})
      }
    })
    }
  }, 1000);
    
  }

  makeid = (length) => {
    var result = [];
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join('');
  };

  generateCode = () => {
    if(this.state.player_1 == ""){
    var x = this.makeid(5);
    console.log(x);
    console.log(this.state.name);
    db.ref('main/' + x).update({
      player_1: this.state.name,
      code: x,
    });
    this.setState({
      code: x,
      status:"wait"
    });
  }else{
    alert("Enter a valid name")
  }
  }

  read = () => {
    db.ref('main/' + this.state.code).on('value', (data) => {
      var val = data.val();
      if (val.player_2) {
        this.setState({ otherPlayer: 'joined' });
      }
    });
  };

  onSubmit=()=>{
    this.setState({status:"play"})
  }

  submit = () => {
    var x = this.state.code_2;
    var name = this.state.name;
    db.ref('main/' + x).update({
      player_2: name,
    });
    this.setState({otherPlayer:"joined", status:"play"})
  };

  updateDb = () => {};
  showCode = () => {};

  render() {
    console.log(this.state.status)
    if (this.state.code == '' && this.state.status=="start" ) {
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.paragraph}
            placeholder="Enter Name"
            placeholderTextColor="white"
            onChangeText={(x) => {
              this.setState({ name: x });
            }}
          />
          <Button
            color="green"
            onPress={() => {
              console.log('generating...');
              this.generateCode();
            }}
            title="Generate code"
          />
          <Text
            style={[
              styles.paragraph,
              { borderBottomWidth: 0, color: 'white' },
            ]}>
            HAVE CODE ?
          </Text>
          <TextInput
            style={styles.paragraph}
            placeholder="Enter Name"
            placeholderTextColor="white"
            onChangeText={(x) => {
              this.setState({ name: x });
            }}
          />
          <TextInput
            style={styles.paragraph}
            placeholder="Enter Code"
            placeholderTextColor="white"
            onChangeText={(x) => {
              this.setState({ code_2: x });
            }}
          />
          <Button
            color="green"
            onPress={() => {
              this.submit();
            }}
            title="Submit"
          />
        </View>
      );
    } else if (this.state.code != '' && this.state.status=="wait") {
      return (
        <NativeBaseProvider>
          <View style={styles.container}>
            <Text
              style={[
                styles.paragraph,
                {
                  borderBottomWidth: 0,
                  color: 'white',
                  backgroundColor: 'green',
                },
              ]}>
              Generated code is: {this.state.code}
            </Text>
            <Spinner size="lg" color="emerald.500" />
            <Text
              style={[
                styles.paragraph,
                { borderBottomWidth: 0, color: 'white' },
              ]}>
              Waiting for the other player to join
            </Text>
          </View>
        </NativeBaseProvider>
      );
    } else if ( this.state.status=="play") {
      console.log("k")
      return (
        
        <NativeBaseProvider>
          <View style={styles.container}>
            <Text
              style={[
                styles.paragraph,
                {
                  borderBottomWidth: 0,
                  color: 'white',
                  backgroundColor: 'green',
                },
              ]}>
              Generated code is: {this.state.code =="" ? this.state.code_2 :this.state.code }
            </Text>
            <Spinner size="lg" color="emerald.500" />
            <Text
              style={[
                styles.paragraph,
                { borderBottomWidth: 0, color: 'white' },
              ]}>
              done
            </Text>
          </View>
        </NativeBaseProvider>
      );
    } 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    color: 'white',
  },
});
