import "../../css/orders.css";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { setSellerOrders } from '../../redux/actions/orders';
import Chip from '@mui/material/Chip';
import { Link, useNavigate } from "react-router-dom";

//mui imports
import { DataGrid } from "@mui/x-data-grid";

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import OrderDetails from "../../components/Order/OrderDetails";

const SellerOrders = () => {

    const { user, mode } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.orders);
    const [orderId, setOrderId] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        Store.dispatch(setSellerOrders())
    }, [])

    const columns = [
        {
            field: "description",
            headerName: "Description",
            flex: 1,
            renderCell: (params) => (
                <Link onClick={() => { setOpen(true), setOrderId(params.row._id) }}>
                    <h2 style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{params.value}</h2>
                </Link>
            ),
        },
        {
            field: "price",
            headerName: "Price",
            flex: 0.5,
            renderCell: (params) => (
                <h2>BDT. {params.value}</h2>
            ),
        },
        {
            field: "buyerUsername",
            headerName: "Buyer",
            flex: 0.75,
            renderCell: (params) => (
                <Chip label={params.value} color="secondary" />
            ),
        },
        {
            field: "isDelivered",
            headerName: "Status",
            flex: 0.4,
            renderCell: (params) => (
                <Chip label={params.value === true ? "Delivered" : "Ongoing"} color={params.value === true ? "success" : "warning"} />
            ),
        },
        {
            field: "createdAt",
            headerName: "Published",
            flex: 1,
            renderCell: (params) => {
                return formatDistanceToNow(new Date(params.value), {
                    addSuffix: true,
                });
            },
        },
    ];

    //console.log(orders, user)

    return (
        <div className='orders-container'>
            <h1>Your Orders</h1>

            {
                orders ? (
                    <div className="orders">
                        <div className="orders-section">
                            <DataGrid
                                disableRowSelectionOnClick
                                rowHeight={75}
                                loading={!orders}
                                getRowId={(row) => row._id}
                                rows={orders || []}
                                columns={columns}
                                sx={{
                                    m: 2,
                                    fontFamily: "Poppins",
                                    "& .MuiDataGrid-cell": {
                                        paddingLeft: "40px",
                                        cursor: "pointer",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        paddingLeft: "30px",
                                        fontWeight: "bolder",
                                    },
                                }}
                            />
                        </div>
                        <OrderDetails
                            orderID={orderId}
                            open={open}
                            setOpen={setOpen}
                        />
                    </div>
                ) : (
                    <div style={{textAlign: "center", marginTop: "20px"}}>
                        <h2>You have no orders</h2>
                        <p>Try and create a <strong>Project</strong> to attract more buyers</p>
                    </div>
                )
            }
        </div>
    )
}

export default SellerOrders