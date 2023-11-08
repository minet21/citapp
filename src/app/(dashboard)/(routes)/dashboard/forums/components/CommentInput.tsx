import EmojiPicker from '@/components/EmojiPicker';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { mutationFn } from '@/hooks/useTanstackQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Send } from 'lucide-react';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const CommentInput = () => {
    const formSchema = z.object({
        content: z.string().min(1),
      });
    
      type formType = z.infer<typeof formSchema>;
      const form = useForm<formType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content: "",
        },
        mode: "all",
      });
    
      type AddCommentSchema = {
        description: string;
        postId: string;
      };
    
      const addComment = useMutation({
        mutationFn: (value: AddCommentSchema) => mutationFn('/comments', null, 'POST', value),
      })
    
      const isLoading = form.formState.isSubmitting;
    
      const { handleSubmit } = form;
      const { toast } = useToast();
    
      const onSubmit: SubmitHandler<formType> = async (values) => {
        try {
          addComment.mutate(
            {
              description: values.content,
              postId: '' as string, // this is the id of job post
            },
            {
              onSuccess(data, variables, context) {
                toast({
                  variant: "default",
                  description: "Your comment has been sent.",
                });
                form.reset();
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      };
      
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="my-5">
              <FormControl>
                <div className="flex items-center border rounded-md border-zinc-400 px-2">
                  <EmojiPicker
                    onChange={(emoji: any) => {
                      field.onChange(`${field.value}${emoji.native}`);
                    }}
                  />
                  <Input
                    className="border-none border-0 active:outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm bg-inherit"
                    {...field}
                    placeholder="Write comment"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default CommentInput