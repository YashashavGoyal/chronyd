"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO'
}

export enum NotificationPosition {
  TOP = 'TOP',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM = 'BOTTOM',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT'
}

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}

interface SuchnaContextType {
  notify: (type: NotificationType, message: string) => void;
}

const SuchnaContext = createContext<SuchnaContextType | undefined>(undefined);

export function useSuchna() {
  const context = useContext(SuchnaContext);
  if (!context) {
    throw new Error("useSuchna must be used within a SuchnaProvider");
  }
  return context;
}

export function SuchnaProvider({ 
  children, 
  position = NotificationPosition.BOTTOM_RIGHT 
}: { 
  children: React.ReactNode;
  position?: NotificationPosition;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = useCallback((type: NotificationType, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, type, message }]);

    // Auto dismiss
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS: return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case NotificationType.ERROR: return <AlertCircle className="w-5 h-5 text-red-400" />;
      case NotificationType.WARNING: return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case NotificationType.INFO: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS: return "bg-black/90 backdrop-blur-xl border-emerald-500/20 text-white shadow-[0_4px_24px_-4px_rgba(16,185,129,0.15)]";
      case NotificationType.ERROR: return "bg-black/90 backdrop-blur-xl border-red-500/20 text-white shadow-[0_4px_24px_-4px_rgba(239,68,68,0.15)]";
      case NotificationType.WARNING: return "bg-black/90 backdrop-blur-xl border-amber-500/20 text-white shadow-[0_4px_24px_-4px_rgba(245,158,11,0.15)]";
      case NotificationType.INFO: return "bg-black/90 backdrop-blur-xl border-blue-500/20 text-white shadow-[0_4px_24px_-4px_rgba(59,130,246,0.15)]";
    }
  };

  const getPositionClasses = (pos: NotificationPosition) => {
    switch (pos) {
      case NotificationPosition.TOP: return "fixed top-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:top-6 flex-col items-center";
      case NotificationPosition.TOP_RIGHT: return "fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 flex-col items-center sm:items-end";
      case NotificationPosition.TOP_LEFT: return "fixed top-4 left-4 right-4 sm:right-auto sm:left-6 sm:top-6 flex-col items-center sm:items-start";
      case NotificationPosition.BOTTOM: return "fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:bottom-6 flex-col items-center";
      case NotificationPosition.BOTTOM_LEFT: return "fixed bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 flex-col items-center sm:items-start";
      case NotificationPosition.BOTTOM_RIGHT:
      default:
        return "fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 flex-col items-center sm:items-end";
    }
  };

  const getAnimation = (pos: NotificationPosition) => {
    const isTop = pos.includes("TOP");
    return {
      initial: { opacity: 0, y: isTop ? -20 : 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    };
  };

  return (
    <SuchnaContext.Provider value={{ notify }}>
      {children}
      <div className={`z-[9999] flex gap-3 pointer-events-none ${getPositionClasses(position)}`}>
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={getAnimation(position).initial}
              animate={getAnimation(position).animate}
              exit={getAnimation(position).exit}
              className={`pointer-events-auto flex items-start gap-3 p-4 w-full sm:w-[340px] max-w-md rounded-xl border border-white/10 ${getStyles(notif.type)}`}
            >
              <div className="shrink-0">{getIcon(notif.type)}</div>
              <p className="text-sm font-medium flex-grow mt-0.5 leading-relaxed text-white/90">{notif.message}</p>
              <button 
                onClick={() => removeNotification(notif.id)}
                className="shrink-0 text-white/40 hover:text-white transition-colors cursor-pointer p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SuchnaContext.Provider>
  );
}
