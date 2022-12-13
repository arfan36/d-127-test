import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctor'],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/doctors`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;
            } catch (err) {
                console.error('err', err);
            }
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    const handleDoctor = (id, name, email, refetch) => {
        const result = window.confirm(`Are you sure to delete?   Name: ${name}, Email: ${email}`);
        if (result) {
            fetch(`http://localhost:5000/doctors/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('successfully deleted');
                    refetch();
                })
                .catch(err => console.error('err', err));
        }
    };

    return (
        <div>
            <h2 className="text-3xl">Manage Doctors: {doctors?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            doctors.map((doctor, i) => <tr key={doctor._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={doctor.image} alt="doctor" />
                                        </div>
                                    </div>
                                </td>
                                <td>{doctor.name}</td>
                                <td>{doctor.email}</td>
                                <td>{doctor.specialty}</td>
                                <td><button onClick={() => handleDoctor(doctor._id, doctor.name, doctor.email, refetch)} className='btn btn-sm btn-error'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;