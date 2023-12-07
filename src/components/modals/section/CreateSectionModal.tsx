import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateSectionSchema } from "@/schema/section";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSection } from "@/queries/sections";

import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isAxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrdinal } from "@/lib/utils";
import { getDeparments } from "@/queries/department";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateSectionModal = ({ isOpen, onClose }: Props) => {
  const departmentsQuery = useQuery({
    queryKey: ["departments"],
    queryFn: getDeparments,
  });

  const section_names = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const course_years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createSection,
  });

  const form = useForm<z.infer<typeof CreateSectionSchema>>({
    resolver: zodResolver(CreateSectionSchema),
    defaultValues: {
      name: "",
      departmentId: "",
      school_year: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateSectionSchema>) => {
    console.log(
      "🚀 ~ file: CreateSectionModal.tsx:48 ~ onSubmit ~ values:",
      values
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    mutation.mutate(values, {
      async onSuccess() {
        toast.success(`Section has been added`);
        await queryClient.invalidateQueries({
          queryKey: ["sections"],
        });
        form.reset();
        onClose();
      },
      onError(error) {
        if (isAxiosError(error)) {
          console.log(
            "🚀 ~ file: CreateSectionModal.tsx:110 ~ onError ~ error:",
            error
          );

          const errorKeys = Object.keys(error.response?.data.errors);
          errorKeys.forEach((key: any) => {
            form.setError(key, {
              type: "manual",
              message:
                error.response?.data.errors[key] || "Something went wrong",
            });
          });
        }
      },
    });
  };

  const isDisabled = form.formState.isSubmitting || form.formState.isLoading;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        onClose();
        !isOpen && form.reset();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Section</DialogTitle>
          <DialogDescription>add new section.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a section name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent id="name">
                          {section_names.map((name) => (
                            <SelectItem key={name} value={name}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a section name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departmentsQuery?.data?.map((department) => (
                            <SelectItem
                              key={department.id}
                              value={department.id}
                            >
                              {department.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="course_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Name</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {course_years.map((name) => (
                            <SelectItem key={name} value={name?.toString()}>
                              {getOrdinal(name)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="school_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Year</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isDisabled}
                          placeholder="e.g. 2021-2022"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={isDisabled}
                    variant="outline"
                    onClick={() => {
                      form.reset();
                    }}
                    className="disabled:pointer-events-auto disabled:cursor-not-allowed"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isDisabled} type="submit">
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CreateSectionModal;
