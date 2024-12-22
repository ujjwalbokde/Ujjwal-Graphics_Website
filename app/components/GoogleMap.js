import React, { useState, useEffect } from 'react';

const GoogleMap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent rendering during SSR

  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d273.8450502191915!2d79.13299249485628!3d21.17463696653579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1smr!2sin!4v1726153214854!5m2!1smr!2sin"
      className="border-0 mt-10 lg:w-[500px] lg:h-[300px] w-auto h-auto"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

export default GoogleMap;
