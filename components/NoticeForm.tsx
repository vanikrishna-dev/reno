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

  const inputClass = "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Title <span className="text-red-400">*</span></label>
        <input name="title" value={form.title} onChange={handleChange}
          placeholder="Enter notice title..." className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Body <span className="text-red-400">*</span></label>
        <textarea name="body" value={form.body} onChange={handleChange}
          rows={5} placeholder="Enter notice details..." className={inputClass} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
            <option>General</option>
            <option>Exam</option>
            <option>Event</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} className={inputClass}>
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">Publish Date <span className="text-red-400">*</span></label>
        <input type="date" name="publishDate" value={form.publishDate}
          onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1.5">
          Image URL <span className="text-gray-400 font-normal text-xs">(optional)</span>
        </label>
        <input name="image" value={form.image} onChange={handleChange}
          placeholder="https://..." className={inputClass} />
        {form.image && (
          <img src={form.image} alt="preview"
            className="mt-2 w-full h-32 object-cover rounded-xl border border-gray-200" />
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm hover:shadow-md">
          {loading ? "Saving..." : noticeId ? "💾 Update Notice" : "🚀 Create Notice"}
        </button>
        <button type="button" onClick={() => router.push("/")}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}