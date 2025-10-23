import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

export function VisibilitySwitch() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center space-x-2 mr-2 border-2 border-purple-500">
        <Switch id="visibilty" />
        <Label htmlFor="visibilty">Visibilty</Label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will allow other users to see your portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={"bg-destructive hover:bg-destructive/90"}
            onClick={() => ""}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
