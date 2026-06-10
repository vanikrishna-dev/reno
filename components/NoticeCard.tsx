import { useState } from "react";
import { useRouter } from "next/router";

const categoryColors: Record<string, string> = {
  Exam: "bg-blue-100 text-blue-700",
  Event: "bg-green-100 text-green-700",
  General: "bg-gray-100 text-gray-700",
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col gap-3 relative">
      {notice.priority === "Urgent" && (
        <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Urgent
        </span>
      )}

      {notice.image && (
        <img src={notice.image} alt={notice.title}
          className="w-full h-40 object-cover rounded-xl" />
      )}

      <div className="flex items-center gap-2 text-sm">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[notice.category] || "bg-gray-100"}`}>
          {notice.category}
        </span>
        <span className="text-gray-400 text-xs">{formatDate(notice.publishDate)}</span>
      </div>

      <h2 className="text-lg font-bold text-gray-900 leading-tight">{notice.title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{notice.body}</p>

      <div className="flex gap-2 mt-auto pt-2 border-t border-gray-100">
        <button onClick={() => router.push(`/notices/${notice.id}/edit`)}
          className="flex-1 text-sm font-medium text-blue-600 hover:bg-blue-50 py-1.5 rounded-lg transition">
          Edit
        </button>
        {!confirming ? (
          <button onClick={() => setConfirming(true)}
            className="flex-1 text-sm font-medium text-red-500 hover:bg-red-50 py-1.5 rounded-lg transition">
            Delete
          </button>
        ) : (
          <div className="flex-1 flex gap-1">
            <button onClick={handleDelete} disabled={loading}
              className="flex-1 text-xs bg-red-500 text-white py-1.5 rounded-lg font-semibold hover:bg-red-600 transition">
              {loading ? "..." : "Confirm"}
            </button>
            <button onClick={() => setConfirming(false)}
              className="flex-1 text-xs bg-gray-100 text-gray-600 py-1.5 rounded-lg font-semibold hover:bg-gray-200 transition">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}