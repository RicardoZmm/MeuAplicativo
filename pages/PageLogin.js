import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/useAuthService";

export default function PageLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginEmailSenha, recuperarSenha } = useAuthService();

  async function entrar() {
    setLoading(true);
    try {
      await loginEmailSenha(email, senha);
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setLoading(false);
    }
  }

  async function esqueci() {
    try {
      await recuperarSenha(email);
      Alert.alert("Pronto", "Enviamos um e-mail de redefinição.");
    } catch (e) {
      Alert.alert("Erro", e.message);
    }
  }

  return (
    <ScrollView>
      <Card style={{ margin: 16, padding: 16 }}>
        <TextInput
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <Button mode="contained" loading={loading} onPress={entrar}>
          Entrar
        </Button>
        <Button onPress={() => navigation.navigate("PageCadastro")}>
          Criar conta
        </Button>
        <Button onPress={esqueci}>Esqueci minha senha</Button>
      </Card>
    </ScrollView>
  );
}