//Libraries
import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const Divider = (props) => {
  const { color, width, label, uppercase } = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.line,
          borderColor: color,
          borderWidth: width,
        }}
      />
      {props.label ? (
        <>
          <Text style={{ color: color || "gray" }}>
            {uppercase ? label.toUpperCase() : label}
          </Text>
          <View
            style={{
              ...styles.line,
              borderColor: color,
              borderWidth: width,
            }}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    height: 20,
  },
  line: {
    flex: 1,
    height: 1,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
  },
});

Divider.defaultProps = {
  width: 0.5,
  color: "lightgray",
  label: "",
  uppercase: false,
};

Divider.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
  label: PropTypes.string,
  uppercase: PropTypes.bool,
};
export default Divider;
