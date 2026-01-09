"use client";
import { CustomDialog } from "@/components/common/CustomDialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInviteUser } from "../../hooks/use-invite-user";
import { USER_ROLES } from "../../constants/user.constants";
import { useEffect, useState } from "react";
import { MainButton } from "@/components/common/MainButton";
import { useGetBranches } from "@/features/branch/hooks/use-get-branches";
import { Loader } from "lucide-react";

export const InviteUserDialog = () => {
  const [open, setOpen] = useState(false);
  const {
    InviteUserForm,
    onInviteUser,
    isInvitingUser,
    isInvitingUserSuccess,
  } = useInviteUser();

  useEffect(() => {
    if (isInvitingUserSuccess) {
      setOpen(false);
      InviteUserForm.reset();
    }
  }, [isInvitingUserSuccess, InviteUserForm]);

  const { branches, isLoadingBranches } = useGetBranches({
    limit: 100,
    page: 1,
  });

  return (
    <CustomDialog
      isMainButton={true}
      dialogContentClassName="sm:min-w-[30rem] dark:bg-main-black"
      title="user"
      trigger="Invite User"
      open={open}
      setOpen={setOpen}
    >
      <Form {...InviteUserForm}>
        <form
          className="grid gap-4"
          onSubmit={InviteUserForm.handleSubmit(onInviteUser)}
        >
          <FormField
            control={InviteUserForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter user's full name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={InviteUserForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="user@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={InviteUserForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="+1234567890" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={InviteUserForm.control}
            name="branch_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Branch<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingBranches ? (
                        <SelectItem value="loading" disabled>
                          <Loader className="w-4 h-4 animate-spin" />
                        </SelectItem>
                      ) : (
                        branches?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id.toString()}
                          >
                            {branch.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={InviteUserForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Role<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full capitalize">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(USER_ROLES).map((role) => (
                      <SelectItem
                        key={role}
                        value={role}
                        className="capitalize"
                      >
                        {role.split("_").join(" ").toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <MainButton
            disabled={isInvitingUser}
            className="w-full mt-4"
            isLoading={isInvitingUser}
            loadingText="Inviting user..."
            type="submit"
          >
            Send Invitation
          </MainButton>
        </form>
      </Form>
    </CustomDialog>
  );
};
