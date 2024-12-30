import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react';
import YouTube from 'react-youtube';

const PodcastSection = () => {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

  useEffect(() => {
    // Cleanup function to stop player and clear interval when component unmounts
    return () => {
      try {
        clearProgressInterval();
        if (player && player.getPlayerState && typeof player.stopVideo === 'function') {
          console.log('Stopping player during cleanup');
          player.stopVideo();
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, [player]);

  const handlePlayerReady = (event, podcast) => {
    console.log('YouTube Player ready:', event);
    if (!event.target) {
      console.error('Player target is null');
      return;
    }

    const newPlayer = event.target;
    setPlayer(newPlayer);
    setDuration(newPlayer.getDuration());
    setIsPlayerReady(true);
    
    // If this is the current podcast and should be playing, start playback
    if (currentPodcast?.id === podcast.id && isPlaying) {
      setTimeout(() => {
        try {
          if (newPlayer && typeof newPlayer.playVideo === 'function') {
            newPlayer.playVideo();
          }
        } catch (error) {
          console.error('Error playing video:', error);
          setIsPlaying(false);
        }
      }, 1000);
    }
  };

  const handlePlayerStateChange = (event) => {
    console.log('Player state changed:', event);
    if (!event.target) return;
    
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
      startProgressInterval(event.target);
    } else {
      setIsPlaying(false);
      clearProgressInterval();
    }
  };

  const startProgressInterval = (player) => {
    if (!player) return;
    clearProgressInterval();
    
    const intervalId = setInterval(() => {
      if (player && typeof player.getCurrentTime === 'function') {
        try {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          const progressPercent = (currentTime / duration) * 100;
          setProgress(progressPercent);
        } catch (error) {
          console.error('Error updating progress:', error);
          clearProgressInterval();
        }
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
    if (!isPlayerReady || !player) {
      console.log('Player not ready yet');
      return;
    }

    try {
      if (currentPodcast?.id === podcast.id) {
        if (isPlaying && typeof player.pauseVideo === 'function') {
          player.pauseVideo();
        } else if (typeof player.playVideo === 'function') {
          player.playVideo();
        }
        setIsPlaying(!isPlaying);
      } else {
        // Switching to a new podcast
        if (player && typeof player.stopVideo === 'function') {
          player.stopVideo();
        }
        setCurrentPodcast(podcast);
        setIsPlaying(true);
        // The actual playback will be handled in handlePlayerReady
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
      setIsPlaying(false);
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
                    disabled={!isPlayerReady}
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