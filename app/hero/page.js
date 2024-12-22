import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image for optimization

const Hero = ({ categories = []}) => {
  return (
    <div className="relative w-full">
      <div className="mx-auto max-w-7xl lg:px-8">
        <div className="flex flex-col justify-center px-4 py-10 lg:px-6">
          <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start">
            {/* Fire icon for visual effect */}
            <img src="/fire.gif" alt="Fire Icon" width={32} height={32} />

            {/* Render category links dynamically */}
            {categories.map((category) => (
              <Link
                href={category.link}  // Correct Next.js Link usage
                key={category.title}
                className="border p-2 rounded-xl bg-gold text-center"
              >
                {category.title}
              </Link>
            ))}
            {/* Fire icon for visual effect */}
            <Image src="/fire.gif" alt="Fire Icon" width={32} height={32} />
          </div>

          {/* Subtitle and CTA */}
          <div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2">
            <p className="text-xs font-medium md:text-sm">
              Discover our premium range of trophies, medals, shields, badges,
              and mementos.
              <span className="ml-2 cursor-pointer font-bold">
                Read More &rarr;
              </span>
            </p>
          </div>

          {/* Hero headline */}
          <h1 className="mt-8 max-w-4xl text-3xl font-bold tracking-tight text-gold md:text-4xl lg:text-6xl">
            Celebrating Excellence with Premium Awards
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-3xl text-lg text-gray-700">
            At Ujjwal Graphics, we specialize in creating top-quality trophies,
            medals, shields, badges, and mementos that honor achievements and
            commemorate special moments. Our products are crafted with precision
            and care to ensure they reflect the true value of your accomplishments.
          </p>

          {/* Get in touch button */}
          <div className="mt-8">
            <Link
              href="/contact" // Correct usage of Link in Next.js
              className="rounded-md bg-gold px-3 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gold/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="rounded-lg bg-gold/40 p-4">
          <img
            className="aspect-[3/2] w-full rounded-lg bg-gray-50 object-fit lg:aspect-auto lg:h-[500px]"
            src="/hero.png"
            alt="Awards and Trophies"
            width={800}  // Set appropriate width for image optimization
            height={533}  // Set appropriate height for image optimization
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
