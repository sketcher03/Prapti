import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/project.css";
import "../../css/PopupForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { server } from "../../../server";
import Store from "../../redux/store";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RxAvatar } from "react-icons/rx";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import '../../css/Login_Signup.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";


const SellerStarterForm = () => {
  //const { user } = useSelector((state) => state.user);
  //console.log(user);
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Starter',
    'Description',
    'Pricing',
    'Requirements',
    'Portfolio',
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const category = ["Photography", "Graphic Design", "Traditional Painting", "Printing Art", "Repairs", "Crafting", "Programming", "Banking"];
  const req_type = ["text", "file", "number"];

  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  //const [image, setImage] = useState();

  const [data, setData] = useState({
    title: "",
    description: "",
    deliverables: [""],
    priceTiers: [
      {
        tier_title: '',
        tier_price: "",
        tier_description: '',
        tier_deliverables: '',
      }
    ],
    requirements: [
      {
        req_title: "",
        req_type: "",
      }
    ]
  });

  const handleUploadFiles = files => {
    const uploaded = [...images];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    })
    setImages(uploaded);
  }

  const handleFileInput = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files)
    handleUploadFiles(chosenFiles);
  };


  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const handleRemoveDeliverable = (i) => {
    const list = [...data.deliverables];
    list.splice(i, 1);

    setData({ ...data, deliverables: list });
  };

  const handleAddDeliverable = () => {
    setData({
      ...data,
      deliverables: [...data.deliverables, ""],
    });
  };

  const handleFeatureChange = (e, i) => {
    e.preventDefault();
    const { value } = e.target;
    const list = [...data.deliverables];
    list[i] = value;

    setData({ ...data, deliverables: list });
  };

  const handlePriceChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...data.priceTiers];
    list[i][name] = value;

    setData({ ...data, priceTiers: list });
  };

  const handleRemovePrice = (i) => {
    const list = [...data.priceTiers];
    list.splice(i, 1);

    setData({ ...data, priceTiers: list });
  };

  const handleAddPrice = () => {
    setData({
      ...data,
      priceTiers: [...data.priceTiers, {
        tier_title: '',
        tier_price: 0,
        tier_description: '',
        tier_deliverables: '',
      }],
    });
  };

  const handleReqChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...data.requirements];
    list[i][name] = value;

    setData({ ...data, requirements: list });
  };

  const handleRemoveReq = (i) => {
    const list = [...data.requirements];
    list.splice(i, 1);

    setData({ ...data, requirements: list });
  };

  const handleAddReq = () => {
    setData({
      ...data,
      requirements: [...data.requirements, {
        req_title: "",
        req_type: "",
      }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    console.log("submit clicked");
  };

  const CurrentStep = (props) => {

    if (props.index === 0) {
      return (
        <div className="project-steps">
          <div>
            <label className="create-project-label">Give your Project a Title</label>
            <input
              type="text"
              className="create-project-input"
              name="title"
              placeholder="I will paint a wall for you. . ."
              value={data.title}
              onChange={handleChange}
            />
          </div>

          <label className="create-project-label">Select some categories you project fall into</label>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={category}
            filterSelectedOptions
            ChipProps={{
              sx: {
                fontFamily: "poppins",
                minHeight: "40px",
                padding: "10px 5px",
                "& .MuiChip-label": {
                  paddingTop: "18px",
                },
              },
            }}
            sx={{
              fontFamily: "poppins",
              margin: "15px 0px",
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Painting, Photography, etc" />
            )}
          />
        </div>
      )
    }
    if (props.index === 1) {
      return (
        <div className="project-steps">
          <label className="create-project-label">Project Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            placeholder="Tell us more about yourself"
          ></textarea>

          <label className="create-project-label">Give your Deliverables</label>
          <div>
            {data.deliverables.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1.5px solid #c0c0c0",
                  borderRadius: "10px",
                  padding: "2%",
                }}
              >

                <input
                  type="text"
                  name="feature"
                  onChange={(e) => handleFeatureChange(e, i)}
                  placeholder="Ex - Photography"
                  value={item}
                  className="create-project-shortinput"
                />


                <div style={{ display: "flex" }}>
                  {data.deliverables.length - 1 === i &&
                    !(data.deliverables.length === 3) && (
                      <button
                        className="projectbtn5"
                        onClick={handleAddDeliverable}
                      >
                        <AddIcon />
                      </button>
                    )}
                  {data.deliverables.length !== 1 && (
                    <button
                      className="projectbtn5"
                      onClick={() => handleRemoveDeliverable(i)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    if (props.index === 2) {
      return (
        <div className="project-steps">
          <label className="create-project-label">Set some price tiers for your project</label>
          <div>
            {data.priceTiers.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1.5px solid #c0c0c0",
                  borderRadius: "10px",
                  padding: "2%",
                }}
              >

                <div>
                  <TextField
                    type="text"
                    name="tier_title"
                    label="Tier Title"
                    onChange={(e) => handlePriceChange(e, i)}
                    placeholder="Platinum Package"
                    defaultValue={item.tier_title}
                    className="create-project-shortinput"
                    sx={{
                      marginBottom: "12px",
                      width: "580px"
                    }}
                    InputProps={{ sx: { borderRadius: "8px" } }}
                  />
                  <TextField
                    type="number"
                    name="tier_price"
                    label="Tier Price"
                    onChange={(e) => handlePriceChange(e, i)}
                    placeholder="Platinum Package"
                    defaultValue={item.tier_price}
                    className="create-project-shortinput"
                    sx={{ marginBottom: "12px", width: "580px" }}
                    InputProps={{ sx: { borderRadius: "8px" } }}
                  />
                  <TextField
                    type="text"
                    name="tier_description"
                    label="Tier Description"
                    onChange={(e) => handlePriceChange(e, i)}
                    placeholder="Platinum Package"
                    defaultValue={item.tier_description}
                    className="create-project-shortinput"
                    multiline
                    rows={5}
                    sx={{ marginBottom: "12px", width: "580px" }}
                    InputProps={{ sx: { borderRadius: "8px" } }}
                  />
                  <TextField
                    type="text"
                    name="tier_deliverables"
                    label="Tier Deliverables"
                    onChange={(e) => handlePriceChange(e, i)}
                    placeholder="Platinum Package"
                    defaultValue={item.tier_deliverables}
                    className="create-project-shortinput"
                    sx={{ marginBottom: "12px", width: "580px" }}
                    InputProps={{ sx: { borderRadius: "8px" } }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  {data.priceTiers.length - 1 === i &&
                    !(data.priceTiers.length === 3) && (
                      <button
                        className="projectbtn5"
                        onClick={handleAddPrice}
                      >
                        <AddIcon />
                      </button>
                    )}
                  {data.priceTiers.length !== 1 && (
                    <button
                      className="projectbtn5"
                      onClick={() => handleRemovePrice(i)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    if (props.index === 3) {
      return (
        <div className="project-steps">
          <label className="create-project-label">Give some requirements to ask buyer before they place an order.</label>
          <div>
            {data.requirements.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  marginBottom: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1.5px solid #c0c0c0",
                  borderRadius: "10px",
                  padding: "2%",
                }}
              >

                <div className="create-project-shortinput">
                  <input
                    type="text"
                    name="feature"
                    onChange={(e) => handleReqChange(e, i)}
                    placeholder="Ex - Photography"
                    value={item.req_title}
                  />

                  <Autocomplete
                    id="combo-box-demo"
                    options={req_type}
                    ChipProps={{
                      sx: {
                        fontFamily: "poppins",
                        minHeight: "40px",
                        padding: "10px 5px",
                        "& .MuiChip-label": {
                          paddingTop: "18px",
                        },
                      },
                    }}
                    sx={{
                      fontFamily: "poppins",
                      margin: "15px 0px",
                    }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Text/File/Number" />
                    )}
                  />
                </div>


                <div style={{ display: "flex" }}>
                  {data.requirements.length - 1 === i &&
                    !(data.requirements.length === 3) && (
                      <button
                        className="projectbtn5"
                        onClick={handleAddReq}
                      >
                        <AddIcon />
                      </button>
                    )}
                  {data.requirements.length !== 1 && (
                    <button
                      className="projectbtn5"
                      onClick={() => handleRemoveReq(i)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    if (props.index === 4) {
      return (
        <div className="project-steps">
          <label className="create-project-label">Upload some images as the Portfolio of your Project</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {images?.map((file, i) => (
              <span
                style={{
                  height: "5.5rem",
                  width: "5.5rem",
                  overflow: "hidden",
                  marginLeft: "24px",
                }}
              >
                <div key={i} style={{ display: "flex" }}>
                  <Avatar
                    sx={{ width: "100%", height: "100%", marginBottom: "30px" }}
                    alt="Profile Picture"
                    variant="rounded"
                    src={URL.createObjectURL(file)}
                  />
                </div>
              </span>
            ))}
            <label
              htmlFor="file-input"
              style={{
                marginLeft: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                padding: "20px",
                paddingTop: "45px",
                border: "1px solid grey",
                borderRadius: "6px",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "500",
                color: "grey",
                backgroundColor: "white",
              }}
            >
              <span>Upload a file</span>

              <input
                type="file"
                name="profilePic"
                id="file-input"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={handleFileInput}
                className="sr-only"
              />
            </label>
          </div>
        </div>

      )
    }
  }

  return (
    <div className="project-container">

      <form style={{ width: "750px" }} onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>
          Create your First Project <br />{" "}
          <span>Let's create something you excel at</span>
        </h3>
        <Stepper sx={{ fontFamily: "Poppins" }} activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {

            return (
              <Step
                sx={{
                  "& .MuiStepIcon-root": {
                    color: "green",
                    fontSize: "30px",
                    margin: "auto"
                  }
                }}
                key={label}>
                <StepLabel sx={{ margin: "auto" }} optional={
                  index === 4 ? (
                    <Typography sx={{ marginRight: "30px" }} variant="caption">Last step</Typography>
                  ) : null
                }>{label}</StepLabel>
                <StepContent >
                  {CurrentStep({ index: index })}
                  <div>
                    <button
                      onClick={handleNext}
                      className="projectbtn4"
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </button>
                    <button
                      disabled={index === 0}
                      onClick={handleBack}
                      className="projectbtn4"
                    >
                      Back
                    </button>
                  </div>
                </StepContent>
              </Step>
            )
          })}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - You may proceed to your dashboard</Typography>
            <button onClick={() => navigate('/')} sx={{ mt: 1, mr: 1 }}>
              Go to dashboard
            </button>
          </Paper>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SellerStarterForm;
