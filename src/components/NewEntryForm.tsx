import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface NewEntryFormProps {
  onAddEntry: (title: string, content: string) => void;
}

function NewEntryForm({ onAddEntry }: NewEntryFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    onAddEntry(title, content);

    setTitle("");
    setContent("");

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
        />
      </p>

      <button type="submit">Save Entry</button>
    </form>
  );
}

export default NewEntryForm;