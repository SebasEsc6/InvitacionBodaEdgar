"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface MusicPlayerProps {
  /** Enlace o ID de la canción en Spotify como respaldo */
  trackId?: string;
  /** Ruta al archivo de audio local (alojado en public/audio/) */
  audioSrc?: string;
}

export default function MusicPlayer({
  trackId = "4l5HZ6iRc2oN5NtcT141yq",
  audioSrc = "/audio/musica.mp3",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasLocalAudio, setHasLocalAudio] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Verificar si existe el archivo de audio local en /audio/musica.mp3
  useEffect(() => {
    fetch(audioSrc, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHasLocalAudio(true);
        }
      })
      .catch(() => {
        setHasLocalAudio(false);
      });
  }, [audioSrc]);

  // Manejo de reproducción / pausa en audio local
  const togglePlay = () => {
    setShowPrompt(false);

    if (hasLocalAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Reproducción bloqueada por el navegador:", err);
            setIsPlaying(false);
          });
      }
    } else {
      // Si no hay archivo MP3 local, alternar tarjeta de Spotify
      setIsExpanded((prev) => !prev);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Ocultar globo automáticamente tras 6 segundos para no invadir la pantalla en móviles
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Reproductor musical de la boda"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto select-none"
    >
      {/* Elemento de audio nativo HTML5 (reproduce en segundo plano sin cortes) */}
      {hasLocalAudio && (
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      {/* Globo sutil de bienvenida en la primera visita */}
      {showPrompt && !isPlaying && (
        <div
          onClick={togglePlay}
          className="mb-2.5 cursor-pointer bg-verde-bosque/90 backdrop-blur-md text-marfil text-xs px-4 py-2 rounded-full shadow-gold border border-dorado-antiguo/30 flex items-center gap-2 animate-bounce"
        >
          <Music className="w-3.5 h-3.5 text-dorado-antiguo" />
          <span className="font-sans font-light">Toca para reproducir música</span>
        </div>
      )}

      {/* Tarjeta de Spotify (se muestra si no hay archivo local o si el usuario la despliega) */}
      {isExpanded && (
        <div className="mb-3 w-80 max-w-[calc(100vw-3rem)] bg-marfil-50/95 backdrop-blur-lg border border-dorado-antiguo/30 rounded-2xl p-4 shadow-luxury text-verde-bosque transition-all duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-yute-natural/20">
            <span className="text-[11px] uppercase tracking-widest font-sans font-medium text-verde-salvia">
              Canción de los novios
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-verde-salvia hover:text-verde-bosque p-1 cursor-pointer"
              aria-label="Cerrar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="my-3 rounded-xl overflow-hidden bg-verde-bosque/5">
            <iframe
              src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify"
              className="rounded-xl border-0"
            />
          </div>

          <div className="text-right text-xs">
            <a
              href={`https://open.spotify.com/track/${trackId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-dorado-antiguo-dark hover:underline"
            >
              Abrir en Spotify <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante estilizado */}
      <div className="flex items-center bg-verde-bosque/95 backdrop-blur-md border border-dorado-antiguo/40 rounded-full shadow-luxury p-1.5 pl-3 gap-2.5 transition-transform hover:scale-105">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 text-left text-marfil focus:outline-none cursor-pointer"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {/* Ecualizador animado */}
          <div className="flex items-end gap-0.5 h-4 w-4">
            <span
              className={`w-1 bg-dorado-antiguo rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-pulse" : "h-1.5"
              }`}
            />
            <span
              className={`w-1 bg-dorado-antiguo rounded-full transition-all duration-300 ${
                isPlaying ? "h-3 animate-pulse delay-75" : "h-2"
              }`}
            />
            <span
              className={`w-1 bg-dorado-antiguo rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-pulse delay-150" : "h-1"
              }`}
            />
          </div>

          <div className="flex flex-col pr-1">
            <span className="text-[10px] uppercase tracking-wider text-dorado-antiguo font-medium leading-none">
              Música
            </span>
            <span className="text-xs font-serif text-marfil leading-tight">
              {isPlaying ? "Sonando" : "Pausada"}
            </span>
          </div>
        </button>

        {/* Botón Play/Pause explícito */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-dorado-antiguo/20 hover:bg-dorado-antiguo/30 flex items-center justify-center text-dorado-antiguo transition-colors cursor-pointer"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Desplegable de Spotify si desea ver la carátula */}
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-7 h-7 rounded-full text-dorado-antiguo/70 hover:text-dorado-antiguo flex items-center justify-center cursor-pointer"
          title="Ver en Spotify"
          aria-label="Ver detalles"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </aside>
  );
}
