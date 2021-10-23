import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import { AppStyles } from "../../AppStyles";

export default function Add() {
  return (
    <View>
      <View >
          <TextInput style={styles.body}
            placeholder="Place"
            onChangeText={() => this.setState({  })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            />
      </View>
      <View >
          <TextInput style={styles.body}
            placeholder=""
            onChangeText={() => this.setState({  })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            />
      </View>
      <View >
          <TextInput style={styles.body}
            placeholder="Night "
            keyboardType='numeric'
            onChangeText={() => this.setState({  })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            />
      </View>
      <View >
          <TextInput style={styles.body}
            placeholder="Place"
            onChangeText={() => this.setState({  })}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            />
      </View>
      <TouchableOpacity
        
        
      >
        <Text>add</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
      }
})
