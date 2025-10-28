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
import { sendEmail } from "../services/user";
import { Mail } from "lucide-react";
import { useParams } from "react-router-dom";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { updateEmailCount } from "../services/analytics";

export function SendEmailButton() {
  const { userSlug } = useParams()
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token')
  
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const emailData = {
        name,
        subject,
        message
      };
      console.log(emailData)
      console.log(userSlug)
      await sendEmail(userSlug , emailData);
      await updateEmailCount(token, userSlug)
      toast.success('Email sent successfully')
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Email failed to send')
    }
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleSubjectChange(event) {
    setSubject(event.target.value);
  }
  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex flex-col gap-4">
            <Mail />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Send a message to the owner of this portfolio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex gap-3">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
              />
            </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={message}
                onChange={handleMessageChange}
              />
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
