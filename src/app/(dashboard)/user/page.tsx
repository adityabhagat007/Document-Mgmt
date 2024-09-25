
"use client";
import DocumentTable from '@/app/components/documentTable'
import { DocumentUploadDialog } from '@/app/components/documentUploadDialog'
import { account } from '@/appwrite/app';
import React, { useState } from 'react'
interface Document {
  id: string;
  filename: string;
  $createdAt: string;
  fileLink: string;
}
interface DocumentsData {
  documents: Document[];
  total: number;
}

export default function UserPage() {
  const [data, setData] = useState<DocumentsData>({ documents: [], total: 0 });
  const [update, setUpdate] = useState(false);
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const user = await account.get();
        const response = await fetch("/api/docs", {
          method: "POST",
          body: JSON.stringify({ userId: user.$id }),
          headers: { "Content-Type": "application/json" },
        });
        const docs = await response.json();
        console.log(docs.data);
        setData(docs.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [update]);

  return (
    <div className='main'>
      <DocumentUploadDialog setUpdate={setUpdate} update={update}/>
      <div className='w-96 mt-10'>
         <DocumentTable data={data}/>
      </div>
    </div>
  )
}
