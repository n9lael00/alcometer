import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [time, setTime] = useState(1);
  const [bottles, setBottles] = useState(1 * 0.33);
  const [alcoholLevel, setAlcoholLevel] = useState(0);

  function calculate() {
    let result = 0;
    let grams = bottles * 8 * 4.5
    let burning = weight / 10;
    grams = grams - burning * time;

    if (gender === "male") {
      result = grams / (weight * 0.7);
    } 
    else {    
      result = grams / (weight * 0.6);
    }
    
    if (result < 0) {
      result = 0;
    }
    setAlcoholLevel(result);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.otsikko}>Alcometer</Text>

      <View style="field" paddingTop={20}>
        <Text>Weight</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter weight"
        value={weight} onChangeText={text => setWeight(text)}
        ></TextInput>
      </View>

      <View style={styles.field, {zIndex: 6000}} paddingTop={20}>
        <Text>Bottles</Text>
        <DropDownPicker items={[
          { label: "1 bottle", value: 1 * 0.33},
          { label: "2 bottles", value: 2 * 0.33 },
          { label: "3 bottles", value: 3 * 0.33 },
          { label: "4 bottles", value: 4 * 0.33 },
          { label: "5 bottles", value: 5 * 0.33},
          { label: "6 bottles", value: 6 * 0.33},
          { label: "8 bottles", value: 7 * 0.33},
          { label: "9 bottles", value: 7 * 0.33},
          { label: "10 bottles", value: 7 * 0.33}
        ]}
          containerStyle={{ height: 40 }}
          defaultValue={bottles}
          onChangeItem={item => setBottles(item.value)}
          dropDownStyle={{backgroundColor: '#ffe8ed'}}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000',
        }}
        ></DropDownPicker>
      </View>

      <View style={styles.field, {zIndex: 5000}} paddingTop={20}>
        <Text>Time</Text>
        <DropDownPicker items={[
          { label: "1 hour", value: 1 },
          { label: "2 hours", value: 2 },
          { label: "3 hours", value: 3 },
          { label: "4 hours", value: 4 },
          { label: "5 hours", value: 5 },
          { label: "6 hours", value: 6 }
        ]}
          containerStyle={{ height: 40 }}
          defaultValue={time}
          onChangeItem={item => setTime(item.value)}
          dropDownStyle={{backgroundColor: '#ffe8ed'}}
          labelStyle={{
            fontSize: 14,
            textAlign: 'left',
            color: '#000',
        }}
        ></DropDownPicker>
      </View>

      <View style="field" paddingTop={20}>
        <Text>Gender</Text>
        <RadioForm radio_props={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" }
        ]}
        onPress={(value) => {setGender(value)}}
        buttonColor={'#e3a6b5'}
        labelColor={'#9c757e'}
        selectedButtonColor={"#e3a6b5"}
        ></RadioForm>
      </View>

      <View style="field" paddingTop={20}>
        <Text>Promilles:</Text>
        <Text>{alcoholLevel.toFixed(2)}</Text>
        <Button onPress={calculate}
        title="Calculate"
        color="#9c757e">         
        </Button>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    marginRight: 20,
    marginLeft: 10,
  },
  otsikko: {
    fontSize: 20,
    color: "#9c757e",
  }
  
});
