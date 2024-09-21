import { Button } from "@/components/ui/button";
import { Home,Users } from 'lucide-react'; // Use lucide-react for icons.

const Sidebar = () => {
  return (
    <aside className=" h-full border-r p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
      </div>
      <nav>
        <ul>
          <li className="mb-4">
            <Button variant="ghost" className="w-full flex  gap-2">
              <Home size={20} /> Add Documents
            </Button>
          </li>
          <li className="mb-4">
            <Button variant="ghost" className="w-full flex items-center gap-2">
              <Users size={20} /> All Documents
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;