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
import { GitGraph } from "lucide-react";
import { GithubContributions } from "./GithubContributions";

export function ContributionsButton(props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex flex-col gap-4">
            <GitGraph />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Github Contributions</DialogTitle>
            <DialogDescription>
              {props.contributions.totalContributions} contributions in the last
              year
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center gap-4">
            <GithubContributions contributions={props.contributions} />
          </div>
          <DialogFooter className="flex items-center gap-3">
            <DialogDescription>
              last 6 months
            </DialogDescription>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
