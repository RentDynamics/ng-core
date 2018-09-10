export class CredentialsModel {

    userId?: string;
    authToken?: string;
    resetPassword?: boolean;
    newPassword?: string;

    constructor(public username: string = null, public password: string = null) {

    }

}
