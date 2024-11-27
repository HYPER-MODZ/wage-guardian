import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AttendanceStatus } from "@/lib/attendance";

interface AttendanceMarkerProps {
  date: Date | null;
  onClose: () => void;
  onSubmit: (date: Date, status: AttendanceStatus) => void;
}

const AttendanceMarker = ({ date, onClose, onSubmit }: AttendanceMarkerProps) => {
  const [status, setStatus] = useState<AttendanceStatus>("present");

  const handleSubmit = () => {
    if (date) {
      onSubmit(date, status);
      onClose();
    }
  };

  if (!date) return null;

  return (
    <Dialog open={!!date} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark Attendance - {format(date, "dd MMMM yyyy")}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup
            value={status}
            onValueChange={(value) => setStatus(value as AttendanceStatus)}
            className="flex flex-col gap-4"
          >
            {(["present", "absent", "holiday"] as AttendanceStatus[]).map(
              (value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="capitalize">
                    {value}
                  </Label>
                </div>
              )
            )}
          </RadioGroup>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceMarker;