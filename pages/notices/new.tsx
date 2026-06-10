import NoticeForm from "../../components/NoticeForm";

export default function NewNotice() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Notice</h1>
        <NoticeForm />
      </div>
    </div>
  );
}