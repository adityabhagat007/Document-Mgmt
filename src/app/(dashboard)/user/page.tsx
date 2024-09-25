
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
  const [open, setOpen] = useState(false);
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
  }, [open]);

  return (
    <div className='main'>
      <DocumentUploadDialog setOpen={setOpen}/>
      <div className='w-96 mt-10'>
         <DocumentTable data={data}/>
      </div>
    </div>
  )
}
