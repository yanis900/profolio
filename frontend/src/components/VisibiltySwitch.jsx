import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toggleVisibility } from "@/services/user";
import { toast } from "sonner";

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

export function VisibilitySwitch({ user, refreshUser }) {
  const [isVisible, setIsVisible] = useState(user?.visibility ?? true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsVisible(user?.visibility ?? true);
  }, [user]);

  async function handleToggle() {
    const newVisibility = !isVisible;

    try {
      const token = localStorage.getItem("token");
      await toggleVisibility(token, newVisibility);
      setIsVisible(newVisibility);
      setOpen(false);

      if (refreshUser) {
        refreshUser();
      }

      toast.success(
        newVisibility
          ? "Portfolio is now visible to others"
          : "Portfolio is now hidden from search"
      );
    } catch (error) {
      console.error("Error toggling visibility:", error);
      toast.error("Failed to update visibility");
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="flex items-center space-x-2 mr-2 p-2 rounded">
        <Switch id="visibility" checked={isVisible} />
        <Label htmlFor="visibility" className='text-[#0A2243]'>Visibility</Label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isVisible ? "Hide your portfolio?" : "Make your portfolio visible?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isVisible
              ? "Your portfolio will be hidden from search results. Only people with a direct link can view it."
              : "Your portfolio will appear in search results and be visible to all users."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={isVisible ? "bg-destructive hover:bg-destructive/90" : ""}
            onClick={handleToggle}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
