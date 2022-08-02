export async function findUserName(username: string): Promise<any> {
  console.log("username", username)
  //Se estaba enviando un null siempre, entonces al querer recuperar un usuario
  //No le enviaba nada, y por eso se daba el error 
  return {
    id: 'asdsafdasfaf',
    userId: 'qwqeqrettqrtqt',
    email: {id: 'mnaskjasas', value: username},
    password: 'sfsffsdffsf',
    lastAccess: new Date(),
  }
}
