import { Button } from "@/components/ui/button";
import { deleteProject } from "../services/projects";
import { Trash } from "lucide-react";
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
import { toast } from "sonner";

export function DeleteProjectButton(props) {
  const token = localStorage.getItem("token");

  async function handleDelete(id) {
    try {
      await deleteProject(token, id);
      toast.success("Project deleted successfully");
      props.refreshUser();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the project");
    }
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button size={"icon"} variant={"destructive"}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              project and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className={"bg-destructive hover:bg-destructive/90"}
              onClick={() => handleDelete(props.project._id)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
