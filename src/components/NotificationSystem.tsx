import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const NotificationSystem = () => {
  const { toast } = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registration successful');
          
          // Request notification permission
          if (Notification.permission === 'default') {
            Notification.requestPermission().then((permission) => {
              console.log('Permission request result:', permission);
              if (permission === 'granted') {
                toast({
                  title: "Notifications Enabled",
                  description: "You will now receive attendance reminders",
                });
              }
            });
          }
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed:', error);
        });
    } else {
      console.log('Service workers are not supported');
    }
  }, [toast]);

  return null;
};