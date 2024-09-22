interface Config {
    endpoint: string,
    projectId: string,
    apiKey: string
    user_collection_id?: string
    databaseId?: string
    storageId?: string 
    file_collection_id?: string
}

export const config: Config = {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
    user_collection_id: String(process.env.USER_COLLECTION_ID),
    databaseId: String(process.env.DATABASE_ID),
    storageId: String(process.env.STORAGE_ID),
    file_collection_id: String(process.env.FILES_COLLECTION_ID)
}