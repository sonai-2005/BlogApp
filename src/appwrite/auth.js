import conf from "../conf/conf";
import { Client, ID, Account } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);

    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) { return this.login({email,password}) }
            else { return  userAccount;}

        } catch (error) {
            console.log("account creation failed::createAccount" + error);
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.log("log in failed:: ", error)
            throw error;
        }
    }

    async getCurrentUser() {
        try {
    return await this.account.get(); // ✅ this fetches the logged-in user's data
  } catch (error) {
    console.log("Appwrite service :: getCurrentUser :: error", error);
    return null; // ✅ this avoids crashing if user is not logged in
  }
    }

    async logout() {
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.error("error log out : " + error);
        }
    }
}

const authService = new Authservice();
export default authService;