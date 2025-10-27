import { useState } from "react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export function SimpleTagsInput({ selectedTags, setSelectedTags }) {
  const [inputValue, setInputValue] = useState("");

  const defaultTags = [
    'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js',
    'Python', 'Java', 'Full Stack', 'Frontend', 'Backend',
    'Mobile', 'Web', 'AI/ML', 'Database', 'API', 'Cloud'
  ];

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && selectedTags.length > 0) {
      removeTag(selectedTags.length - 1);
    }
  }

  function addTag() {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !selectedTags.includes(trimmedValue)) {
      setSelectedTags([...selectedTags, trimmedValue]);
      setInputValue("");
    }
  }

  function removeTag(indexToRemove) {
    setSelectedTags(selectedTags.filter((_, index) => index !== indexToRemove));
  }

  function addPredefinedTag(tag) {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return (
    <div className="space-y-3">
      {/* Input for custom tags */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[42px] bg-background">
        {selectedTags.map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-2 py-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 hover:text-destructive"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={selectedTags.length === 0 ? "Type and press Enter..." : ""}
          className="flex-1 border-none shadow-none focus-visible:ring-0 min-w-[120px] p-0 h-auto"
        />
      </div>

      {/* Quick select buttons */}
      <div className="flex flex-wrap gap-2">
        {defaultTags.map((tag) => (
          <Button
            key={tag}
            type="button"
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            size="sm"
            onClick={() => addPredefinedTag(tag)}
            className="text-xs"
          >
            {tag}
          </Button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Click a button to add common tags, or type your own and press Enter
      </p>
    </div>
  );
}
