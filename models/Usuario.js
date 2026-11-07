export class Usuario {
  constructor({ id = "", nome = "", email = "", senha = "", telefone = "" } = {}) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.telefone = telefone;
  }
}

export const usuarioConverter = {
  toFirestore(usuario) {
    const { senha, id, ...dados } = usuario;
    return dados;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return new Usuario({ id: snapshot.id, ...data });
  },
};