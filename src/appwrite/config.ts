interface Config {
    endpoint: string,
    projectId: string,
    apiKey: string
}

export const config: Config = {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
}