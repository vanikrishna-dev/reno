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

  const fetchNotices = async () => {
    setLoading(true);
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">📋 Notice Board</h1>
          <Link href="/notices/new"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
            + Add Notice
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading notices...</p>
        ) : notices.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No notices yet.</p>
            <Link href="/notices/new" className="text-blue-600 underline text-sm mt-2 inline-block">
              Create your first notice
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((n) => (
              <NoticeCard key={n.id} notice={n} onDeleted={fetchNotices} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}