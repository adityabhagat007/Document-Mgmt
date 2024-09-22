import { Toaster } from "@/components/ui/toaster";
import Sidebar from "../components/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen">
      <Toaster/>
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-1 w-3/4 mt-7 ml-5">{children}</div>
    </div>
  );
};

export default DashboardLayout;
