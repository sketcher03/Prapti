import { useEffect, useState } from 'react';
import "../../css/project.css";
import { setAllProjects } from "../../redux/actions/projects";
import { useSelector } from 'react-redux';
import Store from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { server } from "../../../server";
import Chip from '@mui/material/Chip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from "@mui/material/Tooltip";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Pagination, Scrollbar } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

const AllProjects = () => {

    const { allProjects } = useSelector((state) => state.projects);

    //console.log(allProjects)

    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        Store.dispatch(setAllProjects());

        if (images.length !== allProjects.length) {
            const list = [...images];

            for (let i = 0; i < allProjects.length; i++) {
                list.push(allProjects[i].pictures);
            }

            setImages(list);
        }
        

    }, [allProjects]);

    return (
        <div className='project-container'>
            <h1>All Projects</h1>
            <div className="project-shop">
                {
                    allProjects.map((project) => (
                        <div className='product-box' key={project._id}>
                            <Swiper
                                modules={[Pagination, Scrollbar]}
                                spaceBetween={1}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSlideChange={() => console.log('slide change')}
                                className='carousel'
                            >
                                {
                                    project.pictures.map((image) => (
                                        <SwiperSlide key={image} className='carousel'>
                                            <img
                                                className='carousel-images'
                                                alt="Profile Picture"
                                                src={`${server}/${image}`}
                                            />
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>

                            <div className="project-card">
                                <Tooltip arrow title={project.title}>
                                    <Link className='all-project-title' to={`/project/${project._id}`}>{project.title}</Link>
                                </Tooltip>
                                
                                <div style={{display: "flex", margin: "10px 0px"}}>
                                    {
                                        project.category.map((category) => (
                                            <Chip sx={{ marginRight: "5px"}} variant='outlined' color='info' label={ category } />
                                        ))
                                    }
                                </div>
                                
                                <Rating
                                    sx={{
                                        margin: "15px 0px",
                                        marginTop: "5px"
                                    }}
                                    name="rating"
                                    value={2}
                                    precision={0.1}
                                    readOnly
                                />
                                <h4>Starts from <strong>BDT. </strong><span style={{ color: "green", fontWeight: "700" }}>{project.priceTiers[0].tier_price}</span></h4>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default AllProjects