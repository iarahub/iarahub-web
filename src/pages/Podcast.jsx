import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react';
import YouTube from 'react-youtube';
import { Progress } from "../components/ui/progress";

const Podcast = () => {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [player, setPlayer] = useState(null);

  const podcasts = [
    {
      id: '1',
      title: 'Introdução ao AWS Cloud Practitioner',
      description: 'Uma visão geral sobre a certificação AWS Cloud Practitioner',
      youtubeId: 'dQw4w9WgXcQ',
      duration: '45:30'
    },
    {
      id: '2',
      title: 'Serviços Essenciais da AWS',
      description: 'Conheça os principais serviços da AWS para a certificação',
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
    
    // Only start playing if this is the current podcast
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
    clearProgressInterval(); // Clear any existing interval first
    
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <Headphones className="mr-2 h-8 w-8 text-primary" />
          PodCasts AWS
        </h1>

        {/* Current Playing Section */}
        {currentPodcast && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold">{currentPodcast.title}</h2>
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{Math.floor(duration * (progress / 100))}s</span>
                    <span>{Math.floor(duration)}s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Podcast List */}
        <div className="space-y-4">
          {podcasts.map((podcast) => (
            <Card key={podcast.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{podcast.title}</h3>
                    <p className="text-sm text-gray-500">{podcast.description}</p>
                    <p className="text-sm text-gray-400">{podcast.duration}</p>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => togglePlayPause(podcast)}
                  >
                    {currentPodcast?.id === podcast.id && isPlaying ? (
                      <PauseCircle className="h-8 w-8 text-primary" />
                    ) : (
                      <PlayCircle className="h-8 w-8 text-primary" />
                    )}
                  </button>
                </div>
                <YouTube
                  videoId={podcast.youtubeId}
                  opts={opts}
                  onReady={(event) => handlePlayerReady(event, podcast)}
                  onStateChange={handlePlayerStateChange}
                  className="hidden"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Podcast;