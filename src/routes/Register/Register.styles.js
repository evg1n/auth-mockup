import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  keyboardAvoidingView: {
    paddingHorizontal: 5,
  },
  title: {
    marginVertical: 10,
    textAlign: "center",
  },
  formContainer: {
    padding: 5,
    justifyContent: "center",
  },
  input: {
    marginBottom: 20,
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginPrompt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default styles;
