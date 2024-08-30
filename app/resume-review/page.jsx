import ResumeUploader from "./components/ResumeUploader";

export default function ResumeReviewPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Resume Review</h1>
      <ResumeUploader />
    </main>
  );
}
