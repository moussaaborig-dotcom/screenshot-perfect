import { createFileRoute, Outlet } from "@tanstack/react-router";

import { Footer } from "@/components/layout/Footer";
import { Navbar, PrototypeNotice } from "@/components/layout/Navbar";

export const Route = createFileRoute("/_site")({
  component: SiteLayout,
});

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PrototypeNotice />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
