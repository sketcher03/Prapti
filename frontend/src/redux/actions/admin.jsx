import axios from "axios";
import { server } from "../../../server";

//save admin
export const saveAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveAdminRequest"
    })

    const url = `${server}/auth/saveadmin`;

    await axios.get(url, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: "SaveAdminSuccess",
          payload: res.data.user
        });
      })
      .catch((error) => {
        dispatch({
          type: "SaveAdminFailure",
          payload: error.response.data.message
        });
      });
  }
  catch (err) {
    dispatch({
      type: "SaveAdminFailure",
      payload: err.response.data.message
    });
  }
}

//logout
export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveAdminRequest"
    })

    const url = `${server}/auth/logout`;

    await axios.post(url, {}, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: "LogoutSuccess",
          payload: res.data.user
        });
      })
      .catch((error) => {
        dispatch({
          type: "LogoutFailure",
          payload: error.response.data.message
        });
      });
  }
  catch (err) {
    dispatch({
      type: "LogoutFailure",
      payload: err.response.data.message
    });
  }
}

//update admin
export const editAdmin =
  (
    updateAdmin,
    id,
    setData,
    setError,
    profilePic
  ) =>
    async (dispatch) => {
      console.log(updateAdmin);
      try {
        dispatch({
          type: "SaveAdminRequest",
        });

        console.log("dispatch success")

        const url = profilePic
          ? `${server}/user/updateall/${id}`
          : `${server}/user/update/${id}`;

        const header = profilePic
          ? `multipart/form-data`
          : `application/json`;

        await axios
          .put(url, updateUser, {
            withCredentials: true,
            headers: { "Content-Type": header },
          })
          .then((res) => {
            console.log(res);

            setData({
              name: res.data.user.name,
              display_name: res.data.user.display_name,
              description: res.data.user.description,
              phoneNumber: res.data.user.phoneNumber,
              email: res.data.user.email,
              username: res.data.user.username,
            });

            setError(res.data.message);

            dispatch({
              type: "SaveAdminSuccess",
              payload: res.data.user,
            });
          })
          .catch((error) => {
            setError(err.response.data.message);
            dispatch({
              type: "SaveAdminFailure",
              payload: error.response.data.message,
            });
          });
      } catch (err) {
        dispatch({
          type: "SaveAdminFailure",
          payload: err.response.data.message,
        });
      }
    };