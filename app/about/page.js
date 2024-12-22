import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative py-10 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-28">
        <div className="flex flex-wrap">
          {/* Content Column */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="px-4 lg:px-8">
              <div className="mb-12 relative z-10">
                <span className="block text-lg md:text-xl text-gold font-bold mb-4">About Us</span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 leading-tight mb-4 relative pb-4">
                  Crafting Excellence in <br /> Trophies, Mementos, and Awards Since 2015
                  <span className="absolute left-0 bottom-0 block w-12 h-1 bg-gray-300"></span>
                </h2>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                  At Ujjwal Graphics, we take pride in creating high-quality trophies, wooden mementos, shields, medals, and badges that celebrate special moments and achievements. 
                  Established in 2015, we have been dedicated to delivering well-crafted, customizable awards for events such as corporate gatherings, sports competitions, and academic achievements.
                  Each product is thoughtfully designed to reflect the significance of the occasion, ensuring that our clients can proudly commemorate their accomplishments.
                </p>
                <ul className="list-none mb-12 space-y-3">
                  <li className="flex items-start text-gray-800 text-sm md:text-base font-normal pl-6 md:pl-8 relative before:content-['\f058'] before:absolute before:left-0 before:top-0 before:text-red-600 before:text-lg before:font-semibold before:mr-2 before:font-awesome-5-free">
                    Custom-made trophies for all occasions
                  </li>
                  <li className="flex items-start text-gray-800 text-sm md:text-base font-normal pl-6 md:pl-8 relative before:content-['\f058'] before:absolute before:left-0 before:top-0 before:text-red-600 before:text-lg before:font-semibold before:mr-2 before:font-awesome-5-free">
                    High-quality wooden mementos and shields
                  </li>
                  <li className="flex items-start text-gray-800 text-sm md:text-base font-normal pl-6 md:pl-8 relative before:content-['\f058'] before:absolute before:left-0 before:top-0 before:text-red-600 before:text-lg before:font-semibold before:mr-2 before:font-awesome-5-free">
                    Premium medals and badges for excellence
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative px-4 lg:px-8 w-full lg:w-auto">
              <figure className="relative mb-8">
                <a href="#" className="block">
                  <img src="about1.png" alt="About Us 1" className="shadow-lg w-full lg:w-200 h-200 max-w-sm lg:max-w-none" />
                </a>
              </figure>
              <figure className="absolute bottom-0 left-0 transform translate-x-8 translate-y-8 lg:translate-x-12 lg:translate-y-12">
                <a href="#" className="block">
                  <img src="about2.png" alt="About Us 2" className="shadow-lg w-40 h-auto lg:w-48 lg:h-auto" />
                </a>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
