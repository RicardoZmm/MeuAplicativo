import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PageLogin from "../pages/PageLogin";
import PageCadastro from "../pages/PageCadastro";

const Stack = createNativeStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PageLogin" component={PageLogin} options={{ title: "Login" }} />
      <Stack.Screen name="PageCadastro" component={PageCadastro} options={{ title: "Cadastro" }} />
    </Stack.Navigator>
  );
}