import React from 'react';

export const MyUser = React.createContext({
    username: "My Account",
    setMyUser: async (username) => {},
    avatar: "",
    setMyAvatar: async (avatar) => {}
});