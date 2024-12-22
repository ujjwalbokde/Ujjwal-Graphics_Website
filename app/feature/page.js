import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Feature = ({ categories = [] }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto inline-flex rounded-full bg-gray-100 px-4 py-1.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-black">
            Premium Awards & Recognition
          </p>
        </div>
        <h2 className="mt-6 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
          Exceptional Awards for Every Achievement
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          At Ujjwal Graphics, we create personalized trophies, medals, shields, badges, and momentos that capture the essence of your achievements and milestones. Discover how we can help you celebrate success.
        </p>
      </div>
      <div className="mt-12 mb-5 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-2">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="border-2 border-gold rounded-[50px] p-10">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                <img
                  src={category.image || '/.UG.png'}
                  alt={category.title || 'Default Title'}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              </div>
              <h3 className="mt-8 text-lg font-semibold text-black">{category.title || 'Untitled'}</h3>
              <p className="mt-4 text-sm text-gray-600">{category.description || 'No description available.'}</p>
              <br />
              <Link href={category.link || '/'}>
                <h1 className="border rounded-xl p-2 mt-3 bg-gold hover:bg-gold/80 text-center">
                  See more &rarr;
                </h1>
              </Link>
            </div>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default Feature;
