import { account, databases, storage } from "@/appwrite/app";
import { config } from "@/appwrite/config";
import { ID } from "appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fileName = formData.get("fileName");
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
    const response = await storage.createFile(
      config.storageId || "",
      id,
      file
    );
    if (response) {
    
      // const response2 = await databases.createDocument(
      //   config.databaseId || "",
      //   config.collectionId || "",
      //   id,
      //   {
      //     owner: user.$id,
      //     fileName: fileName,
      //     f
      //   }
      // );
    }
    return NextResponse.json(
      {
        data: response || null,
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
