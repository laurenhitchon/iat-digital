import { Outlet } from "react-router";

export default function CoursesLayout() {

  return (
    <>
    <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
    <main className="mx-auto max-w-7xl sm:px-6 lg:px-8 relative py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <Outlet />
      </div>
    </main>
    </>
  )
}
