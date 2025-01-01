import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react';
import YouTube from 'react-youtube';
import { Slider } from "../ui/slider";

const PodcastSection = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://bff-iarahub.vercel.app/api/podcast/getAllPodcast');
        if (!response.ok) {
          throw new Error(`Erro ao buscar podcasts: ${response.status}`);
        }
        const data = await response.json();
        setPodcasts(data);
      } catch (error) {
        console.error('Erro ao buscar podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && player && !isDragging) {
        const time = player.getCurrentTime();
        setCurrentTime(time);
        setDuration(player.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, player, isDragging]);

  const handlePlayerReady = (event) => {
    setPlayer(event.target);
  };

  const togglePlayPause = (podcast) => {
    if (currentPodcast?.id === podcast.id) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
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

  const handleSliderChange = (value) => {
    if (player) {
      const newTime = (value[0] / 100) * duration;
      setCurrentTime(newTime);
      player.seekTo(newTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getCurrentProgress = () => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Headphones className="mr-2 h-6 w-6 text-primary" />
          Podcasts AWS
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
                  <p className="text-sm text-gray-500">{podcast.description}</p>
                </div>
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
              {currentPodcast?.id === podcast.id && (
                <div className="mt-4 space-y-2">
                  <YouTube
                    videoId={podcast.audioUrl.split('v=')[1]}
                    opts={opts}
                    onReady={handlePlayerReady}
                    className="hidden"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-12">
                      {formatTime(currentTime)}
                    </span>
                    <div className="flex-1">
                      <Slider
                        value={[getCurrentProgress()]}
                        onValueChange={handleSliderChange}
                        onValueCommit={() => setIsDragging(false)}
                        onPointerDown={() => setIsDragging(true)}
                        max={100}
                        step={0.1}
                        className="cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PodcastSection;