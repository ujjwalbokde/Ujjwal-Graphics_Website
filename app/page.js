"use client"
// pages/index.js
import React from 'react';
import Hero from './hero/page';
import Feature from './feature/page';
import AboutSection from './about/page';
import ContactSection from './contact/page';


const Home = () => {
  const categories = [
    {
      title: 'Trophies and Cups',
      description: 'Stunning cups for celebrating victories and milestones, made from high-quality materials and customizable to your needs.',
      image: '/cup.png',
      link: '/products?category=Trophies and Cups',
    },
    {
      title: 'Personalized Medals',
      description: 'Premium medals designed to honor special moments, with options for custom engravings to make each one unique.',
      image: '/medal.png',
      link: '/products?category=Medals',
    },
    {
      title: 'Wooden Momentos',
      description: 'Elegant wooden momentos that capture the essence of your special occasions with a classic and timeless design.',
      image: '/momento.png',
      link: '/products?category=Wooden Momentos',
    },
    {
      title: 'Distinctive Badges',
      description: 'Custom badges for events, achievements, and memberships, designed to leave a lasting impression.',
      image: '/badge.png',
      link: '/products?category=Badges',
    },
  ];

  return (
    <>
      <Hero categories={categories} />
      <Feature categories={categories} />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
