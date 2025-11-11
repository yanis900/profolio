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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editUser } from "../services/user";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRoundPen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "./ui/textarea";

export function EditUserButton(props) {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState(props.user?.firstname);
  const [lastname, setLastname] = useState(props.user?.lastname);
  const [bio, setBio] = useState(props.user?.bio);
  const [jobtitle, setJobtitle] = useState(props.user?.jobtitle);
  const [opentowork, setOpentowork] = useState(props.user?.opentowork);
  const [location, setLocation] = useState(props.user?.location);
  const [linkedin, setLinkedin] = useState(props.user?.links[0]);
  const [github, setGithub] = useState(props.user?.links[1]);
  const [website, setWebsite] = useState(props.user?.links[2]);
  const [githubUsername, setGithubUsername] = useState(props.user?.github);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

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
        links: [linkedin, github, website],
        github: githubUsername
      };
      await editUser(token, user);
      navigate(
        `/portfolio/${firstname}-${lastname}-${props.user._id.slice(-6)}`
      );
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
  function handleGithubUsernameChange(event) {
    setGithubUsername(event.target.value);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-2 cursor-pointer">
            <UserRoundPen className="h-4 w-4" />
            <span>Edit Profile</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Add any project that you have worked on. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex gap-3">

            <div className="grid gap-3">
              <Label htmlFor="Firstname">Firstname</Label>
              <Input
                id="Firstname"
                name="Firstname"
                value={firstname}
                onChange={handleFirstnameChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Lastname">Lastname</Label>
              <Input
                id="Lastname"
                name="Lastname"
                value={lastname}
                onChange={handleLastnameChange}
              />
            </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Bio">Bio</Label>
              <Textarea
                id="Bio"
                name="Bio"
                value={bio}
                onChange={handleBioChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Jobtitle">Jobtitle</Label>
              <Input
                id="Jobtitle"
                name="Jobtitle"
                value={jobtitle}
                onChange={handleJobtitleChange}
              />
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="Opentowork">Open to work</Label>
              <Checkbox
                id="Opentowork"
                name="Opentowork"
                checked={opentowork}
                onCheckedChange={(checked) => setOpentowork(checked)}
                />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Location">Location</Label>
              <Input
                id="Location"
                name="Location"
                value={location}
                onChange={handleLocationChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="GithubUsername">Github Username</Label>
              <Input
                id="GithubUsername"
                name="GithubUsername"
                value={githubUsername}
                onChange={handleGithubUsernameChange}
              />
            </div>
            <div className="flex gap-3">
              <div>
                <Label htmlFor="Linkedin">Linkedin</Label>
                <Input
                  id="v"
                  name="Linkedin"
                  value={linkedin}
                  onChange={handleLinkedinChange}
                />
              </div>
              <div>
                <Label htmlFor="github">Github</Label>
                <Input
                  id="github"
                  name="github"
                  value={github}
                  onChange={handleGithubChange}
                />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={website}
                  onChange={handleWebsiteChange}
                />
              </div>
            </div>
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
