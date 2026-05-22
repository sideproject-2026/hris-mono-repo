import FooterComponent from "@/features/footer/footer-component";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import {NuqsAdapter} from "nuqs/adapters/tanstack-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <NuqsAdapter>
        <div className="w-full h-screen bg-sky-100">
          <Outlet />
          <FooterComponent />
        </div>
      </NuqsAdapter>
    </>
  ),
});
