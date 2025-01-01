import React from 'react';
import Navigation from '../components/Navigation';
import PodcastSection from '../components/dashboard/PodcastSection';

const Podcast = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="max-w-4xl mx-auto p-8">
        <PodcastSection />
      </div>
    </div>
  );
};

export default Podcast;