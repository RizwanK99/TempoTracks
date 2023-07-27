import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: 'black'
  },
  full: {
    backgroundColor: 'black',
    height: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: 'black',
    marginHorizontal: 20,
    height: "100%"
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  welcome: {
    width: "100%",
    color: 'grey',
    fontSize: 12,
    textTransform: "uppercase"
  },
  progressContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#222222",
    padding: 10,
    borderRadius: 10,
  },
  historyText: {
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  box: {
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  btn_box: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 2,
    alignContent: "center",
  },
  startButton: {
    backgroundColor: "#09bc8a",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    width: 100,
    height: 30,
    justifyContent: "center"
  },
  startButtonContainer: {
    justifyContent: "center",
    textAlign: "center",
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#004346",
    margin: 10,
    height: 30,
    width: 30,
    textAlign: "center",
  },
});