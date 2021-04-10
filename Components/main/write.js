import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Platform,StyleSheet, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ImagePick({navigation}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const gallerystatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (gallerystatus.status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#b0e0e6' }}>
      <View>
        <Text style={{ fontSize: 25 }}>Share Your Experience!</Text>
      </View>
      <TouchableOpacity style={styles.button} title="Pick an image from camera roll" onPress={pickImage} >
        <Text style={{color: "#fff",  fontSize: 20}}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={{ backgroundColor: '#D8F0F3',borderRadius: 20, width: 260, height: 260, justifyContent: 'center', alignItem: 'center'}}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 30 }} />}
      </View>
      <TouchableOpacity style={styles.button} title="Save" onPress={() => navigation.navigate('save', {image})}>
        <Text style={{color: "#fff",  fontSize: 20}}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#5078C8",
    padding: 15,
    width: 250,
    borderRadius: 20,
  },
});