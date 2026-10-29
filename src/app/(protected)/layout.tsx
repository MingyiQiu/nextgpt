import Sidebar from "@/components/sidebar/Sidebar";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
