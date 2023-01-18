import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useToken(email) {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        setToken(data.accessToken);
                        toast.success('token add to local storage');
                    }
                })
                .catch(err => console.error('err', err));
        }
    }, [email]);
    return [token];

};
