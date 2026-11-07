import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-init";
import { usuarioConverter } from "../models/Usuario";

const usuariosRef = collection(db, "Usuarios").withConverter(usuarioConverter);

export default function useAuthService() {
  async function cadastrarEmailSenha(usuario) {
    const cred = await createUserWithEmailAndPassword(auth, usuario.email, usuario.senha);
    usuario.id = cred.user.uid;
    await setDoc(doc(usuariosRef, cred.user.uid), usuario);
    await sendEmailVerification(cred.user);
    await signOut(auth);
  }

  async function loginEmailSenha(email, senha) {
    const cred = await signInWithEmailAndPassword(auth, email, senha);
    if (!cred.user.emailVerified) {
      await signOut(auth);
      throw new Error("Verificação de e-mail pendente. Confirme seu e-mail para entrar.");
    }
    const snap = await getDoc(doc(usuariosRef, cred.user.uid));
    return snap.data();
  }

  async function recuperarSenha(email) {
    await sendPasswordResetEmail(auth, email);
  }

  return { cadastrarEmailSenha, loginEmailSenha, recuperarSenha };
}