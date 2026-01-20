"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateUserPermissions } from "../hooks/use-update-user-permissions";
import { useGetUserPermissions } from "../hooks/use-get-user-permissions";
import {
  UpdateUserPermissionsSchema,
  TUpdateUserPermissions,
  PERMISSION_RESOURCE,
  PERMISSION_ACTION,
  createPermissionString,
} from "../schema/permission.schema";
import {
  PERMISSION_RESOURCES,
  PERMISSION_ACTIONS,
} from "../constants/permission.constants";
import { toast } from "sonner";

type TUserPermissionsFormProps = {
  userId: number | string;
  userName?: string;
  onSuccess?: () => void;
};

export const UserPermissionsForm = ({
  userId,
  userName,
  onSuccess,
}: TUserPermissionsFormProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set()
  );

  const { userPermissions, isLoadingUserPermissions } = useGetUserPermissions({
    userId,
  });

  const { updateUserPermissions, isUpdatingPermissions } =
    useUpdateUserPermissions({
      userId,
      onSuccess: () => {
        onSuccess?.();
      },
    });

  const form = useForm<TUpdateUserPermissions>({
    resolver: zodResolver(UpdateUserPermissionsSchema),
    defaultValues: {
      permissions: [],
    },
  });

  // Load existing permissions when data is fetched
  useEffect(() => {
    if (userPermissions?.permissions) {
      const permissionsSet = new Set(userPermissions.permissions);
      setSelectedPermissions(permissionsSet);
      form.setValue("permissions", userPermissions.permissions);
    }
  }, [userPermissions, form]);

  const handlePermissionToggle = (permission: string) => {
    const newPermissions = new Set(selectedPermissions);

    if (newPermissions.has(permission)) {
      newPermissions.delete(permission);
    } else {
      newPermissions.add(permission);
    }

    setSelectedPermissions(newPermissions);
    form.setValue("permissions", Array.from(newPermissions));
  };

  const handleSelectAllForResource = (resource: PERMISSION_RESOURCE) => {
    const newPermissions = new Set(selectedPermissions);
    const resourcePermissions = PERMISSION_ACTIONS.map((action) =>
      createPermissionString(resource, action.value)
    );

    // Check if all permissions for this resource are already selected
    const allSelected = resourcePermissions.every((perm) =>
      newPermissions.has(perm)
    );

    if (allSelected) {
      // Deselect all
      resourcePermissions.forEach((perm) => newPermissions.delete(perm));
    } else {
      // Select all
      resourcePermissions.forEach((perm) => newPermissions.add(perm));
    }

    setSelectedPermissions(newPermissions);
    form.setValue("permissions", Array.from(newPermissions));
  };

  const onSubmit = (values: TUpdateUserPermissions) => {
    if (values.permissions.length === 0) {
      toast.warning("Please select at least one permission");
      return;
    }
    updateUserPermissions(values);
  };

  if (isLoadingUserPermissions) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userName ? `Manage Permissions for ${userName}` : "Manage User Permissions"}
        </CardTitle>
        <CardDescription>
          Select the permissions you want to grant to this user. Permissions
          control what actions the user can perform in the system.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <ScrollArea className="h-[400px] pr-4 overflow-hidden">
            <div className="space-y-6">
              {PERMISSION_RESOURCES.map((resource) => {
                const resourcePermissions = PERMISSION_ACTIONS.map((action) =>
                  createPermissionString(resource.value, action.value)
                );
                const allSelected = resourcePermissions.every((perm) =>
                  selectedPermissions.has(perm)
                );

                return (

                  <div key={resource.value} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`select-all-${resource.value}`}
                          checked={allSelected}
                          onCheckedChange={() =>
                            handleSelectAllForResource(resource.value)
                          }
                        />
                        <Label
                          htmlFor={`select-all-${resource.value}`}
                          className="text-base font-semibold cursor-pointer"
                        >
                          {resource.label}
                        </Label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSelectAllForResource(resource.value)}
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pl-6">
                      {PERMISSION_ACTIONS.map((action) => {
                        const permission = createPermissionString(
                          resource.value,
                          action.value
                        );
                        return (
                          <div
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission}
                              checked={selectedPermissions.has(permission)}
                              onCheckedChange={() =>
                                handlePermissionToggle(permission)
                              }
                            />
                            <Label
                              htmlFor={permission}
                              className="text-sm cursor-pointer"
                            >
                              {action.label}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                    <Separator />
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="flex items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {selectedPermissions.size} permission(s) selected
            </p>
            <Button
              type="submit"
              disabled={isUpdatingPermissions}
              className="min-w-32"
            >
              {isUpdatingPermissions ? "Saving..." : "Save Permissions"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
