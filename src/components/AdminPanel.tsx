import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import AttendanceMarker from "./AttendanceMarker";
import { AttendanceStatus } from "@/lib/attendance";

interface AdminPanelProps {
  selectedDate: Date | null;
  onClose: () => void;
  onSubmit: (date: Date, status: AttendanceStatus) => void;
  onLogout: () => void;
}

const AdminPanel = ({ selectedDate, onClose, onSubmit, onLogout }: AdminPanelProps) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <AttendanceMarker
        date={selectedDate}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AdminPanel;