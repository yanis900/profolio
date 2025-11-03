import { useState } from 'react';
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/shadcn-io/tags';
import { CheckIcon, PlusIcon } from 'lucide-react';

const defaultTags = [
  { id: 'react', label: 'React' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'csharp', label: 'C#' },
  { id: 'php', label: 'PHP' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'database', label: 'Database' },
  { id: 'api', label: 'API' },
  { id: 'cloud', label: 'Cloud' },
];

export function ProjectTags({ selectedTags, setSelectedTags }) {
  const [newTag, setNewTag] = useState('');
  const [availableTags, setAvailableTags] = useState(defaultTags);

  const handleRemove = (value) => {
    if (!selectedTags.includes(value)) {
      return;
    }
    setSelectedTags((prev) => prev.filter((v) => v !== value));
  };

  const handleSelect = (value) => {
    if (selectedTags.includes(value)) {
      handleRemove(value);
      return;
    }
    setSelectedTags((prev) => {
      const newTags = [...prev, value];
      return newTags;
    });
  };

  const handleCreateTag = () => {
    if (!newTag.trim()) return;

    const tagId = newTag.toLowerCase().replace(/\s+/g, '-');
    setAvailableTags((prev) => [
      ...prev,
      {
        id: tagId,
        label: newTag,
      },
    ]);
    setSelectedTags((prev) => [...prev, tagId]);
    setNewTag('');
  };

  return (
    <Tags className="w-full">
      <TagsTrigger>
        {selectedTags.map((tag) => (
          <TagsValue key={tag} onRemove={() => handleRemove(tag)}>
            {availableTags.find((t) => t.id === tag)?.label || tag}
          </TagsValue>
        ))}
      </TagsTrigger>
      <TagsContent>
        <TagsInput onValueChange={setNewTag} value={newTag} placeholder="Search tags..." />
        <TagsList>
          <TagsEmpty>
            <button
              className="mx-auto flex cursor-pointer items-center gap-2"
              onClick={handleCreateTag}
              type="button"
            >
              <PlusIcon className="text-muted-foreground" size={14} />
              Create new tag: {newTag}
            </button>
          </TagsEmpty>
          <TagsGroup>
            {availableTags
              .filter((tag) =>
                tag.label.toLowerCase().includes(newTag.toLowerCase())
              )
              .map((tag) => (
                <TagsItem
                  key={tag.id}
                  onSelect={() => handleSelect(tag.id)}
                  value={tag.id}
                >
                  {tag.label}
                  {selectedTags.includes(tag.id) && (
                    <CheckIcon className="text-muted-foreground" size={14} />
                  )}
                </TagsItem>
              ))}
          </TagsGroup>
        </TagsList>
      </TagsContent>
    </Tags>
  );
}
