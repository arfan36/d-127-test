import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const imageHostKey = process.env.REACT_APP_imgBB_key;

    const navigate = useNavigate();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = (data) => {
        const { name, email, specialty } = data;
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {

                    console.log("🚀 ~ imgData.data.url", imgData.data.url);
                    const doctor = {
                        name,
                        email,
                        specialty,
                        image: imgData.data.url
                    };

                    // save doctor information to the database
                    fetch(`http://localhost:5000/doctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${name} is added successfully`);
                            navigate('/dashboard/manage-doctors');
                        })
                        .catch(err => console.error('err', err));
                }
            })
            .catch(err => console.error('err', err));
    };

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className='w-96 p-7'>
            <h2 className="text-4xl">Add a Doctor</h2>
            <form onSubmit={handleSubmit(handleAddDoctor)} >
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
                        <span className="label-text">Specialty</span>
                    </label>
                    <select
                        {
                        ...register("specialty", {
                            required: "Select any option"
                        })
                        }
                        className="select input-bordered w-full max-w-xs">
                        {
                            specialties &&
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                    {errors.specialty && <p className='text-error'>{errors.specialty.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        {...register("image", {
                            required: "Photo is required"
                        })}
                        className="input w-full max-w-xs" />
                    {errors.image && <p className='text-error'>{errors.image.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-3' value={'Add Doctor'} type="submit" />
                {/* {
                    signUpError && <p className='text-error'>{signUpError}</p>
                } */}
            </form>
        </div>
    );
};

/* 
* Three places to store images
* 1. image hosting server
* 2. File system of your server
* 3. mongodb(databases)
 */

export default AddDoctor;