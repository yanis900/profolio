import { useState } from 'react'
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
import { createProject } from '../services/projects'

export function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [github, setGithub] = useState('')
  const [website, setWebsite] = useState('')

  const token = localStorage.getItem('token')

   async function handleSubmit(event) {
    event.preventDefault();
    try {
      const project = {
        title: title,
        description: description,
        links: [github, website]
      }
      const projectData = await createProject(token, project);
      console.log(projectData)
      setOpen(false);
      // navigate("/login");
    } catch (err) {
      console.error(err);
      // navigate("/signup");
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
          <Button variant="outline">+ Add Project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>
              Add any project that you have worked on. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={title} onChange={handleTitleChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={description} onChange={handleDescriptionChange}/>
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
