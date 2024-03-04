import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { createUser } from "../api/User";

const RegisterPage = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [textColor, setTextColor] = useState("black");

  function checkUser() {
    if (
      email == "" ||
      password1 == "" ||
      password2 == "" ||
      firstName == "" ||
      lastName == "" ||
      username == "" ||
      phoneNumber == ""
    ) {
      setTextColor("#ff5555");
    } else if (password1 != password2) {
      setTextColor("#ff5555");
    } else {
      createUser(username, firstName, lastName, email, phoneNumber, password1);
      navigation.navigate("SignIn");
    }
  }

  return (
    <View style={styles.full}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ flex: 2 }}>
          <TouchableOpacity
            style={{ position: "absolute", top: 24, right: 10 }}
            onPress={() => navigation.navigate("Launch")}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "100" }}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.title}>Welcome back.</Text>
          <Text style={styles.body}>Let's create you an account</Text>
        </View>
        <View style={{ flex: 26 }}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(password1) => setPassword1(password1)}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={(password2) => setPassword2(password2)}
            secureTextEntry={true}
          />
          <Text style={[styles.help2, { color: textColor }]}>
            Invalid User Data.
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.helpContainer,
          { flexDirection: "row", marginTop: -24, marginBottom: 24 },
        ]}
      >
        <Text style={styles.help}>Already have an account? </Text>
        <Text
          style={styles.help1}
          onPress={() => navigation.navigate("SignIn")}
        >
          Sign In
        </Text>
      </View>
      <View>
        <Pressable style={styles.buttonContainer} onPress={checkUser}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  full: {
    height: "100%",
    padding: 30,
    backgroundColor: "black",
  },
  container: {
    height: "90%",
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  helpContainer: {
    alignSelf: "center",
  },
  title: {
    fontSize: 26,
    color: "white",
    paddingBottom: 20,
  },
  body: {
    fontSize: 18,
    color: "white",
  },
  buttonContainer: {
    width: "100%",
    height: 45,
    justifyContent: "space-between",
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  help: {
    alignSelf: "center",
    color: "#6b6b6b",
    fontSize: 11,
  },
  help1: {
    alignSelf: "center",
    color: "white",
    fontSize: 11,
  },
  help2: {
    color: "#6b6b6b",
    fontSize: 11,
    marginLeft: 9,
    marginTop: 4,
  },
  help3: {
    alignSelf: "center",
    color: "white",
    fontSize: 11,
    marginTop: 4,
  },
  input: {
    width: "100%",
    height: 45,
    margin: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#3b3b3b",
    backgroundColor: "#222222",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    color: "white",
    fontSize: 15,
  },
});
export default RegisterPage;
