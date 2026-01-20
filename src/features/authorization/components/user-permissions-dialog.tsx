"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserPermissionsForm } from "./user-permissions-form";

type TUserPermissionsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: number | string;
  userName?: string;
};

export const UserPermissionsDialog = ({
  open,
  onOpenChange,
  userId,
  userName,
}: TUserPermissionsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>User Permissions</DialogTitle>
          <DialogDescription>
            Manage what this user can access and modify in the system.
          </DialogDescription>
        </DialogHeader>
        <UserPermissionsForm
          userId={userId}
          userName={userName}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
