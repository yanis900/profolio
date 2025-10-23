import { useEffect, useState } from 'react'
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
import { editUser } from '../services/user'
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil } from 'lucide-react'
import { useNavigate } from "react-router-dom";

export function UserDialogDemo(props) {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(props.user)

  const [firstname, setFirstname] = useState(props.user?.firstname)
  const [lastname, setLastname] = useState(props.user?.lastname)
  const [bio, setBio] = useState(props.user?.bio)
  const [jobtitle, setJobtitle] = useState(props.user?.jobtitle)
  const [opentowork, setOpentowork] = useState(props.user?.opentowork)
  const [location, setLocation] = useState(props.user?.location)
  const [linkedin, setLinkedin] = useState(props.user?.links[0])
  const [github, setGithub] = useState(props.user?.links[1])
  const [website, setWebsite] = useState(props.user?.links[2])
  const navigate = useNavigate()

   useEffect(() => {
    if (props.user) {
      setUser(props.user)
      setFirstname(props.user.firstname || "")
      setLastname(props.user.lastname || "")
      setBio(props.user.bio || "")
      setJobtitle(props.user.jobtitle || "")
      setOpentowork(props.user.opentowork || false)
      setLocation(props.user.location || "")
      setLinkedin(props.user.links?.[0] || "")
      setGithub(props.user.links?.[1] || "")
      setWebsite(props.user.links?.[2] || "")
    }
  }, [props.user])

  const token = localStorage.getItem('token')

   async function handleSubmit(event) {
    event.preventDefault();
    try {
      const user = {
        firstname: firstname,
        lastname: lastname,
        bio: bio,
        jobtitle: jobtitle,
        opentowork: opentowork,
        location: location,
        links: [linkedin, github, website]
      }
      await editUser(token, user);
      navigate(`/portfolio/${firstname}-${lastname}-${props.user._id.slice(-6)}`)
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

   function handleFirstnameChange(event) {
    setFirstname(event.target.value);
  }
   function handleLastnameChange(event) {
    setLastname(event.target.value);
  }
   function handleBioChange(event) {
    setBio(event.target.value);
  }
   function handleJobtitleChange(event) {
    setJobtitle(event.target.value);
  }
//    function handleOpentoworkChange(event) {
//     setOpentowork(event.target.value);
//   }
   function handleLocationChange(event) {
    setLocation(event.target.value);
  }
   function handleLinkedinChange(event) {
    setLinkedin(event.target.value);
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
          <Button variant="outline" className="flex flex-col gap-4">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Add any project that you have worked on. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="Firstname">Firstname</Label>
              <Input id="Firstname" name="Firstname" value={firstname} onChange={handleFirstnameChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Lastname">Lastname</Label>
              <Input id="Lastname" name="Lastname" value={lastname} onChange={handleLastnameChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Bio">Bio</Label>
              <Input id="Bio" name="Bio" value={bio} onChange={handleBioChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Jobtitle">Jobtitle</Label>
              <Input id="Jobtitle" name="Jobtitle" value={jobtitle} onChange={handleJobtitleChange}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Opentowork">Opentowork</Label>
              <Checkbox id="Opentowork" name="Opentowork" checked={opentowork} onCheckedChange={() => setOpentowork(true) }/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Location">Location</Label>
              <Input id="Location" name="Location" value={location} onChange={handleLocationChange}/>
            </div>
            <div className="flex gap-3">
              <div>
              <Label htmlFor="Linkedin">Linkedin</Label>
              <Input id="v" name="Linkedin" value={linkedin} onChange={handleLinkedinChange}/>
              </div>
              <Label htmlFor="github">Github</Label>
              <Input id="github" name="github" value={github} onChange={handleGithubChange}/>             
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

    // </>
    //   <Card className='rounded-tl-none'>
    //     <CardHeader>
    //       <CardTitle>Projects</CardTitle>
    //           <CardDescription>
    //                 {props.projects && props.projects.map((project) => {
    //                   return(
    //                     <>
    //                     <Card className="m-20">
    //                     <div>
    //                       <Card key = {project.title}> Title: {project.title} </Card>
    //                       <Card key ={project.description}> Description: {project.description} </Card>
    //                       <Card key ={project.links}> Github: {project.links[0]} </Card>
    //                       <Card key ={project.links}> Website: {project.links[1]} </Card>
    //                     </div>
    //                     </Card>
    //             </>
    //           )
    //         })}
    //       </CardDescription>
    //      <DialogDemo/>
    //     </CardHeader>
    //     <CardContent className="grid gap-6">
    //     </CardContent>
    //     <CardFooter className='justify-end'>
                  
    //    </CardFooter>
    //  </Card>
    // <>
  )
}
