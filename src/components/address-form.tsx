"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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


import { compressIPv6Address } from "@/utils/compress-ipv6";
import { useAppContext } from "@/contexts/app";

const formSchema = z.object({
    address: z.string().max(39).ip({ version: "v6", message: "Please provide a valid invalid IPv6 address." }).trim().toLowerCase()
});

const AddressForm = () => {

    const { state, dispatch } = useAppContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>): void => {
        const compressedIPv6Address = compressIPv6Address(values.address);

        dispatch({
            type: "COMPRESS_ADDRESS",
            payload: {
                compressedIPv6Address
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>IPv6 address</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                A valid IPv6 address in the preferred format.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default AddressForm;