import React from 'react';
import appointment from '../../../assets/images/appointment.png';

const ContactUs = () => {
    return (
        <section style={{ background: `url(${appointment})` }}>

            <div className=" py-16">
                <div className='text-center'>
                    <h4 className='text-xl text-primary font-bold'>Contact Us</h4>
                    <h2 className="text-4xl font-bold text-white">Stay connected with us</h2>
                </div>
                <div className="flex justify-center items-center">
                    <div className="card flex-shrink-0 w-full max-w-xl">
                        <div className="card-body">
                            <div className="form-control gap-5">
                                <input type="email" placeholder="Email Address" className="input input-bordered" />
                                <input type="text" placeholder="Subject" className="input input-bordered" />
                                <textarea className="textarea" rows={4} placeholder="Your message"></textarea>
                                <button className="btn btn-primary mt-4">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;