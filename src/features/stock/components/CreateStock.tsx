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
import { MainButton } from "@/components/common/MainButton";
import { useCreateStock } from "../hooks/useCreateStock";
import { handleNumberInput } from "@/shared/utils/handle-number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STOCK_UNITS } from "../constants/stock.constants";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Package } from "lucide-react";

export const CreateStock = () => {
  const router = useRouter();
  const { CreateStockForm, onCreateStock, isCreatingStock } =
    useCreateStock();
  const isValid = CreateStockForm.formState.isValid;

  return (
    <div className="">
      <Card className="dark:bg-main-black">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Package className="h-6 w-6 text-light-green" /> Create New Stock
          </CardTitle>
          <CardDescription>
            Add a new stock item to your system by filling out the form below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...CreateStockForm}>
            <form
              className="grid gap-6"
              onSubmit={CreateStockForm.handleSubmit(onCreateStock)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={CreateStockForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Stock Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={CreateStockForm.control}
                  name="default_buy_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Buy Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Buy Price"
                          onChange={(event) => handleNumberInput({ field, event })}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateStockForm.control}
                  name="default_sale_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sale Price"
                          onChange={(event) => handleNumberInput({ field, event })}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateStockForm.control}
                  name="unit_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {STOCK_UNITS.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={CreateStockForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isCreatingStock}
                >
                  Cancel
                </Button>
                <MainButton
                  disabled={!isValid || isCreatingStock}
                  isLoading={isCreatingStock}
                  loadingText="Creating Stock..."
                >
                  Create Stock
                </MainButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
