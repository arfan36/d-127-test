import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');

    const handleLogin = (data) => {
        console.log(data);
        const { email, password } = data;
        setLoginError('');
        signIn(email, password).then((result) => {
            const user = result.user;
            console.log("🚀 ~ user", user);
        }).catch((err) => {
            console.error('err', err.message);
            setLoginError(err.message);
        });
    };

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