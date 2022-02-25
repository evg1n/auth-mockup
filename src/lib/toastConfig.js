import {
  InfoToast,
  ErrorToast,
  SuccessToast,
} from "react-native-toast-message";

export const toastConfig = {
  info: (props) => (
    <InfoToast
      {...props}
      text1Style={{ fontSize: 20, fontWeight: "800" }}
      text2Style={{ fontSize: 17, fontWeight: "400" }}
    />
  ),
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{ fontSize: 20, fontWeight: "800" }}
      text2Style={{ fontSize: 17, fontWeight: "400" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 20, fontWeight: "800" }}
      text2Style={{ fontSize: 17, fontWeight: "400" }}
    />
  ),
};

export default toastConfig;
