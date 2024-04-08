export interface AppState {
    compressedIPv6Address: string,
    compressedIPv6Addresses: string[]

};

export type AppAction = {
    type: "COMPRESS_ADDRESS",
    payload: { compressedIPv6Address: string }
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
            const compressedIPv6Addresses: string[] = [...state.compressedIPv6Addresses, action.payload.compressedIPv6Address];
    
            sessionStorage.setItem("compressedIPv6Addresses", JSON.stringify(compressedIPv6Addresses));
        }

        case "GET_COMPRESSED_ADDRESSES": {
            const compressedIPv6Addresses = JSON.parse(sessionStorage.getItem("compressedIPv6Addresses") ?? "[]");

            return {
                ...state,
                compressedIPv6Addresses
            }
        }

        default: {
            return state;
        }
    }
}

export const initialState: AppState = {
    compressedIPv6Address: "",
    compressedIPv6Addresses: [],
}