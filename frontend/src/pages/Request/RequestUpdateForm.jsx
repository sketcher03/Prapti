import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import "../../css/PopupForm.css"
import CloseIcon from "@mui/icons-material/Close";
import Store from "../../redux/store";
import { editRequest } from '../../redux/actions/requests';
import { server } from "../../../server";
import axios from 'axios';

const RequestUpdateForm = () => {

  const param = useParams();

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    timeline: '',
  });

  useEffect(() => {

    try {
      const requestID = param.id;

      const url = `${server}/requests/${requestID}`;

      axios.get(url, { withCredentials: true })
        .then((res) => {
          console.log(res);

          setData({
            title: res.data.request.title,
            description: res.data.request.description,
            category: res.data.request.category,
            budget: res.data.request.budget,
            timeline: res.data.request.timeline,
          });
        })
        .catch((err) => {
          setError(err.response.data.message);
        })
    }
    catch (error) {
      setError(error.message);
    }

  }, [])


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    const id = param.id;

    const editrequest = {
      title: data.title,
      description: data.description,
      category: data.category,
      budget: data.budget,
      timeline: data.timeline,
    };

    //console.log(request);

    Store.dispatch(editRequest(editrequest, id, setData, setEmptyFields, setError));
  };

  return (
    <form className="update-req" onSubmit={handleSubmit}>
      <h3>Edit Request - <span>{data.title}</span></h3>

      <label>Give your request a title</label>
      <input
        type="text"
        name="title"
        onChange={handleChange}
        value={data.title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>
        What are you looking to get done?
        <br />
        Give us a great description.
      </label>
      <textarea
        name="description"
        value={data.description}
        onChange={handleChange}
        className={emptyFields.includes("description") ? "error" : ""}
      ></textarea>

      <label>Which category best fits your project?</label>
      <input
        type="text"
        name="category"
        onChange={handleChange}
        value={data.category}
        className={emptyFields.includes("category") ? "error" : ""}
      />

      <label>I'm willing to spend up to...</label>
      <input
        type="Number"
        name="budget"
        onChange={handleChange}
        value={data.budget}
        className={emptyFields.includes("budget") ? "error" : ""}
      />

      <label>Expected Timeline (days) </label>
      <input
        type="Number"
        name="timeline"
        onChange={handleChange}
        value={data.timeline}
        className={emptyFields.includes("timeline") ? "error" : ""}
      />
      <div className="createreq-bottom">
        <button className="reqsub-btn">Update Your Request</button>
        <Link to="/requests" className="close-popup">
          Cancel
          <CloseIcon />
        </Link>
      </div>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RequestUpdateForm;