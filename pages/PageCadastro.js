import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import useAuthService from "../services/useAuthService";
import { Usuario } from "../models/Usuario";

export default function PageCadastro({ navigation }) {
  const [usuario, setUsuario] = useState(new Usuario());
  const [loading, setLoading] = useState(false);
  const { cadastrarEmailSenha } = useAuthService();

  async function cadastrar() {
    setLoading(true);
    try {
      await cadastrarEmailSenha(usuario);
      Alert.alert("Sucesso", "Verifique seu e-mail para ativar a conta.");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erro", e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <Card style={{ margin: 16, padding: 16 }}>
        <TextInput
          label="Nome"
          value={usuario.nome}
          onChangeText={(t) => setUsuario({ ...usuario, nome: t })}
        />
        <TextInput
          label="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={usuario.email}
          onChangeText={(t) => setUsuario({ ...usuario, email: t })}
        />
        <TextInput
          label="Telefone"
          keyboardType="phone-pad"
          value={usuario.telefone}
          onChangeText={(t) => setUsuario({ ...usuario, telefone: t })}
        />
        <TextInput
          label="Senha"
          secureTextEntry
          value={usuario.senha}
          onChangeText={(t) => setUsuario({ ...usuario, senha: t })}
        />
        <Button mode="contained" loading={loading} onPress={cadastrar}>
          Cadastrar
        </Button>
      </Card>
    </ScrollView>
  );
}