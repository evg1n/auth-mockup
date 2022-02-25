// Libraries
import React, { Suspense } from "react";
import { initialWindowMetrics } from "react-native-safe-area-context";

// Framework Components
import { NativeRouter, Route, Switch, BackButton } from "react-router-native";
import { View, Text, Dimensions } from "react-native";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
// Custom Components

// Styling
import * as eva from "@eva-design/eva";
import { default as mapping } from "./mapping.json";

import ROUTES from "./src/routes/index.js";
export const App = () => (
  <NativeRouter>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
      <View
        style={{
          height: initialWindowMetrics.insets.top,
        }}
      />
      <Switch>
        {ROUTES.map((route, key) => {
          return (
            <Route
              key={key}
              exact
              path={route.path}
              component={(props) => <route.component {...props} />}
            />
          );
        })}
      </Switch>
    </ApplicationProvider>
    <StatusBar style="auto" />
    <BackButton />
  </NativeRouter>
);

export default App;
