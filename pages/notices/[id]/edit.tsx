import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  if (!notice) return <p className="text-center py-20 text-gray-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Notice</h1>
        <NoticeForm initial={notice} noticeId={id as string} />
      </div>
    </div>
  );
}