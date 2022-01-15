import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default HomeScreen = () => {
  const [elements, setElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idx, icr] = useState(0);
  const [text, onChangeText] = useState();
  const [data, setData] = useState();

  useEffect(async () => {
    axios
      .get("https://coffee.alexflipnote.dev/random.json")
      .then((response) => {
        setData(response.data.file);
      });
  }, [idx]);

  const addElements = (e) => {
    icr(idx + 1);
    const element = { id: idx, name: text, url: data };
    setElements([...elements, element]);
    onChangeText();
    setIsLoading(true);
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        value={text}
        placeholder="Quoi de neuf ?"
        onChangeText={onChangeText}
      />
      <Text onPress={addElements} style={styles.appButtonText}>
        Publier
      </Text>
      <ScrollView style={styles.scrollView}>
        {isLoading ? (
          elements.map((element) => (
            <View style={styles.line1} key={element.id}>
              <Text style={styles.resultat}>{element.name}</Text>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: element.url,
                }}
              />
            </View>
          ))
        ) : (
          <Text></Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: width,
    height: height / 3,
  },
  logo: {
    width: 66,
    height: 58,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    marginTop: 30,
  },
  scrollView: {
    marginHorizontal: 20,
    marginTop: 20,
    fontFamily: "Avenir",
  },
  resultat: {
    fontSize: 20,
    padding: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-end",
    textTransform: "uppercase",
    paddingRight: 20,
  },
});
