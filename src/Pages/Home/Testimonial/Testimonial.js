import React from 'react';
import quote from '../../../assets/icons/quote.svg';
import people1 from '../../../assets/images/people1.png';
import people2 from '../../../assets/images/people2.png';
import people3 from '../../../assets/images/people3.png';
import PatientReview from './PatientReview';

const Testimonial = () => {

    const patientReviewData = [
        {
            id: 1,
            patientImg: people1,
            patientName: 'Wilson Herry',
            patientAddress: 'California',
            patientReview: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribution to using Content here, content'
        },
        {
            id: 2,
            patientImg: people2,
            patientName: 'Wilson Herry',
            patientAddress: 'California',
            patientReview: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribution to using Content here, content'
        },
        {
            id: 3,
            patientImg: people3,
            patientName: 'Wilson Herry',
            patientAddress: 'California',
            patientReview: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribution to using Content here, content'
        },
    ];


    return (
        <section className='mt-20 flex flex-col'>
            <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
                <img src={quote} className="max-w-sm rounded-lg" alt='' />
                <div>
                    <h2 className='text-xl text-primary font-bold'>Testimonial</h2>
                    <h1 className="text-4xl font-bold">What Our Patients Says</h1>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14'>
                {
                    patientReviewData.map(review => <PatientReview
                        key={review.id}
                        review={review}
                    ></PatientReview>)
                }
            </div>
        </section>
    );
};

export default Testimonial;