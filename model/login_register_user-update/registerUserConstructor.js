import bcrypt from "bcrypt";

export class UserRegisterConstruct {
  name;
  email;
  password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = this.hashPassword(password);
  }

  hashPassword(password) {
    const saltRounds = 13;
    return bcrypt.hashSync(password, saltRounds);
  }
}
