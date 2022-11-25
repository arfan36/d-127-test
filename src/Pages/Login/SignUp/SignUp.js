import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');

    const handleSignUp = (data) => {
        console.log(data);
        const { name, email, password } = data;
        setSignUpError('');
        createUser(email, password).then((result) => {
            const user = result.user;
            console.log("🚀 ~ user", user);
            toast.success('User Created Successfully');
            const userInfo = {
                displayName: name
            };
            // update user info
            updateUser(userInfo).then(() => {
                toast.success('user info updated Successfully');
            }).catch((err) => {
                console.error('err', err);
                setSignUpError(err.message);
            });
        }).catch((err) => {
            console.error('err', err);
            setSignUpError(err.message);
        });
    };

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)} >
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name", {
                            required: "Name is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-error'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", {
                            required: "Email is required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-error'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 character" },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                message: "Password must have uppercase, number and special character"
                            }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-error'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full' value={'SignUp'} type="submit" />
                    {
                        signUpError && <p className='text-error'>{signUpError}</p>
                    }
                </form>
                <p>Already have a Account? Please <Link className='text-secondary' to={'/login'}>login</Link></p>
                <div className="divider">OR</div>
                <div className="btn btn-outline w-full">CONTINUE WITH GOOGLE</div>
            </div>
        </div>
    );
};

export default SignUp;