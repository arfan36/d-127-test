import { format } from 'date-fns';
import React from 'react';

const AvailableAppointments = ({ selectedDate }) => {
    return (
        <section className='mt-16'>
            <p className='text-center text-secondary font-bold'>Available Services on {format(selectedDate, 'PP')}</p>
        </section>
    );
};

export default AvailableAppointments;