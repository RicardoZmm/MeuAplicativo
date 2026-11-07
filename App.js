import React, { useEffect, useState } from "react";
import { PaperProvider, ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-init";
import DrawerNavigator from "./navigation/DrawerNavigator";
import LoginStackNavigator from "./navigation/LoginStackNavigator";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUsuario(user && user.emailVerified ? user : null);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  return (
    <PaperProvider>
      <NavigationContainer>
        {usuario ? <DrawerNavigator /> : <LoginStackNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}