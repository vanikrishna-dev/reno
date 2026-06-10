import Link from "next/link";
import NoticeForm from "../../components/NoticeForm";

export default function NewNotice() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to Board</Link>
          <h1 className="text-3xl font-black text-gray-900 mt-2">Add New Notice</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details below to post a new notice</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <NoticeForm />
        </div>
      </div>
    </div>
  );
}