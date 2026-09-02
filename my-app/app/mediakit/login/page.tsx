import { Suspense } from "react";
import MediaKitLoginForm from "./MediaKitLoginForm";

export default function MediaKitLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f4f4f2] text-black flex items-center justify-center px-6">
          <p className="text-sm text-black/60">Loading…</p>
        </main>
      }
    >
      <MediaKitLoginForm />
    </Suspense>
  );
}
