export interface IPv6AddressProps {
    originalIPv6Address: string,
    compressedIPv6Address: string,
}
export interface AppState {
    compressedIPv6Address: string,
    IPv6Addresses: IPv6AddressProps[]

};

export type AppAction = {
    type: "COMPRESS_ADDRESS",
    payload: {
        originalIPv6Address: string,
        compressedIPv6Address: string
    }
} | {
    type: "GET_COMPRESSED_ADDRESSES"
};

export interface AppContextType {
    state: AppState,
    dispatch: React.Dispatch<any>
};

export const reducer = (state: AppState, action: AppAction) => {

    switch (action.type) {


        case "COMPRESS_ADDRESS": {
            const { originalIPv6Address, compressedIPv6Address } = action.payload;

            const IPv6Addresses: IPv6AddressProps[] = [
                ...state.IPv6Addresses, {
                    originalIPv6Address,
                    compressedIPv6Address
                }];

            sessionStorage.setItem("IPv6Addresses", JSON.stringify(IPv6Addresses));

            return {
                ...state,
                compressedIPv6Address: "",
                IPv6Addresses
            }
        }

        case "GET_COMPRESSED_ADDRESSES": {
            const IPv6Addresses = JSON.parse(sessionStorage.getItem("IPv6Addresses") ?? "[]");

            return {
                ...state,
                IPv6Addresses
            }
        }

        default: {
            return state;
        }
    }
}

export const initialState: AppState = {
    compressedIPv6Address: "",
    IPv6Addresses: [],
}