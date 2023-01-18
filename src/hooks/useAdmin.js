import { useEffect, useState } from "react";

export default function useAdmin(email) {
    const [isAdmin, set_isAdmin] = useState(false);
    const [isAdminLoading, set_isAdminLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/admin/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    set_isAdmin(data.isAdmin);
                    set_isAdminLoading(false);
                });
        }
    }, [email]);
    return [isAdmin, isAdminLoading];
};
