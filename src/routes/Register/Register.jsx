//Libraries
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-native";
import styles from "./Register.styles.js";
import toastConfig from "../../lib/toastConfig.js";

// Framework Components
import { KeyboardAvoidingView, View } from "react-native";
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
import { FORM_REGISTER } from "../../lib/labels.js";

// API
import { ENDPOINTS } from "../../lib/api.js";
import { REGISTER_POST } from "../../lib/reqHeaders.js";

// Helpers
import {
  acceptTermsLabel,
  registerError,
  registerCustomError,
  registerInputError,
  registerIcon,
  loginIcon,
  activityIndicator,
  registerInputLabel,
  passwordInputLabel,
} from "./Register.helpers.js";

const Register = (props) => {
  const history = useHistory();

  // Refs
  const passwordRef = useRef();

  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrorState] = useState({ email: "", password: "" });
  const [form, setForm] = useState({
    email: "",
    password: "",
    acceptTerms: false,
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

  const submit = () => {
    setLoading(true);
    setErrorState({ email: "", password: "" });
    fetch(ENDPOINTS.register, {
      method: "POST",
      headers: { ...REGISTER_POST },
      body: JSON.stringify({ ...form }),
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          res.json().then((json) => {
            if (json.errors) {
              let errs = errors;
              json.errors.forEach((error) => (errs[error.param] = error.msg));
              setErrorState({ ...errs });
              Toast.show(registerInputError);
            } else {
              let message = registerCustomError(json);
              Toast.show(message);
            }
          });
        } else {
          res
            .json()
            .then((json) => console.log("REGISTER RESPONSE", json))
            .catch((error) => {
              console.error("REGISTER UNH ERR:", error);
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        Toast.show(registerError);
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
              {FORM_REGISTER.title}
            </Text>
          </View>
          <Input
            autoCapitalize="none"
            blurOnSubmit={false}
            caption={errors.email ? errors.email : FORM_REGISTER.captions.email}
            clearButtonMode="while-editing"
            disabled={loading}
            keyboardType="email-address"
            label={registerInputLabel}
            onChangeText={(input) => setForm({ ...form, email: input })}
            onChange={() => setErrorState({ ...errors, email: "" })}
            onSubmitEditing={() => passwordRef.current.focus()}
            placeholder={FORM_REGISTER.placeholders.email}
            returnKeyType="next"
            status={errors.email ? "danger" : "basic"}
            style={styles.input}
            textContentType="emailAddress"
            value={form.email}
          />
          <Input
            accessoryRight={eyeIcon}
            autoCapitalize="none"
            autoCorrect={false}
            caption={
              errors.password
                ? errors.password
                : FORM_REGISTER.captions.password
            }
            clearTextOnFocus={true}
            disabled={loading}
            onChangeText={(input) => setForm({ ...form, password: input })}
            keyboardType="default"
            label={passwordInputLabel}
            onChange={() => setErrorState({ ...errors, password: "" })}
            passwordRules="minlength: 8; required: lower; required: upper; required: digit;"
            placeholder={FORM_REGISTER.placeholders.password}
            ref={passwordRef}
            returnKeyType="done"
            secureTextEntry={secureTextEntry}
            status={errors.password ? "danger" : "basic"}
            textContentType="newPassword"
            value={form.password}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <CheckBox
              status={errors.terms ? "danger" : ""}
              disabled={loading}
              checked={form.acceptTerms}
              onChange={(checked) => setForm({ ...form, acceptTerms: checked })}
              children={acceptTermsLabel}
            />
          </View>
          <Button
            accessoryRight={loading ? activityIndicator : registerIcon}
            disabled={loading}
            style={{ marginTop: 10 }}
            onPress={submit}
          >
            {FORM_REGISTER.buttons.register.toUpperCase()}
          </Button>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.loginContainer}>
        <Divider label="or" uppercase />
        <View style={styles.loginPrompt}>
          <Text>{FORM_REGISTER.labels.alreadyRegistered} </Text>
          <Button
            disabled={loading}
            accessoryRight={loginIcon}
            appearance="ghost"
            onPress={() => {
              setLoading(true);
              setTimeout(() => history.push("/login"));
            }}
          >
            <Text>{FORM_REGISTER.buttons.login.toUpperCase()}</Text>
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

export default Register;
