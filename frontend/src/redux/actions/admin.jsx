import axios from "axios";
import { server } from "../../../server";

//save admin
export const saveAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveAdmin"
    })

    const url = `${server}/auth/saveadmin`;

    await axios.get(url, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: "SaveAdminSuccess",
          payload: res.data.admin
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

//logout admin
export const logoutAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveAdminRequest"
    })

    const url = `${server}/auth/admin/logout`;

    await axios.post(url, {}, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: "LogoutSuccess",
          payload: res.data.admin
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
          ? `${server}/admin/updateall/${id}`
          : `${server}/admin/update/${id}`;

        const header = profilePic
          ? `multipart/form-data`
          : `application/json`;

        await axios
          .put(url, updateAdmin, {
            withCredentials: true,
            headers: { "Content-Type": header },
          })
          .then((res) => {
            console.log(res);

            setData({
              name: res.data.admin.name,
              display_name: res.data.admin.display_name,
              description: res.data.admin.description,
              phoneNumber: res.data.admin.phoneNumber,
              email: res.data.admin.email,
              username: res.data.admin.username,
            });

            setError(res.data.message);

            dispatch({
              type: "SaveAdminSuccess",
              payload: res.data.admin,
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