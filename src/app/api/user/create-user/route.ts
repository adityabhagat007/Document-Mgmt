import { account, databases } from "@/appwrite/app";
import { config } from "@/appwrite/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

// Function to create a new user
export async function POST(req: NextRequest) {
  console.log(req.body);
  if (req.method === "POST") {
    const { email, password, name } = await req.json();
    console.log(email, password, name);
    try {
      const id: string = ID.unique();
      const res = await account.create(id, email, password, name);
      if (res) {
        const response = await databases.createDocument(
          config.databaseId || "",
          config.user_collection_id || "",
          id,
          { id, email, password, name }
        );
        if (response) {
          return NextResponse.json(
            {
              data: response || null,
              message: "User created successfully",
            },
            {
              status: 201,
            }
          );
        }
      }
    } catch (error: unknown) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        {
          data: error || null,
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        },
        {
          status: error instanceof Error ? 500 : 400,
        }
      );
    }
  }
}
