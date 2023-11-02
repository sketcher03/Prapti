import "../../css/orders.css";
import Store from "../../redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { getOrder } from "../../redux/actions/orders";

const OrderDetails = (props) => {

    const { order } = useSelector((state) => state.orders);
    const { mode } = useSelector((state) => state.user);

    const handleClose = () => {
        props.setOpen(false);
    };

    useEffect(() => {
        
        Store.dispatch(getOrder(props.orderID));

    }, [mode]);

    console.log(order);

    return (
        <div className="order-details">

            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="lg"
                PaperProps={{
                    style: {
                        backgroundColor: "white",
                        borderRadius: "20px",
                        width: "750px",
                        display: "flex",
                    },
                }}
            >
                <div>
                    <h1>Order ID: { order._id }</h1>

                </div>

            </Dialog>
            
        </div>
    )
}

export default OrderDetails