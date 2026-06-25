import { createFileRoute, redirect } from "@tanstack/react-router";

// Search is now a modal overlay — this route just redirects home
export const Route = createFileRoute("/search")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
