import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
export function VisibilitySwitch() {
  return (
    <div className="flex items-center space-x-2 mr-2">
      <Switch id="visibilty" />
      <Label htmlFor="visibilty">Visibilty</Label>
    </div>
  )
}
