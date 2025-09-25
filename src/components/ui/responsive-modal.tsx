"use client";

import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
}

export function ResponsiveModal({
  children,
  open,
  onOpenChange,
  title,
  description,
  className,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`max-w-[95%] sm:max-w-[80%] max-h-[90%] sm:max-h-[85%] overflow-auto ${className || ""}`}>
          {(title || description) && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={`min-h-[85vh] max-h-[85vh] ${className || ""}`}>
        {(title || description) && (
          <DrawerHeader className="text-left px-4 py-3">
            {title && <DrawerTitle className="text-lg font-semibold">{title}</DrawerTitle>}
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
        )}
        <div className="px-4 overflow-auto flex-1 pb-safe">
          {children}
        </div>
        <DrawerFooter className="pt-2 pb-safe">
          <DrawerClose asChild>
            <button className="w-full p-3 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-md transition-colors">
              Fechar
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}