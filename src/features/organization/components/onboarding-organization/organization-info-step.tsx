"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { TCreateOrganizationDTO } from "../../schema/organization.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export const OrganizationInfoStep = () => {
  const form = useFormContext<TCreateOrganizationDTO>();

  const country_code = useWatch({
    control: form.control,
    name: "country_code",
  });

  useEffect(() => {
    if (country_code === "SA") {
      form.setValue("tax_scheme", "ZATCA_PHASE1");
    } else {
      form.setValue("tax_scheme", "UAE_TAX");
    }
  }, [country_code]);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Organization Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SA">Saudi Arabia</SelectItem>
                    <SelectItem value="AE">United Arab Emirates</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription className="text-light-green">
                  This will determine the VAT information of your organization
                  and can't be changed later.
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vat_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>VAT Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter VAT number (15 digits)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="business_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Category</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g., Retail, Services" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
