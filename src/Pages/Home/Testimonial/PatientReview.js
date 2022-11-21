import React from 'react';

const PatientReview = ({ review }) => {
    const { patientImg, patientName, patientAddress, patientReview } = review;
    return (
        <div className="card shadow-xl p-7">
            <div>
                <p>{patientReview}</p>
            </div>
            <div className='flex gap-3 mt-10'>
                <img src={patientImg} alt="" />
                <div className='flex flex-col justify-center'>
                    <h3>{patientName}</h3>
                    <address>{patientAddress}</address>
                </div>
            </div>
        </div>
    );
};

export default PatientReview;