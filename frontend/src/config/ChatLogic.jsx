export const getSender = (loggedUser, users) => {
    return (users[0]?._id === loggedUser?._id) ? users[1].display_name : users[0].display_name;
};

export const getSenderImage = (loggedUser, users) => {
    return (users[0]?._id === loggedUser?._id) ? users[1].profilePic : users[0].profilePic;
};