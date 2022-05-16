export class LoginData {
    // can be email address or username, cannot change attribute because of passport-local strategy in backend
    username: string;
    password: string;
}
