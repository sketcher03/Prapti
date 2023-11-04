import Store from "../../redux/store";
import { deleteProject } from "../../redux/actions/projects";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "../../css/PopupForm.css";
import { setAllProjects, setProjects } from '../../redux/actions/projects';
import { useEffect, useState } from 'react';

//date ffns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const ProjectDetails = (props) => {

  const { projects } = useSelector((state) => state.projects);
  const { isAdminAuthenticated, admin } = useSelector((state) => state.admin);

  //console.log(projects)

  useEffect(() => {
    console.log(isAdminAuthenticated);
    // console.log(user)

    if (isAdminAuthenticated) {
      Store.dispatch(setAllProjectsAdmin());
    }
    else {
      if (mode === "seller") {
        Store.dispatch(setAllProjects());
      }
      else {
        Store.dispatch(setProjects());
      }
    }


  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleDelete = async () => {

    if (isAdminAuthenticated) {
      Store.dispatch(deleteProjectAdmin(props.projectID));
    }
    else {
      Store.dispatch(deleteProject(props.projectID));
    }

    handleClose();
  };

  //console.log(props.projectID)

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        PaperProps={{
          style: {
            backgroundColor: "#f0fff8",
            borderRadius: "20px",
            width: "750px",
            display: "flex",

          },
        }}
      >
        {mode === "seller" || isAdminAuthenticated ? (
          projects
            .filter((project) => project._id === props.projectID)
            .map((filteredproject) => (
              <div className="request-each" key={filteredproject._id}>
                <DialogTitle
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    margin: "20px 0px",
                  }}
                >
                  {filteredproject.title}
                </DialogTitle>
                <DialogContent>
                  <p>
                    <strong>Description: </strong>
                    {filteredproject.description}
                  </p>
                  <p>
                    <strong>Project Deliverables: </strong>
                    {filteredproject.deliverables.map((deliverable) => (
                      <p style={{ paddingLeft: "10px" }}>{deliverable}</p>
                    ))}
                  </p>
                  <p>
                    <strong>Categories: </strong>
                    {filteredproject.category.map((category) => (
                      <p>{category}</p>
                    ))}
                  </p>
                  <p>
                    <strong>Price Tiers: </strong>
                    {filteredproject.priceTiers.map((priceTier) => (
                      <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                        <p><strong>Title: </strong>{priceTier.tier_title}</p>
                        <p><strong>Description: </strong>{priceTier.tier_description}</p>
                        <p><strong>Deliverables: </strong>{priceTier.tier_deliverables}</p>
                        <p><strong>Price: </strong>{priceTier.tier_price}</p>
                      </div>
                    ))}
                  </p>
                  <p>
                    <strong>Wanted Requirements: </strong>
                    {filteredproject.requirements.map((req) => (
                      <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                        <p><strong>Title: </strong>{req.req_title}</p>
                        <p><strong>Description: </strong>{req.req_type}</p>
                      </div>
                    ))}
                  </p>
                  <p className="date">
                    Published{" "}
                    {formatDistanceToNow(new Date(filteredproject.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </DialogContent>

              </div>
            ))
        ) : (
          projects
            .filter((project) => project._id === props.projectID)
            .map((filteredproject) => (
              <div className="request-each" key={filteredproject._id}>
<DialogTitle
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    fontSize: "24px",
                    margin: "20px 0px",
                  }}
                >
                  {filteredproject.title}
                </DialogTitle>
                <DialogContent>
                  <p>
                    <strong>Description: </strong>
                    {filteredproject.description}
                  </p>
                  <p>
                    <strong>Project Deliverables: </strong>
                    {filteredproject.deliverables.map((deliverable) => (
                      <p style={{ paddingLeft: "10px" }}>{deliverable}</p>
                    ))}
                  </p>
                  <p>
                    <strong>Categories: </strong>
                    {filteredproject.category.map((category) => (
                      <p>{category}</p>
                    ))}
                  </p>
                  <p>
                    <strong>Price Tiers: </strong>
                    {filteredproject.priceTiers.map((priceTier) => (
                      <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                        <p><strong>Title: </strong>{priceTier.tier_title}</p>
                        <p><strong>Description: </strong>{priceTier.tier_description}</p>
                        <p><strong>Deliverables: </strong>{priceTier.tier_deliverables}</p>
                        <p><strong>Price: </strong>{priceTier.tier_price}</p>
                      </div>
                    ))}
                  </p>
                  <p>
                    <strong>Wanted Requirements: </strong>
                    {filteredproject.requirements.map((req) => (
                      <div style={{ paddingLeft: "10px", marginBottom: "10px" }}>
                        <p><strong>Title: </strong>{req.req_title}</p>
                        <p><strong>Description: </strong>{req.req_type}</p>
                      </div>
                    ))}
                  </p>
                  <p className="date">
                    Published{" "}
                    {formatDistanceToNow(new Date(filteredproject.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </DialogContent>
              </div>
            ))
        )
        }
        <DialogActions style={{ display: "flex", justifyContent: "space-evenly", height: "100%", alignItems: "center", marginBottom: "60px" }}>
          <button className="close-popup" onClick={handleClose}>
            Close
            <CloseIcon />
          </button>
          <Link
            to={(mode === "seller") ? "/" : `/projects/update/${props.requestID}`}
            className="edit-req"
          >
            {(mode === "seller") ? "Apply" : "Edit"}
            {(mode === "seller") ? <ForwardIcon /> : <EditIcon />}
          </Link>
          {
            !(mode === "seller") ? (
              <button className="delete-req" onClick={handleDelete}>
                Delete
                <DeleteForeverIcon />
              </button>
            ) : (
              <button className="delete-req" onClick={handleDelete}>
                Save
                <FavoriteIcon />
              </button>
            )
          }

        </DialogActions>
        {props.children}
      </Dialog>
    </div>
  )
}

export default ProjectDetails;