import { useState } from 'react';
import "../../css/PopupForm.css"
import CloseIcon from "@mui/icons-material/Close";
import Store from "../../redux/store";
import { createRequest } from '../../redux/actions/requests';
import { toast } from 'react-toastify';

const RequestForm = (props) => {

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    timeline: "",
  });

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handlePopup = async (e) => {
    e.preventDefault();

    props.setTrigger(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(data);

    const request = {
      title: data.title,
      description: data.description,
      category: data.category,
      budget: data.budget,
      timeline: data.timeline,
    };

    //console.log(request);

    Store.dispatch(createRequest(request, setData, setEmptyFields, setError, props, toast));
  };

  return props.trigger ? (
    <div className="popup">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Post a New Request</h3>

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
          <button className="reqsub-btn">Submit for Review</button>
          <button className="close-popup" onClick={handlePopup}>
            Cancel
            <CloseIcon />
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </form>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default RequestForm;