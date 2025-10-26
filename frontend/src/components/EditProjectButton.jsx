import { useState, useRef} from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { editProject } from '../services/projects'
import { uploadThumbnail } from "../services/upload";
import { Pencil } from 'lucide-react'
import { Textarea } from './ui/textarea'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./ui/shadcn-io/dropzone";
import { toast } from 'sonner'

export function EditProjectButton(props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(props.project.title)
  const [description, setDescription] = useState(props.project.description)
  const [github, setGithub] = useState(props.project.links[0])
  const [website, setWebsite] = useState(props.project.links[1])

  const [files, setFiles] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef()

  const token = localStorage.getItem('token')

  function handleDrop(files) {
    setFiles(files)
    if (files.length > 0) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setImagePreview(e.target.result)
        }
      }
      reader.readAsDataURL(files[0])
    }
  }

  async function handleThumbnailUpload(projectId) {
    if (!files || files.length === 0) return
    try {
      const image = files[0]
      const formData = new FormData();
      formData.append("image", image);

      await uploadThumbnail(token, projectId, formData)
      console.log("Thumbnail uploaded successfully!")
    } catch (err) {
      console.error("Error uploading thumbnail:", err)
    }
  }

   async function handleSubmit(event) {
    event.preventDefault();
    try {
      const project = {
        id: props.project._id,
        title: title,
        description: description,
        links: [github, website],
      }
      await handleThumbnailUpload(props.project._id)
      await editProject(token, project);
      toast.success(
        "Project edited successfully"
      );
      props.refreshUser()
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(
        "Failed to edit the project"
      );
    }
  }

   function handleTitleChange(event) {
    setTitle(event.target.value);
  }
   function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }
   function handleGithubChange(event) {
    setGithub(event.target.value);
  }
   function handleWebsiteChange(event) {
    setWebsite(event.target.value);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant={"outline"} size={'icon'}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={title} onChange={handleTitleChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={description} onChange={handleDescriptionChange}/>
            </div>
            <div className="flex gap-3">
              <div>
              <Label htmlFor="github">Github</Label>
              <Input id="github" name="github" value={github} onChange={handleGithubChange}/>
              </div>
              <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" value={website} onChange={handleWebsiteChange}/>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Project Thumbnail</Label>
              <div className="flex children:flex-1">

              <Dropzone
                accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
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
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
