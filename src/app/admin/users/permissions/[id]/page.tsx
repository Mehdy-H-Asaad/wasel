"use client";

import { useParams, useRouter } from "next/navigation";
import { UserPermissionsForm } from "@/features/authorization/components/user-permissions-form";
import { useGetUsers } from "@/features/user/hooks/use-get-users";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPermissionsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  // Fetch user details to show their name
  const { users, isLoadingUsers } = useGetUsers({
    filters: {},
  });

  const user = users?.find((u) => u.id.toString() === userId);

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Permissions</h1>
            {isLoadingUsers ? (
              <Skeleton className="h-4 w-48 mt-2" />
            ) : (
              <p className="text-muted-foreground">
                {user ? `Managing permissions and accessfor ${user.name}` : "User not found"}
              </p>
            )}
          </div>
        </div>
      </div>

      {user ? (
        <UserPermissionsForm
          userId={userId}
          userName={user.name}
          onSuccess={() => router.push("/admin/users")}
        />
      ) : !isLoadingUsers ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">User not found</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/admin/users")}
            >
              Back to Users
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-12">
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
