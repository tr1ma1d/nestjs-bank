interface LoginResponse extends Pick<IUser, 'phone' | 'email' | 'password'>{}

interface RegisterResponse extends Omit<IUser, 'id' | 'createdAt'>{}