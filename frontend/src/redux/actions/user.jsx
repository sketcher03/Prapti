import axios from "axios";
import { server } from "../../../server";

//save user
export const saveUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveUserRequest"
    })

    const url = `${server}/auth/saveuser`;

    await axios.get(url, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: "SaveUserSuccess",
          payload: res.data.user
        });

        if (res.data.user.role === "seller") {
          dispatch({
            type: "SaveUserRole",
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: "SaveUserFailure",
          payload: error.response.data.message
        });
      });
  }
  catch (err) {
    dispatch({
      type: "SaveUserFailure",
      payload: err.response.data.message
    });
  }
}

//logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "SaveUserRequest"
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

//update user
export const editUser =
  (
    updateUser,
    id,
    setData,
    setError,
    setImage,
    setTalents,
    profilePic
  ) =>
    async (dispatch) => {
      console.log(updateUser);
      try {
        dispatch({
          type: "SaveUserRequest",
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

            setImage(res.data.user.profilePic);

            setTalents(res.data.user.talents);

            setError(res.data.message);

            dispatch({
              type: "SaveUserSuccess",
              payload: res.data.user,
            });
          })
          .catch((error) => {
            setError(err.response.data.message);
            dispatch({
              type: "SaveUserFailure",
              payload: error.response.data.message,
            });
          });
      } catch (err) {
        dispatch({
          type: "SaveUserFailure",
          payload: err.response.data.message,
        });
      }
    };