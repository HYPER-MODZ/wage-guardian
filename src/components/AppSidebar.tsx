import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginForm from "./LoginForm";
import { Button } from "./ui/button";
import { isAuthenticated, logout } from "@/lib/auth";

export function AppSidebar() {
  const [isAdmin, setIsAdmin] = useState(() => isAuthenticated());

  const handleLogout = () => {
    logout();
    setIsAdmin(false);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
          {isAdmin ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">Logged in as admin</p>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <LoginForm onSuccess={() => setIsAdmin(true)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}