import { useState } from "react";
import { useRouter } from "next/router";

type FormData = {
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image: string;
};

const defaultForm: FormData = {
  title: "", body: "", category: "General",
  priority: "Normal", publishDate: "", image: "",
};

export default function NoticeForm({ initial, noticeId }: { initial?: FormData; noticeId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initial || defaultForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const method = noticeId ? "PUT" : "POST";
    const url = noticeId ? `/api/notices/${noticeId}` : "/api/notices";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      return;
    }
    router.push("/");
  };

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
      {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
        <input name="title" value={form.title} onChange={handleChange}
          placeholder="Notice title" className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Body *</label>
        <textarea name="body" value={form.body} onChange={handleChange}
          rows={4} placeholder="Notice body..." className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option>General</option>
            <option>Exam</option>
            <option>Event</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Publish Date *</label>
        <input type="date" name="publishDate" value={form.publishDate}
          onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Image URL <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input name="image" value={form.image} onChange={handleChange}
          placeholder="https://..." className={inputClass} />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition text-sm">
          {loading ? "Saving..." : noticeId ? "Update Notice" : "Create Notice"}
        </button>
        <button type="button" onClick={() => router.push("/")}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}