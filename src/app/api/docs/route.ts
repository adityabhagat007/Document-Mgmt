import { databases } from "@/appwrite/app";
import { config } from "@/appwrite/config";
import { Query } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    try {
      const documents = await databases.listDocuments(
        config.databaseId || "",        
        config.file_collection_id || "",
        [
          Query.equal("owner", userId)
        ]
      );
  
      return NextResponse.json(
        {
          data: documents || null,
          message: "Documents retrieved successfully",
        },
        {
          status: 200, // Success
        }
      );
    } catch (error) {
      console.error("Error retrieving documents:", error);
      return NextResponse.json(
        {
          data: error || null,
          message: "Failed to retrieve documents",
        },
        {
          status: 500, // Internal server error
        }
      );
    }
  }
  