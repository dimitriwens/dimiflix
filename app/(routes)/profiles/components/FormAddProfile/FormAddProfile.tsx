"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { FormAddProfileProps } from "./FormAddProfile.types";
import { formSchema } from "./FormAddProfile.form";
import { dataProfilesImages } from "./FormAddProfile.data"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function FormAddProfile(props: FormAddProfileProps) {
    const { setOpen } = props;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          profileName: "",
          avatarUrl: undefined,
        },
      })

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setIsLoading(true);
          const response = await axios.post("/api/userNetflix", values);
          if (response.status !== 200) {
            toast({
              title: "An error has occured",
              variant: "destructive",
            });
          } else {
            toast({
              title: "User successfully created!",
            });
          }
          router.refresh();
          setOpen(false);
        } catch (error) {
          console.log(error);
          toast({ title: "An error has occured", variant: "destructive" });
    
          setIsLoading(false);
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profileName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile name</FormLabel>
                  <FormControl>
                    <Input placeholder="Profile name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatarUrl"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Choose your profile picture</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-y-1"
                    >
                      {dataProfilesImages.map((data) => (
                        <FormItem
                          key={data.urlImage}
                          className="flex  flex-col-reverse justify-center items-center space-x-5 space-y-0 cursor-pointer  w-full rounded-lg "
                        >
                          <FormControl className="hidden">
                            <RadioGroupItem  value={data.urlImage} />
                          </FormControl>
                          <FormLabel className="font-normal flex justify-center w-full ">
                            <Image
                              src={data.urlImage}
                              alt="Profile"
                              width={50}
                              height={50}
                              className={
                                field.value === data.urlImage
                                  ? "cursor-pointer border-white border rounded-lg before:hover:scale-150 transition-all duration-300 scale-125 "
                                  : "rounded-lg hover:scale-150 transition-all duration-300 "
                              }
                            />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Create new user
            </Button>
          </form>
        </Form>
      );
    }