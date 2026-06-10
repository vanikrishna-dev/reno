import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoticeForm from "../../../components/NoticeForm";

type FormData = {
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
  image: string;
};

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState<FormData | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/notices/${id}`)
      .then((r) => r.json())
      .then((data) => {
        const formatted = new Date(data.publishDate).toISOString().split("T")[0];
        setNotice({ ...data, publishDate: formatted, image: data.image || "" });
      });
  }, [id]);

  if (!notice) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Board</Link>
          <h1 className="text-3xl font-black text-gray-900 mt-2">Edit Notice</h1>
          <p className="text-gray-400 text-sm mt-1">Update the notice details below</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <NoticeForm initial={notice} noticeId={id as string} />
        </div>
      </div>
    </div>
  );
}