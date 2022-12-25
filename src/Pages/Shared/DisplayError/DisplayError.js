import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Navbar from '../Navbar/Navbar';

const DisplayError = () => {
    const { user, logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => {
            navigate('/login');
            toast.success('successfully Sign out');
        }).catch((err) => {
            console.error('err', err);
        });
    };

    return (
        <>
            <Navbar></Navbar>
            <div className='text-center mt-6 leading-7'>
                <p className='text-red-500'>Something went wrong!!!</p>
                <p className='text-red-400'>{error.statusText || error.message}</p>
                <p className='text-red-400 text-5xl'>{error.status}</p>
                {
                    user &&
                    <h4 className="text-3xl mt-6">Please <button className='btn btn-sm btn-primary' onClick={handleLogOut}>Sign out</button> and log back in</h4>
                }
            </div>
        </>
    );
};

export default DisplayError;