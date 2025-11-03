import { useState, useRef } from "react";
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
import { updateProfileImage } from "../services/upload";
import { Camera } from "lucide-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./ui/shadcn-io/dropzone";

export function EditProfilePictureButton(props) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [files, setFiles] = useState(null);

  const fileInputRef = useRef();

  const token = localStorage.getItem("token");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  const handleDrop = (files) => {
    setFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setImagePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const file = files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

    await updateProfileImage(token, formData); 
      setImagePreview(null);
      setFiles(null); 
      setOpen(false);
      props.refreshUser();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex flex-col gap-4 text-[#0A2243] hover:bg-[#FFD300]">
            <Camera />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Add your profile picture. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <Dropzone
              accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
              onChange={handleFileChange}
              onDrop={handleDrop}
              onError={console.error}
              src={files}
              ref={fileInputRef}
            >
              <DropzoneEmptyState />
              <DropzoneContent>
                {imagePreview && (
                  <div className="h-[102px] w-full">
                    <img
                      alt="Preview"
                      className="absolute top-0 left-0 h-full w-full object-contain"
                      src={imagePreview}
                    />
                  </div>
                )}
              </DropzoneContent>
            </Dropzone>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
