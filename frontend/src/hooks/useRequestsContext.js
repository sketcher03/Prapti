import { RequestsContext } from "../context/RequestContext";
import { useContext } from "react";

export const useRequestContext = () => {
    const context = useContext(RequestsContext);

    if(!context) {
        throw Error('useRequestsContext must be used inside a RequestsContextProvider');
    }

    return context;
}