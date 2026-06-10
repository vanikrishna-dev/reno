import { useState } from "react";
import { useRouter } from "next/router";

const categoryColors: Record<string, string> = {
  Exam: "bg-blue-50 text-blue-700 border border-blue-200",
  Event: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  General: "bg-slate-50 text-slate-600 border border-slate-200",
};

const categoryIcons: Record<string, string> = {
  Exam: "📝",
  Event: "🎉",
  General: "📌",
};

type Notice = {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image?: string | null;
};

export default function NoticeCard({ notice, onDeleted }: { notice: Notice; onDeleted: () => void }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/notices/${notice.id}`, { method: "DELETE" });
    setLoading(false);
    setConfirming(false);
    onDeleted();
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-l-4 ${notice.priority === "Urgent" ? "border-l-red-500" : "border-l-blue-400"} border border-gray-100 p-5 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200`}>
      
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[notice.category] || "bg-gray-100 text-gray-600"}`}>
            {categoryIcons[notice.category]} {notice.category}
          </span>
          {notice.priority === "Urgent" && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
              🚨 Urgent
            </span>
          )}
        </div>
        <span className="text-gray-400 text-xs whitespace-nowrap">{formatDate(notice.publishDate)}</span>
      </div>

      {/* Image */}
      {notice.image && (
        <img src={notice.image} alt={notice.title}
          className="w-full h-44 object-cover rounded-xl"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null; // prevent loop
            img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='176'%3E%3Crect width='400' height='176' fill='%23f1f5f9'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='13' font-family='sans-serif'%3ENo image available%3C/text%3E%3C/svg%3E";
          }}
        />
      )}

      {/* Title */}
      <h2 className="text-base font-bold text-gray-900 leading-snug">{notice.title}</h2>

      {/* Body */}
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{notice.body}</p>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
        {!confirming ? (
          <>
            <button
              onClick={() => router.push(`/notices/${notice.id}/edit`)}
              className="flex-1 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-xl transition">
              ✏️ Edit
            </button>
            <button
              onClick={() => setConfirming(true)}
              className="flex-1 text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-xl transition">
              🗑️ Delete
            </button>
          </>
        ) : (
          <>
            <button onClick={handleDelete} disabled={loading}
              className="flex-1 text-xs bg-red-500 text-white py-2 rounded-xl font-bold hover:bg-red-600 transition">
              {loading ? "Deleting..." : "✅ Confirm Delete"}
            </button>
            <button onClick={() => setConfirming(false)}
              className="flex-1 text-xs bg-gray-100 text-gray-600 py-2 rounded-xl font-semibold hover:bg-gray-200 transition">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}