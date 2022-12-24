import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, set_loginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    if (token) {
        navigate(from, { replace: true });
    }

    const handleLogin = (data) => {
        console.log(data);
        const { email, password } = data;
        setLoginError('');
        // sign in with email and password
        signIn(email, password).then((result) => {
            const user = result.user;
            console.log("🚀 ~ user", user);

            // get user token
            set_loginUserEmail(email);

        }).catch((err) => {
            console.error('err', err.message);
            setLoginError(err.message);
        });
    };

    // const getUserToken = (email) => {
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.accessToken) {
    //                 localStorage.setItem('accessToken', data.accessToken);
    //                 toast.success('token add to local storage');
    //                 navigate(from, { replace: true });
    //             }
    //         })
    //         .catch(err => console.error('err', err));
    // };


    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>This is login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email &&
                            <p className='text-error'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: 'Password must be 6 character or longer' }
                        })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.password &&
                            <p className='text-error'>{errors.password?.message}</p>}
                        <label className="label">
                            <span className="label-text">Forget Password</span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full' value={'Login'} type="submit" />
                    <div>
                        {loginError && <p className='text-error'>{loginError}</p>}
                    </div>
                </form>
                <p>New to Doctors Portal <Link className='text-secondary' to={'/signup'}>Create New Account</Link></p>
                <div className="divider">OR</div>
                <div className="btn btn-outline w-full">CONTINUE WITH GOOGLE</div>
            </div>
        </div>
    );
};

export default Login;