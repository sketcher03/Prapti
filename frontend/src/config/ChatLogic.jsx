export const getSender = (recieverID, users) => {
    return (recieverID === users[0]?._id) ? users[1]?.display_name : users[0]?.display_name;
};

export const getSenderImage = (recieverID, users) => {
    return (recieverID === users[0]?._id) ? users[1].profilePic : users[0].profilePic;
};

export const isSameSender = (messages, i, userId) => {
    return (
        i < messages.length - 1 &&
        (messages[i + 1].sender._id !== m.sender._id ||
            messages[i + 1].sender._id === undefined) &&
        messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
    return (
        i === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);

    if (
        i < messages.length - 1 &&
        messages[i + 1].sender._id === m.sender._id &&
        messages[i].sender._id !== userId
    )
        return 33;
    else if (
        (i < messages.length - 1 &&
            messages[i + 1].sender._id !== m.sender._id &&
            messages[i].sender._id !== userId) ||
        (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
