"use client"

import React, { useEffect } from "react";

import { useAppContext } from "@/contexts/app";

import AddressItem from "@/components/address-item";

const AddressList = () => {

    const { state, dispatch } = useAppContext();

    useEffect(() => {
        dispatch({ type: "GET_COMPRESSED_ADDRESSES" });
    }, [dispatch]);

    return (
        <ul className="flex flex-col gap-3 my-4">
            {React.Children.toArray(
                state.IPv6Addresses.map(({ originalIPv6Address, compressedIPv6Address }) => (
                    <li>
                        <AddressItem
                            originalIPv6Address={originalIPv6Address}
                            compressedIPv6Address={compressedIPv6Address}
                            variant={
                                (compressedIPv6Address.startsWith("fc00") || compressedIPv6Address.startsWith("fd00")) ?
                                    "private" : "public"
                            }
                        />
                    </li>
                ))
            )}
        </ul>
    )
}

export default AddressList;