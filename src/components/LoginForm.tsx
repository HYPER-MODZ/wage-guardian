import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, login } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Handle viewport height adjustments for mobile keyboards
  useEffect(() => {
    const metaViewport = document.querySelector('meta[name=viewport]');
    const originalContent = metaViewport?.getAttribute('content');
    
    const handleFocus = () => {
      // When input is focused, prevent viewport resize
      metaViewport?.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
      // Scroll the input into view with a small delay to ensure keyboard is shown
      setTimeout(() => {
        window.scrollTo({
          top: document.activeElement?.getBoundingClientRect().top! - 100,
          behavior: 'smooth'
        });
      }, 100);
    };

    const handleBlur = () => {
      // Restore original viewport settings when input is blurred
      if (originalContent) {
        metaViewport?.setAttribute('content', originalContent);
      }
      // Reset scroll position
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticate(username, password)) {
      login();
      onSuccess();
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-background"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-background"
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;