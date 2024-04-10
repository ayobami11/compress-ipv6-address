"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { useAppContext } from "@/contexts/app";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { compressIPv6Address } from "@/utils/compress-ipv6";

const formSchema = z.object({
    address: z.string().max(39).ip({ version: "v6", message: "Please provide a valid IPv6 address." }).trim().toLowerCase()
});

const AddressForm = () => {

    const { state, dispatch } = useAppContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
        },
    });

    const { errors } = useFormState({
        control: form.control
    });

    const onSubmit = (values: z.infer<typeof formSchema>): void => {

        const compressedIPv6Address = compressIPv6Address(values.address);

        dispatch({
            type: "COMPRESS_ADDRESS",
            payload: {
                originalIPv6Address: values.address,
                compressedIPv6Address
            }
        });

        form.resetField("address");
    }


    return (
        <>
            <Form {...form}>
                <form method="POST" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={cn(errors.address && "text-red-500")}>IPv6 address</FormLabel>
                                <FormControl>
                                    <Input className={cn(errors.address && "focus-visible:ring-red-500")} {...field} />
                                </FormControl>
                                <FormDescription>
                                    A valid IPv6 address in the <a
                                        href="https://www.ciscopress.com/articles/article.asp?p=2803866"
                                        target="_blank"
                                        rel="noopener noreferrer">preferred format</a>.
                                </FormDescription>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            <p className="text-sm my-5">Find out more about <a
                href="https://ipcisco.com/lesson/private-ip-address-ranges"
                target="_blank"
                rel="noopener noreferrer"
            >public, private and reserved IP addresses</a>.</p>

            {
                state.IPv6Addresses.length ?
                    <Separator className="my-8" /> : null
            }
        </>
    );
}

export default AddressForm;