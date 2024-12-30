import React, { useState } from 'react';
import { Card, CardContent } from "../ui/card";
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react';
import YouTube from 'react-youtube';

const PodcastSection = () => {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);

  const podcasts = [
    {
      id: '1',
      title: 'Introdução ao AWS Cloud Practitioner',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '45:30'
    },
    {
      id: '2',
      title: 'Serviços Essenciais da AWS',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '38:15'
    }
  ];

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
    },
  };

  const handlePlayerReady = (event, podcast) => {
    console.log('YouTube Player ready:', event);
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    
    if (currentPodcast?.id === podcast.id && isPlaying) {
      setTimeout(() => {
        event.target.playVideo();
      }, 100);
    }
  };

  const handlePlayerStateChange = (event) => {
    console.log('Player state changed:', event);
    const player = event.target;
    
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressInterval(player);
    } else {
      setIsPlaying(false);
      clearProgressInterval();
    }
  };

  const startProgressInterval = (player) => {
    clearProgressInterval();
    
    const intervalId = setInterval(() => {
      if (player && typeof player.getCurrentTime === 'function') {
        const currentTime = player.getCurrentTime();
        const duration = player.getDuration();
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    }, 1000);

    window._podcastInterval = intervalId;
  };

  const clearProgressInterval = () => {
    if (window._podcastInterval) {
      clearInterval(window._podcastInterval);
      window._podcastInterval = null;
    }
  };

  const togglePlayPause = (podcast) => {
    if (currentPodcast?.id === podcast.id) {
      if (isPlaying && player) {
        player.pauseVideo();
      } else if (player) {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    } else {
      if (player) {
        player.stopVideo();
      }
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Headphones className="mr-2 h-6 w-6 text-primary" />
          PodCasts AWS
        </h2>
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{podcast.title}</h3>
                  <p className="text-sm text-gray-500">{podcast.duration}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => togglePlayPause(podcast)}
                  >
                    {currentPodcast?.id === podcast.id && isPlaying ? (
                      <PauseCircle className="h-6 w-6 text-primary" />
                    ) : (
                      <PlayCircle className="h-6 w-6 text-primary" />
                    )}
                  </button>
                </div>
              </div>
              <YouTube
                videoId={podcast.youtubeId}
                opts={opts}
                onReady={(event) => handlePlayerReady(event, podcast)}
                onStateChange={handlePlayerStateChange}
                className="hidden"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastSection;