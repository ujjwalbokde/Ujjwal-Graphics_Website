"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import GoogleMap from '../components/GoogleMap'; // Assuming GoogleMap is in the same folder

const ContactSection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section className="py-16 md:py-24 lg:mx-28">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-wrap">
          {/* Contact Form Column */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="px-4 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We’d love to hear from you! Whether you have a question about our services or just want to say hello, feel free to reach out.
              </p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    {...register('name', { required: 'Name is required' })}
                    defaultValue=""
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
                    {...register('email', { required: 'Email is required' })}
                    defaultValue=""
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700">Message</label>
                  <textarea
                    id="message"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold h-32"
                    {...register('message', { required: 'Message is required' })}
                    defaultValue=""
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#333333] text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          {/* Contact Information Column */}
          <div className="w-full lg:w-1/2">
            <div className="px-4 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
                Get In Touch
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <img src="/phone.png" className="w-8 mr-2" alt="Phone Icon" width={32} height={32} />
                  +91 73858 10484, +91 97646 24075
                </li>
                <li className="flex items-center text-gray-700">
                  <img src="/mail.png" className="w-8 mr-2" alt="Mail Icon" width={32} height={32} />
                  babanbokde@gmail.com, ujjwalbokde370@gmail.com
                </li>
                <li className="flex items-center text-gray-700">
                  <img src="/location.png" className="w-8 mr-2" alt="Location Icon" width={32} height={32} />
                  Plot no. 1007, lane no. 28, Nagsenvan, Santosh Nagar, Near Water Tank, Nagpur-440017
                </li>
              </ul>
              <GoogleMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
