import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface NewEntryFormProps {
  onSubmitEntry: (
    title: string,
    content: string,
    mood: string,
    tags: string[]
  ) => Promise<void> | void;
  initialTitle?: string;
  initialContent?: string;
  initialMood?: string;
  initialTags?: string[];
  submitLabel?: string;
  isSubmitting?: boolean;
}

function NewEntryForm({
  onSubmitEntry,
  initialTitle = "",
  initialContent = "",
  initialMood = "",
  initialTags = [],
  submitLabel = "Save Entry",
  isSubmitting = false,
}: NewEntryFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState(initialMood);
  const [tagsInput, setTagsInput] = useState(initialTags.join(", "));

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setMood(initialMood);
    setTagsInput(initialTags.join(", "));
  }, [initialTitle, initialContent, initialMood, initialTags]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim() || isSubmitting) {
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    await onSubmitEntry(
      title,
      content,
      mood.trim() || "no mood logged",
      tags
    );

    navigate("/entries");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="entry-title">Title</label>
        <br />
        <input
          id="entry-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </p>

      <p>
        <label htmlFor="entry-content">Content</label>
        <br />
        <textarea
          id="entry-content"
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
      </p>

      <p>
        <label htmlFor="entry-mood">Mood</label>
        <br />
        <input
          id="entry-mood"
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="locked in, tired, cooking, etc."
          disabled={isSubmitting}
        />
      </p>

      <p>
        <label htmlFor="entry-tags">Tags</label>
        <br />
        <input
          id="entry-tags"
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, devlog, routing"
          disabled={isSubmitting}
        />
      </p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

export default NewEntryForm;