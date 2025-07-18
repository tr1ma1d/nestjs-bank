interface LoginResponse extends Pick<IUser, 'phone' | 'email' | 'password'>{}

interface RegisterResponse extends Omit<IUser, 'id' | 'createdAt'>{}

interface LoginRequest extends Pick<IUser, 'phone' | 'email' | 'password'>{}

interface RegisterRequest extends Omit<IUser, 'id' | 'createdAt'>{}