import { config } from "@/appwrite/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";
import { databases, storage } from "@/appwrite/app";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileName = formData.get("fileName");
    const userId = formData.get("userId");
    const file = formData.get("file") as File;
    console.log(fileName, file);
    if (!fileName || !file) {
      return NextResponse.json(
        {
          data: null,
          message: "Fill the complete form",
        },
        {
          status: 401,
        }
      );
    }
    const id = ID.unique();
    const response = await storage.createFile(config.storageId || "", id, file);
    const response2 = await databases.createDocument(
      config.databaseId || "",
      config.file_collection_id || "",
      id,
      {
        owner: userId,
        filename: fileName,
        fileLink:`${config.endpoint}/storage/buckets/${config.storageId}/files/${response.$id}/view?project=${config.projectId}`
      }
    );
    return NextResponse.json(
      {
        data: response2 || null,
        message: "file uploaded successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      {
        data: error || null,
        message: "failed to upload file",
      },
      {
        status: 201,
      }
    );
  }
}

