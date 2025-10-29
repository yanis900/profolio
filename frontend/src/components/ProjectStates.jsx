import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ProjectStates({ selectedState, setSelectedState }) {
  const states = [
    { id: "in-progress", label: "In Progress", value: "In Progress" },
    { id: "completed-not-deployed", label: "Completed (Not Deployed)", value: "Completed (Not Deployed)" },
    { id: "completed-deployed", label: "Completed & Deployed", value: "Completed & Deployed" },
  ];

  return (
    <div className="grid gap-3">
      <Label>Project State *</Label>
      <RadioGroup value={selectedState} onValueChange={setSelectedState} required>
        {states.map((state) => (
          <div key={state.id} className="flex items-center space-x-2">
            <RadioGroupItem value={state.value} id={state.id} />
            <Label htmlFor={state.id} className="font-normal cursor-pointer">
              {state.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
