
import axios from "axios"

export const loginCall = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});

    try {
        const res = await axios.post("/api/auth/login/email", userCredentials);
        if (res.data.username) {
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            localStorage.setItem("refreshToken", res.data.refreshToken)
            axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7be0695ffefc488698b9de8d44727c64')
            .then(async (response) => {
                console.log(response.data);
                await axios.post("/api/users/addVisit", {userId: res.data._id ? res.data._id : "", ipAddress: response.data.ip_address, place: JSON.stringify(response.data)})
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            dispatch({type: "LOGIN_FAILURE", payload: res.data});
            alert(res.data)
        }
    } catch(err) {
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}

export const loginCallMobile = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});

    try {
        const res = await axios.post("/api/auth/login/mobile", userCredentials);
        if (res.data.username) {
            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
            localStorage.setItem("refreshToken", res.data.refreshToken)
            axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7be0695ffefc488698b9de8d44727c64')
            .then(async (response) => {
                // console.log(response.data);
                await axios.post("/api/users/addVisit", {userId: res.data._id ? res.data._id : "", ipAddress: response.data.ip_address, place: JSON.stringify(response.data)})
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            dispatch({type: "LOGIN_FAILURE", payload: res.data});
            alert(res.data)
        }
    } catch(err) {
        dispatch({type: "LOGIN_FAILURE", payload: err});
    }
}

export const refresh = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/auth/refresh", userCredentials);
        if (res.data.username) {
            dispatch({type: "REFRESH_SUCCESS", payload: res.data});
            localStorage.setItem("refreshToken", res.data.refreshToken)
            axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=7be0695ffefc488698b9de8d44727c64')
            .then(async (response) => {
                // console.log(response.data);
                await axios.post("/api/users/addVisit", {userId: res.data._id ? res.data._id : "", ipAddress: response.data.ip_address, place: JSON.stringify(response.data)})
            })
            .catch(error => {
                console.log(error);
            });
        }
    } catch(err) {
        console.log(err)
    }
}

export const logout = async (dispatch) => {
    dispatch({type: "LOGOUT"})
    localStorage.removeItem("refreshToken")
}

export const registerCall = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/users/register", userCredentials);
        // console.log(res)
        if (res.data.includes("success")) {
            alert(res.data)
            dispatch({type: "REGISTER_SUCCESS", payload: res.data});
        } else {
            alert(res.data)
            dispatch({type: "REGISTER_FAILURE", payload: res.data});
        }
    } catch(err) {
        console.log(err)
    }
}

export const editUsernameCall = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/users/editUsername", userCredentials);
        // console.log(res)
        if (res.data.username) {
            dispatch({type: "EDIT_SUCCESS", payload: res.data});
        }
    } catch(err) {
        console.log(err)
    }
}

export const addReviewCall = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/users/addReview", userCredentials);
        // console.log(res)
        if (res.data.username) {
            dispatch({type: "ADD_REVIEW_SUCCESS", payload: res.data});
        }
    } catch(err) {
        console.log(err)
    }
}


export const pushToHistoryCall = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/users/history", userCredentials)

        if (res.data.username) {
            dispatch({type: "ADD_REVIEW_SUCCESS", payload: res.data})
        } else {
            alert(res.data)
        }
    } catch(err) {
        console.log(err);
    }
}

export const likeGameCall = async (userCredentials, dispatch) => {
    try {
        const res = await axios.post("/api/games/like", userCredentials);
        console.log(res.data);
        if (res.data.username) {
            dispatch({type: "LIKE_SUCCESS", payload: res.data});
        }
        else {
            alert(res.data)
        }
    } catch(err) {
        console.log(err)
    }
}
