"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { useAcceptInvitation } from "../../hooks/use-accept-invitation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainButton } from "@/components/common/MainButton";

export const AcceptInvitationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { AcceptInvitationForm, onAcceptInvitation, isAcceptingInvitation } =
    useAcceptInvitation();

  // Set token from URL query params
  useEffect(() => {
    if (token) {
      AcceptInvitationForm.setValue("token", token);
    }
  }, [token, AcceptInvitationForm]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Accept Invitation</CardTitle>
          <CardDescription>
            Set your password to complete your account setup
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...AcceptInvitationForm}>
            <form
              className="space-y-4"
              onSubmit={AcceptInvitationForm.handleSubmit(onAcceptInvitation)}
            >
              <FormField
                control={AcceptInvitationForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={AcceptInvitationForm.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Confirm Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MainButton
                type="submit"
                disabled={isAcceptingInvitation}
                className="w-full"
                isLoading={isAcceptingInvitation}
                loadingText="Accepting Invitation..."
              >
                Accept Invitation
              </MainButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
