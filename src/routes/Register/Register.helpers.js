import { ActivityIndicator } from "react-native";
import { Button, Icon, Text } from "@ui-kitten/components";

import { FORM_REGISTER } from "../../lib/labels.js";
import styles from "./Register.styles.js";

// Toast Messages
export const registerError = {
  type: "error",
  text1: "Registration Failed",
  text2: "Unknown error occured.",
};

export const registerCustomError = (message) => {
  return {
    type: "error",
    text1: "Registration Failed",
    text2: message,
  };
};

export const registerInputError = {
  type: "error",
  text1: "Check Inputs",
  text2: "One or more fields are incorrect.",
};

// Icons
export const registerIcon = (props) => {
  return <Icon {...props} name="person-add-outline" />;
};
export const loginIcon = (props) => {
  return <Icon {...props} name="log-in-outline" />;
};

export const activityIndicator = () => (
  <ActivityIndicator size="small" color="#0000ff" />
);

// Labels
export const registerInputLabel = () => (
  <Text category="label" style={{ marginBottom: 5 }}>
    {FORM_REGISTER.labels.email}
  </Text>
);

export const passwordInputLabel = () => (
  <Text category="label" style={{ marginBottom: 5 }}>
    {FORM_REGISTER.labels.password}
  </Text>
);

export const acceptTermsLabel = () => (
  <Button
    appearance="ghost"
    activeOpacity={1}
    children={() => (
      <Text category="c1" style={styles.underline}>
        {FORM_REGISTER.checkboxes.acceptTerms}
      </Text>
    )}
  ></Button>
);
