import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentSpecialty`);
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = (data) => {
        console.log("🚀 ~ data", data);

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
                    <input type="file" {...register("img", {
                        required: "Photo is required"
                    })} className="input w-full max-w-xs" />
                    {errors.img && <p className='text-error'>{errors.img.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-3' value={'Add Doctor'} type="submit" />
                {/* {
                    signUpError && <p className='text-error'>{signUpError}</p>
                } */}
            </form>
        </div>
    );
};

export default AddDoctor;