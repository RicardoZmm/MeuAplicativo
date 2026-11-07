import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-init";
import PagePerfil from "../pages/PagePerfil";

const Drawer = createDrawerNavigator();

function Sair() {
  return (
    <View style={{ margin: 16 }}>
      <Button mode="contained" onPress={() => signOut(auth)}>Sair</Button>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="PagePerfil" component={PagePerfil} options={{ title: "Perfil" }} />
      <Drawer.Screen name="Sair" component={Sair} />
    </Drawer.Navigator>
  );
}