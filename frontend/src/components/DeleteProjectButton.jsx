import { Button } from "@/components/ui/button";
import { deleteProject } from "../services/projects";
import { Trash } from "lucide-react";

export function DeleteProjectButton(props) {
  const token = localStorage.getItem("token");

  async function handleDelete(id) {
    try {
      await deleteProject(token, id);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Button
      size={"icon"}
      variant={"destructive"}
      onClick={() => handleDelete(props.project._id)}
    >
      <Trash />
    </Button>
  );
}
