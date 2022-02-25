//Libraries
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-native";
import toastConfig from "../../lib/toastConfig.js";
import styles from "./Login.styles.js";

// Framework Components
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Keyboard,
} from "react-native";
import {
  Button,
  CheckBox,
  Icon,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import Toast from "react-native-toast-message";
// Custom Components
import Divider from "../../components/Divider/Divider.jsx";

// Labels
import { FORM_LOGIN } from "../../lib/labels.js";

// API
import { ENDPOINTS } from "../../lib/api.js";
import { LOGIN_POST } from "../../lib/reqHeaders.js";

const Login = (props) => {
  const history = useHistory();
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrorState] = useState({ email: "", password: "" });

  // Refs
  const passwordRef = useRef();

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const eyeIcon = (props) => {
    return (
      <Icon
        {...props}
        name={secureTextEntry ? "eye-off" : "eye"}
        onPress={() => setsecureTextEntry(!secureTextEntry)}
      />
    );
  };

  const registerIcon = (props) => {
    return <Icon {...props} name="person-add-outline" />;
  };

  const loginIcon = (props) => {
    return <Icon {...props} name="log-in-outline" />;
  };

  const handleLogin = () => {
    setLoading(true);
    setErrorState({ email: "", password: "" });

    fetch(ENDPOINTS.login, {
      method: "POST",
      headers: { ...LOGIN_POST },
      body: JSON.stringify({ ...form }),
    })
      .then((res) => {
        setLoading(false);
        console.log("LOGIN RES", res);
        if (!res.ok) {
          return res.json().then((json) => {
            if (json.errors) {
              let errs = errors;
              json.errors.forEach((error) => (errs[error.param] = error.msg));
              setErrorState({ ...errs });
              Toast.show({
                type: "error",
                text1: "Check Inputs",
                text2: "One or more fields are incorrect.",
              });
            } else {
              return Toast.show({
                type: "error",
                text1: "Login Failed",
                text2: json,
              });
            }
          });
        }
        return res.json().then((json) => {
          console.log("LOGIN RES:", json);
        });
      })
      .catch((err) => {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: "Unknown error occured.",
        });
      });
  };

  return (
    <Layout style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.KeyboardAvoidingView}
      >
        <View style={styles.formContainer}>
          <View>
            <Text category="h4" style={styles.title}>
              {FORM_LOGIN.title}
            </Text>
          </View>
          <Input
            autoCapitalize="none"
            blurOnSubmit={false}
            caption={errors.email ? errors.email : FORM_LOGIN.captions.email}
            clearButtonMode="while-editing"
            disabled={loading}
            keyboardType="email-address"
            label={() => (
              <Text category="label" style={{ marginBottom: 5 }}>
                {FORM_LOGIN.labels.email}
              </Text>
            )}
            onChange={() => setErrorState({ ...errors, email: "" })}
            onChangeText={(input) => setForm({ ...form, email: input })}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder={FORM_LOGIN.placeholders.email}
            returnKeyType="next"
            status={errors.password ? "danger" : "basic"}
            style={styles.input}
            textContentType="emailAddress"
            value={form.email}
          />
          <Input
            accessoryRight={eyeIcon}
            autoCapitalize="none"
            autoCorrect={false}
            blurOnSubmit={false}
            caption={
              errors.password ? errors.password : FORM_LOGIN.captions.password
            }
            disabled={loading}
            keyboardType="default"
            label={() => (
              <Text category="label" style={{ marginBottom: 5 }}>
                {FORM_LOGIN.labels.password}
              </Text>
            )}
            onChangeText={(input) => setForm({ ...form, password: input })}
            onChange={() => setErrorState({ ...errors, password: "" })}
            onSubmitEditing={handleLogin}
            passwordRules="minlength: 8; required: lower; required: upper; required: digit;"
            placeholder={FORM_LOGIN.placeholders.password}
            ref={passwordRef}
            returnKeyType="done"
            secureTextEntry={secureTextEntry}
            status={errors.password ? "danger" : "basic"}
            textContentType="password"
            value={form.password}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CheckBox
              disabled={loading}
              checked={form.acceptTerms}
              onChange={(checked) => setForm({ ...form, acceptTerms: checked })}
              children={() => (
                <Text category="c1" style={{ marginLeft: 10 }}>
                  {FORM_LOGIN.checkboxes.rememberMe}
                </Text>
              )}
            ></CheckBox>
          </View>
          <Button
            accessoryRight={
              loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                registerIcon
              )
            }
            disabled={loading}
            style={{ marginTop: 10 }}
            onPress={handleLogin}
          >
            {FORM_LOGIN.buttons.register.toUpperCase()}
          </Button>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.loginContainer}>
        <Divider label="or" uppercase />
        <View style={styles.loginPrompt}>
          <Text>{FORM_LOGIN.labels.register} </Text>
          <Button
            disabled={loading}
            accessoryRight={
              loading ? (
                <ActivityIndicator size="small" color="#0000ff" />
              ) : (
                loginIcon
              )
            }
            appearance="ghost"
            onPress={() => {
              setLoading(true);
              setTimeout(() => history.push("/register"));
            }}
          >
            <Text>{FORM_LOGIN.buttons.login.toUpperCase()}</Text>
          </Button>
        </View>
      </View>
      <Toast
        position="top"
        topOffset={20}
        autoHide
        visibilityTime={2500}
        config={toastConfig}
      />
    </Layout>
  );
};

export default Login;
