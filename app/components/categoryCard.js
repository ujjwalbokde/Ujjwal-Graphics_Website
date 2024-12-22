import React from 'react';
import Image from 'next/image'; // Make sure to import Image from next/image
import Link from 'next/link'; // Import Link from next/link

const CategoryCard = ({ title, description, image, link }) => {
  return (
    <div className="category-card bg-white rounded-lg shadow-md p-6">
      {/* Use the Image component from Next.js for optimized images */}
      <Image 
        src={image} 
        alt={title} 
        width={300} // Define width and height for optimization
        height={200}
        className="w-full h-48 object-cover rounded-lg" 
      />
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
      
      {/* Link component doesn't need an <a> tag anymore */}
      <Link href={Link} className="mt-3 text-blue-600 hover:underline">
        Explore {title}
      </Link>
    </div>
  );
};

export default CategoryCard;
