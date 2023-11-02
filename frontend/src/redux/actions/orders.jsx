import axios from "axios";
import { server } from "../../../server";

//create Order
export const createOrder = (newOrder, setError) => async (dispatch) => {
    try {
        dispatch({
            type: "SetOrders",
        });

        await axios
            .post(`${server}/orders/create`, newOrder, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res.data.order);

                setError(res.data.message);

                dispatch({
                    type: "CreateOrderSuccess",
                    payload: res.data.order,
                });
            })
            .catch((err) => {
                setError(err.response.data.message);

                dispatch({
                    type: "CreateOrderFailure",
                    payload: err.response.data.message,
                });
            });

    }
    catch (error) {
        setError(error.message);

        dispatch({
            type: "CreateOrderFailure",
            payload: error.message,
        });
    }
}

//set buyer orders
export const setBuyerOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetOrders",
        });

        const url = `${server}/orders/buyer`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetBuyerOrdersSuccess",
                    payload: res.data.buyerOrders,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "SetBuyerOrdersFailure",
                    payload: error.response.data.message,
                });
            });
    }
    catch (err) {
        dispatch({
            type: "SetBuyerOrdersFailure",
            payload: err.response.data.message,
        });
    }
};

//set seller orders
export const setSellerOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: "SetOrders",
        });

        const url = `${server}/orders/seller`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetSellerOrdersSuccess",
                    payload: res.data.buyerOrders,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "SetSellerOrdersFailure",
                    payload: error.response.data.message,
                });
            });
    }
    catch (err) {
        dispatch({
            type: "SetSellerOrdersFailure",
            payload: err.response.data.message,
        });
    }
};

//set a single order
export const getOrder = (orderId) => async (dispatch) => {
    try {
        dispatch({
            type: "SetOrders",
        });

        const url = `${server}/orders/${orderId}`;

        await axios.get(url, { withCredentials: true })
            .then((res) => {
                //console.log(res);
                dispatch({
                    type: "SetOrderSuccess",
                    payload: res.data.order,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "SetOrderFailure",
                    payload: error.response.data.message,
                });
            });
    }
    catch (err) {
        dispatch({
            type: "SetOrderFailure",
            payload: err.response.data.message,
        });
    }
};