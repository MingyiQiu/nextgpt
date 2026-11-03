import DashboardLayout from "@/components/layouts/DashboardLayout";
import Sidebar from "@/components/sidebar/Sidebar";

export default function ProtectedLayout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <Sidebar />
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
