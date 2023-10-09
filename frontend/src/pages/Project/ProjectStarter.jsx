import React, { useState } from "react";
import '../../css/project.css';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProjectCreateForm from "../../components/Project/ProjectCreateForm";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const ProjectStarter = () => {
  const [open, setOpen] = useState(false);
  const [understood, setUnderstood] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setUnderstood(true);
  };

  return (
    <div>
      {!understood ? (
        <div className="project-container">
          <h1>Ready to create your first project?</h1>
          <button className="projectbtn1" onClick={handleClickOpen}>
            Take your first step
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="lg"
            PaperProps={{
              style: {
                backgroundColor: "#f0fff8",
                borderRadius: "20px",
              },
            }}
          >
            <div style={{ padding: "24px" }}>
              <DialogTitle
                id="alert-dialog-title"
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  fontFamily: "Poppins",
                  fontSize: "24px",
                  margin: "20px 0px",
                }}
              >
                {"Some Advices"}
              </DialogTitle>
              <DialogContent>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      borderRight: "3px solid #b4b4b4",
                      padding: "30px",
                    }}
                  >
                    <p>
                      <span>1</span>Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Harum unde, soluta sapiente saepe,
                      minima, nesciunt quis error odit iusto corrupti et
                      aspernatur. Reiciendis architecto, doloremque labore
                      repellat nostrum cumque minus.
                    </p>
                  </div>
                  <div
                    style={{
                      borderRight: "3px solid #b4b4b4",
                      padding: "30px",
                    }}
                  >
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Harum unde, soluta sapiente saepe, minima, nesciunt quis
                      error odit iusto corrupti et aspernatur. Reiciendis
                      architecto, doloremque labore repellat nostrum cumque
                      minus.
                    </p>
                  </div>
                  <div style={{ padding: "30px" }}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Harum unde, soluta sapiente saepe, minima, nesciunt quis
                      error odit iusto corrupti et aspernatur. Reiciendis
                      architecto, doloremque labore repellat nostrum cumque
                      minus.
                    </p>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <button className="projectbtn2" onClick={handleClose}>
                  Cancel
                </button>
                <button className="projectbtn3" onClick={handleAgree} autoFocus>
                  Proceed <KeyboardDoubleArrowRightIcon />
                </button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      ) : (
        <ProjectCreateForm />
      )}
    </div>
  );
}

export default ProjectStarter;