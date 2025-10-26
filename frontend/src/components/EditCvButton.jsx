import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { FileUser } from "lucide-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./ui/shadcn-io/dropzone";
import { uploadCV } from "../services/upload";

export function EditCvButton(props) {
  const [open, setOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  const handleCvDrop = (files) => {
    if (files.length > 0) {
      setCvFile(files[0]);
      setCvPreview(files[0].name); // or just show file name
    }
  };

  async function handleCvUpload() {
    if (!cvFile) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", cvFile); // make sure backend expects 'file'

      await uploadCV(token, formData); // call your backend service
      setCvFile(null);
      setCvPreview(null);
      props.refreshUser(); // refresh user to show updated CV link if needed
      alert("CV uploaded successfully!");
      setOpen(false);
    } catch (err) {
      console.error("Error uploading CV:", err);
      alert("Failed to upload CV");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex flex-col gap-4">
            <FileUser />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update CV</DialogTitle>
            <DialogDescription>
              Upload your CV in PDF format only. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
              <Dropzone
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxFiles={10}
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                onDrop={handleCvDrop}
                onError={console.error}
                src={cvFile ? [cvFile] : []}
              >
                <DropzoneEmptyState>
                  {cvPreview ? (
                    <p>Selected file: {cvPreview}</p>
                  ) : (
                    <p>Drag & drop your CV here, or click to select</p>
                  )}
                </DropzoneEmptyState>
                <DropzoneContent />
              </Dropzone>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleCvUpload}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}