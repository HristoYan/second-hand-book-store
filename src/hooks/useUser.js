import React, { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

    const onStorageUpdate = () => {
        setUser(JSON.parse(sessionStorage.getItem("user")));
    }

    useEffect(() => {
        window.addEventListener("storageUpdate", onStorageUpdate);
        return () => window.removeEventListener("storageUpdate", onStorageUpdate);
    }, [sessionStorage]);

    const logOut = () => {
        sessionStorage.clear();
        window.dispatchEvent(new Event('storageUpdate'));
    }

    const logIn = (user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        window.dispatchEvent(new Event('storageUpdate'));
    }

    return {
        user,
        logOut,
        logIn
    };
}