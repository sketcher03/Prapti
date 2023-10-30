import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import '../../css/project.css';
import { server } from "../../../server";
import axios from 'axios';
import { accessChats } from '../../redux/actions/chats';
import Store from "../../redux/store";
import { useSelector } from 'react-redux';

//MUI imports
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Divider from '@mui/material/Divider';
import GpsNotFixedIcon from '@mui/icons-material/GpsNotFixed';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Avatar from "@mui/material/Avatar";
import Rating from '@mui/material/Rating';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const SingleProject = () => {

    const param = useParams();

    const { chats } = useSelector((state) => state.chats);
    const { user } = useSelector((state) => state.user);

    //console.log(param.id);
    const [error, setError] = useState(null);

    const [userImage, setUserImage] = useState('');

    const [projectData, setProjectData] = useState({
        title: "",
        category: [""],
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
                req_type: "text",
            }
        ],
        pictures: [''],
        user_id: ""
    });

    const [userData, setUserData] = useState({
        verified: false,
        display_name: "",
        username: "",
        description: ""
    });

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = projectData.priceTiers.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleOrder = () => {
        console.log("Order Placed");
    };

    const handleChat = () => {
        console.log("chat creation pressed");

        Store.dispatch(accessChats(chats, setError, userData._id, user._id));
    };

    useEffect(() => {

        try {
            const projectID = param.id;

            const url = `${server}/projects/${projectID}`;

            axios.get(url, { withCredentials: true })
                .then((res) => {
                    console.log(res);

                    setProjectData(res.data.project);
                    setUserData(res.data.user);
                    setUserImage(res.data.user.profilePic);

                })
                .catch((err) => {
                    setError(err.response.data.message);
                })

            //console.log(projectData, userData);
        }
        catch (error) {
            setError(error.message);
        }
        
    }, [])

    //console.log(user._id);
    //console.log(userData._id);

    //console.log(projectData,  userData);

    return (
        <div className='single-project-container'>
            <div className="project-info">
                <h1 className='project-title'>{projectData.title}</h1>
                
                <Swiper
                    modules={[Pagination, Scrollbar]}
                    spaceBetween={1}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSlideChange={() => console.log('slide change')}
                    className='project-carousel'
                >
                    {
                        projectData.pictures.map((image) => (
                            <SwiperSlide key={image} className='carousel'>
                                <img
                                    className='project-carousel-images'
                                    alt="Profile Picture"
                                    src={`${server}/${image}`}
                                />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

                <div className="project-description">
                    <h2 className='project-title'>Project Description</h2>
                    <p>{projectData.description}</p>
                </div>
                
            </div>
            <div className="project-priceTiers" >
                <div style={{ marginLeft: "18px", marginBottom: "18px", display: 'flex' }}>
                    {
                        projectData.category.map((category, index) => (
                            <div key={index} style={{ margin: "5px" }}>
                                <Chip size='medium' variant='outlined' color='secondary' label={ category } />
                            </div>

                        ))
                    }
                </div>

                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        fontFamily: "poppins"
                    }}
                >
                    <Typography sx={{ fontFamily: "poppins", fontWeight: "700", fontSize: "20px" }}>{projectData.priceTiers[activeStep].tier_title}</Typography>
                </Paper>
                <Box sx={{ height: 380, maxWidth: 400, width: '100%', p: 2 }}>
                    <Typography sx={{ fontFamily: "poppins", fontWeight: "400", fontSize: "15px" }}>{projectData.priceTiers[activeStep].tier_description}</Typography>
                    
                    <Typography sx={{ fontFamily: "poppins", fontWeight: "400", fontSize: "15px", marginTop: "10px" }}><span style={{ fontWeight: "600", fontSize: "17px", color: "green" }}>Deliverables <br/></span>{projectData.priceTiers[activeStep].tier_deliverables}</Typography>

                    <Typography sx={{ fontFamily: "poppins", fontWeight: "700", fontSize: "24px", marginTop: "10px" }}><span style={{ fontWeight: "600", fontSize: "17px", color: "green"}}>BDT. </span>{projectData.priceTiers[activeStep].tier_price}</Typography>

                    <button onClick={handleOrder} style={{marginTop: "20px"}}>Place an Order</button>
                </Box>
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{ fontWeight: "500", fontFamily: "poppins", backgroundColor: "#e6fff3", padding: "15px", borderRadius: "10px" }}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={activeStep === maxSteps - 1}
                            sx={{ fontWeight: "600", fontFamily: "poppins" }}
                        >
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ fontWeight: "600", fontFamily: "poppins" }}>
                            <KeyboardArrowLeft />
                            Back
                        </Button>
                    }
                />

                
                <div className="project-deliverables">
                    <h2 className='project-title'>Project Deliverables</h2>
                    {
                        projectData.deliverables.map((deliverable, index) => (
                            <div key={index} style={{ marginTop: "20px"}}>
                                <Divider />
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <GpsNotFixedIcon />
                                    <p>{deliverable}</p>
                                </div>
                                
                            </div>
                            
                        ))
                    }
                </div>

                <div className='project-user-highlight'>
                    <Badge badgeContent={userData.verified ? "Verified" : "Not Verified"} color={userData.verified ? "success" : "error"}>
                        {
                            userImage ? (
                                <Avatar
                                    sx={{ width: "200px", height: "200px", marginBottom: "30px" }}
                                    alt="Profile Picture"
                                    src={`${server}/${userImage}`}
                                />
                            ) : (
                                <Avatar sx={{ width: 50, height: 50 }}>A</Avatar>
                            )
                        }

                    </Badge>

                    <h1 style={{ margin: "0px" }}>{userData.display_name}</h1>
                    <h6 style={{ color: "grey", marginBottom: "15px" }}>@{userData.username}</h6>

                    {/* rating */}
                    <Rating
                        sx={{
                            marginBottom: "20px"
                        }}
                        name="rating"
                        value={0}
                        precision={0.1}
                        readOnly
                        size="large"
                    />
                    <p style={{textAlign: "center"}}>{userData.description}</p>
                    <button onClick={handleChat} className="profilebtn1" style={{ marginBottom: "0px", marginTop: "30px" }}>Contact Me</button>

                </div>
                
                
            </div>
            
        </div>
    )
}

export default SingleProject