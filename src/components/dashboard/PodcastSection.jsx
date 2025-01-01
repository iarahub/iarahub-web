import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react';
import YouTube from 'react-youtube';

const PodcastSection = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Busca os podcasts da API
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
    // Atualiza o tempo atual do áudio enquanto está tocando
    const interval = setInterval(() => {
      if (isPlaying && player) {
        const time = player.getCurrentTime();
        setCurrentTime(time);
        setDuration(player.getDuration());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, player]);

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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                  {currentPodcast?.id === podcast.id && (
                    <p className="text-sm text-gray-500">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </p>
                  )}
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
                <>
                  <YouTube
                    videoId={podcast.audioUrl.split('v=')[1]}
                    opts={opts}
                    onReady={handlePlayerReady}
                    className="hidden"
                  />
                  {/* Onda de barras enquanto o áudio está tocando */}
                  {isPlaying && (
                    <div className="flex space-x-1 mt-4 justify-center">
                      {Array(8) // Número de barras
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="w-2 bg-primary rounded"
                            style={{
                              animation: `pulse ${0.6 + index * 0.1}s infinite ease-in-out`,
                              height: `${Math.random() * 30 + 10}px`, // Altura inicial aleatória
                            }}
                          />
                        ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(0.3);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </Card>
  );
};

export default PodcastSection;
