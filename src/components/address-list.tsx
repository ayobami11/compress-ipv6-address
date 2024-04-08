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
        <ul className="flex flex-col gap-2 my-4">
            {React.Children.toArray(
                state.compressedIPv6Addresses.map((compressedAddress) => (
                    <li>
                        <AddressItem
                            description={compressedAddress}
                            variant={
                                (compressedAddress.startsWith("fc00") || compressedAddress.startsWith("fd00")) ?
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