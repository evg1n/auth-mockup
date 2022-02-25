//Libraries
import React from "react";
import { useHistory } from "react-router-native";
// Framework Components
import { Layout, Button, Text } from "@ui-kitten/components";

import { StyleSheet } from "react-native";

export const Home = () => {
  const history = useHistory();

  return (
    <Layout style={styles.container}>
      <Text category="h1">Heading 1</Text>
      <Text category="h2">Heading 2</Text>
      <Text category="h3">Heading 3</Text>
      <Text category="h4">Heading 4</Text>
      <Text category="h5">Heading 5</Text>
      <Text category="h6">Heading 6</Text>
      <Text category="s1">Subtitle 1</Text>
      <Text category="s2">Subtitle 2</Text>
      <Text category="p2">Paragraph 2</Text>
      <Text category="c1">Caption 1</Text>
      <Text category="c2">Caption 2</Text>
      <Text category="label">Label</Text>
      <Button onPress={() => history.push("/register")}>
        <Text category="p1">REGISTER</Text>
      </Button>
      <Button children="LOGIN" onPress={() => history.push("login")} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 10,
  },
});
export default Home;
