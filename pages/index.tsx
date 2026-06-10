import { useState, useEffect } from "react";
import Link from "next/link";
import NoticeCard from "../components/NoticeCard";

type Notice = {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image?: string | null;
};

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchNotices = async () => {
    setLoading(true);
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const filtered = filter === "All" ? notices : notices.filter(n =>
    filter === "Urgent" ? n.priority === "Urgent" : n.category === filter
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900">📋 Notice Board</h1>
            <p className="text-xs text-gray-400 mt-0.5">Stay updated with latest notices</p>
          </div>
          <Link href="/notices/new"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-sm hover:shadow-md">
            + New Notice
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["All", "Urgent", "Exam", "Event", "General"].map((tab) => (
            <button key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition border ${
                filter === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
              }`}>
              {tab}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-400 self-center">
            {filtered.length} notice{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-3">⏳</div>
            <p className="text-gray-400">Loading notices...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg font-medium">No notices found</p>
            <Link href="/notices/new"
              className="text-blue-600 underline text-sm mt-2 inline-block">
              Create your first notice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((n) => (
              <NoticeCard key={n.id} notice={n} onDeleted={fetchNotices} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}