"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { account } from "@/appwrite/app";

interface DocumentUploadDialogProps {
  setOpen: (open: boolean) => void;
}

export function DocumentUploadDialog({ setOpen }: DocumentUploadDialogProps) {
  const [formDetails, setFormDetails] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fileInput = file;
    const fileNameInput = formDetails;
    if (fileInput && fileNameInput) {
      const user= await account.get();
      const formData = new FormData();
      formData.append("fileName", formDetails);
      formData.append("file", file);
      formData.append("userId", user.$id);

      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        console.log("File uploaded successfully", data);
        toast({
          variant: "default",
          title: "Success",
          description: data.message,
        });
       setOpen((prev:boolean) => !prev);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDetails(e.target.value);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="submit" variant={"default"} className="w-30">
          Add Document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload your document here</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <Label htmlFor="link" className="mb-4">
                File name
                <Input type="text" name="fileName" onChange={handleChange} />
              </Label>
            </div>
            <div>
              <Label htmlFor="link" className="mb-4">
                Upload Document
                <Input type="file" name="file" onChange={handleFileUpload} />
              </Label>
            </div>
          </div>

          <DialogFooter className="sm:justify-start mt-5">
            <DialogClose asChild>
              <Button variant="default" type="submit">
                save
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
