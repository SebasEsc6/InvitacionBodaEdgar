"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, Music, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface MusicPlayerProps {
  /** Enlace o ID de la canción en Spotify como respaldo */
  trackId?: string;
  /** Ruta al archivo de audio local (alojado en public/audio/) */
  audioSrc?: string;
  /** Si debe intentar reproducir automáticamente al iniciar la página */
  autoPlay?: boolean;
}

export default function MusicPlayer({
  trackId = "4l5HZ6iRc2oN5NtcT141yq",
  audioSrc = "/audio/musica.mp3",
  autoPlay = true,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasLocalAudio, setHasLocalAudio] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);

  // 1. Configurar metadatos del reproductor del sistema (iOS Dynamic Island, Pantalla de Bloqueo, Centro de Control, Android)
  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Nuestra Boda",
        artist: "Edgar & Camila",
        album: "5 de Diciembre de 2026",
        artwork: [
          {
            src: "/images/monograma-ec.jpg",
            sizes: "512x512",
            type: "image/jpeg",
          },
          {
            src: "/images/monograma-ec.jpg",
            sizes: "1024x1024",
            type: "image/jpeg",
          },
        ],
      });

      try {
        navigator.mediaSession.setActionHandler("play", () => {
          userPausedRef.current = false;
          audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
        });
        navigator.mediaSession.setActionHandler("pause", () => {
          userPausedRef.current = true;
          audioRef.current?.pause();
          setIsPlaying(false);
        });
        navigator.mediaSession.setActionHandler("stop", () => {
          userPausedRef.current = true;
          audioRef.current?.pause();
          setIsPlaying(false);
        });
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
          if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - (details.seekOffset || 10), 0);
          }
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
          if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
              audioRef.current.currentTime + (details.seekOffset || 10),
              audioRef.current.duration || 0
            );
          }
        });
      } catch {
        // En navegadores con soporte parcial de handlers
      }
    }
  }, []);

  // 2. Sincronizar estado de reproducción con la sesión de medios del sistema operativo
  useEffect(() => {
    if (typeof window !== "undefined" && "mediaSession" in navigator) {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    }
  }, [isPlaying]);

  // 3. Función para iniciar la reproducción de forma segura
  const startPlayback = useCallback(async () => {
    if (!audioRef.current || userPausedRef.current || hasStartedRef.current) return;

    try {
      audioRef.current.volume = 0.7;
      await audioRef.current.play();
      hasStartedRef.current = true;
      setIsPlaying(true);
      setShowPrompt(false);
    } catch {
      // Si las directivas de autoplay del navegador bloquean la reproducción sin interacción,
      // mostramos el tooltip para invitar a la primera interacción
      setShowPrompt(true);
    }
  }, []);

  // 4. Autoplay inteligente:
  // - Intento directo al montar
  // - Fallback al primer toque, clic o desplazamiento en cualquier parte
  useEffect(() => {
    if (!autoPlay) return;

    startPlayback();

    const handleFirstInteraction = () => {
      if (userPausedRef.current || hasStartedRef.current) return;
      startPlayback();
    };

    const interactionEvents = ["click", "touchstart", "scroll", "keydown"] as const;
    interactionEvents.forEach((event) => {
      window.addEventListener(event, handleFirstInteraction, { passive: true, once: true });
    });

    return () => {
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, handleFirstInteraction);
      });
    };
  }, [autoPlay, startPlayback]);

  // 5. Garantizar que nunca existan múltiples elementos de audio sonando en simultáneo
  useEffect(() => {
    if (typeof document !== "undefined") {
      const allAudios = document.querySelectorAll<HTMLAudioElement>("audio");
      if (allAudios.length > 1) {
        allAudios.forEach((audioEl) => {
          if (audioEl !== audioRef.current) {
            audioEl.pause();
            audioEl.currentTime = 0;
            audioEl.remove();
          }
        });
      }
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  // Manejo de reproducción / pausa manual del usuario
  const togglePlay = () => {
    setShowPrompt(false);

    if (hasLocalAudio && audioRef.current) {
      if (isPlaying) {
        userPausedRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        userPausedRef.current = false;
        hasStartedRef.current = true;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Reproducción no permitida por el navegador:", err);
            setIsPlaying(false);
          });
      }
    } else {
      // Si no hay archivo MP3 local, alternar tarjeta de Spotify
      setIsExpanded((prev) => !prev);
    }
  };

  // Ocultar globo flotante automáticamente tras 6 segundos
  useEffect(() => {
    if (showPrompt) {
      const timer = setTimeout(() => {
        setShowPrompt(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [showPrompt]);

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
          playsInline
          onCanPlay={() => {
            if (autoPlay && !hasStartedRef.current && !userPausedRef.current) {
              startPlayback();
            }
          }}
          onPlay={() => {
            setIsPlaying(true);
            hasStartedRef.current = true;
          }}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasLocalAudio(false)}
        />
      )}

      {/* Globo sutil de bienvenida si el navegador requiere un primer toque */}
      {showPrompt && !isPlaying && (
        <div
          onClick={togglePlay}
          className="mb-2.5 cursor-pointer bg-verde-bosque/90 backdrop-blur-md text-marfil text-xs px-4 py-2 rounded-full shadow-gold border border-dorado-antiguo/30 flex items-center gap-2 animate-bounce"
        >
          <Music className="w-3.5 h-3.5 text-dorado-antiguo" />
          <span className="font-sans font-light">Toca para reproducir música</span>
        </div>
      )}

      {/* Tarjeta de Spotify o Detalles (se muestra si no hay archivo local o si el usuario la despliega) */}
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

      {/* Botón flotante estilizado con monograma de Edgar & Camila */}
      <div className="flex items-center bg-verde-bosque-dark/95 backdrop-blur-md border border-dorado-antiguo/50 rounded-full shadow-luxury p-1.5 pl-2 gap-2.5 transition-transform hover:scale-105">
        <button
          onClick={togglePlay}
          className="flex items-center gap-2.5 text-left text-marfil focus:outline-none cursor-pointer"
          title={isPlaying ? "Pausar música" : "Reproducir música"}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {/* Monograma en miniatura con anillo dorado y estado activo */}
          <div className="relative flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/monograma-ec.jpg"
              alt="E & C"
              className="h-8 w-8 rounded-full border border-dorado-antiguo/60 object-cover shadow-sm"
            />
            {isPlaying && (
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dorado-antiguo opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-dorado-antiguo" />
              </span>
            )}
          </div>

          {/* Ecualizador animado */}
          <div className="flex items-end gap-0.5 h-4 w-3.5">
            <span
              className={`w-0.5 bg-dorado-antiguo rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-pulse" : "h-1.5"
              }`}
            />
            <span
              className={`w-0.5 bg-dorado-antiguo rounded-full transition-all duration-300 ${
                isPlaying ? "h-3 animate-pulse delay-75" : "h-2"
              }`}
            />
            <span
              className={`w-0.5 bg-dorado-antiguo rounded-full transition-all duration-300 ${
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
