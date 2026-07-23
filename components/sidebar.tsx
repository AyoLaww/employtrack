import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r bg-card bg-off-white">
      {/* Logo */}
      <div className="border-b px-6 py-5">
        <h1 className="font-serif text-xl font-semibold">Employtrack</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        <ul className="mt-2 space-y-1">
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                <Icon className="" size={20} strokeWidth={1.5} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <LogoutButton />
      </div>
    </aside>
  );
}