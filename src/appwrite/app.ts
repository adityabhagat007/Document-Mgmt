import { Client, Account, Avatars, Databases, Storage } from "appwrite";
import { config } from "./config";

const client = new Client()
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId); 

const databases = new Databases(client)
const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);


export { client, databases, account, avatars, storage ,}