import React, { useState } from 'react';
import "../../css/seller.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateInfoForm from '../../components/Seller/UpdateInfoForm';

const SellerStarter = () => {
  const [open, setOpen] = useState(false);
  const [starter, setStarter] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  //console.log("first")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setAgreeTerms(true);
    setStarter(true);
  };

  return (
    <div>
      {(!starter && !agreeTerms) ? (
        <div className="seller-container">
          <h1>Join in to a thriving community of freelancers around you</h1>
          <button className="sellerbtn1" onClick={handleClickOpen}>
            Become a Seller
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              "&.MuiDialog-root": {},
            }}
          >
            <div style={{ padding: "24px" }}>
              <DialogTitle id="alert-dialog-title">
                {"Terms and Conditions"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolores, eaque. Illum nostrum cum, rerum error similique esse
                  suscipit culpa voluptatem aperiam, possimus numquam provident
                  praesentium doloremque necessitatibus placeat. Molestias,
                  assumenda. Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Soluta voluptate culpa ipsa nihil reprehenderit, aliquid
                  delectus animi veniam eveniet quas eos? Exercitationem
                  dignissimos consequuntur, perferendis placeat ipsam voluptatem
                  esse quasi? Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Ratione harum doloribus dolores illum dolor
                  facilis, dignissimos iste laudantium esse id molestiae
                  temporibus dicta. Nihil, enim illum doloremque commodi maxime
                  aliquid? Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Assumenda quis possimus ipsum sed, magnam, itaque vel
                  iure a error inventore porro. Nobis vitae consectetur dolorum!
                  Architecto reprehenderit voluptatibus aspernatur modi. Lorem
                  ipsum dolor sit amet consectetur adipisicing elit. Harum nobis
                  quisquam omnis excepturi rerum facilis dolor fugiat doloribus
                  tenetur pariatur quae quidem eos facere necessitatibus
                  officiis, esse sed odio accusamus? Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit. Suscipit soluta, in placeat
                  aliquam numquam enim itaque amet impedit temporibus. Ad,
                  debitis possimus velit et omnis hic iure doloremque provident
                  asperiores.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button className="sellerbtn2" onClick={handleClose}>
                  Disagree
                </button>
                <button onClick={handleAgree} autoFocus>
                  Agree
                </button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      ) : (
        <UpdateInfoForm />
      )}
    </div>
  );
}

export default SellerStarter