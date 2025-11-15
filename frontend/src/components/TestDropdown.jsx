import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { EditUserButton } from "./EditUserButton";
import { EditCvButton } from "./EditCvButton";

export default function TestDropdown(props) {
  return (
    <div className="flex justify-center absolute top-3 right-3">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            size="icon"
            className="text-[#0A2243] hover:bg-[#FFD300] rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <EditUserButton user={props.user} />
            <EditCvButton user={props.user} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
