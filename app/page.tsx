"use client";

import { useEffect, useRef, useState } from "react";

const games = [
  {
    name: "league",
    value: "diamond · jungle · shaco",
  },
  {
    name: "tft",
    value: "master set 16 · hiatus",
  },
];

const interests = [
  "mma",
  "metaphysics",
  "sociology",
  "psychology",
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [entered, setEntered] = useState(false);
  const [time, setTime] = useState("00:00");

  async function enterSite() {
    const video = videoRef.current;

    setEntered(true);

    if (!video) return;

    try {
      video.currentTime = 0;
      video.volume = 0.20;

      await video.play();
    } catch (error) {
      console.error("Video playback failed:", error);
    }
  }

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const updateTime = () => {
      const seconds = Math.floor(video.currentTime);

      const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");

      const remainingSeconds = (seconds % 60)
        .toString()
        .padStart(2, "0");

      setTime(`${minutes}:${remainingSeconds}`);
    };

    video.addEventListener("timeupdate", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  return (
    <main className="page">
      <video
        ref={videoRef}
        className="backgroundVideo"
        loop
        playsInline
        preload="metadata"
      >
        <source
          src="/background.mp4"
          type="video/mp4"
        />
      </video>

      <div className="videoOverlay" />
      <div className="grain" />

      {!entered && (
        <div className="enterScreen">
          <button
            className="enterButton"
            onClick={enterSite}
            type="button"
          >
            enter
          </button>
        </div>
      )}

      <div
        className={`content ${
          entered ? "visible" : ""
        }`}
      >
        <section className="intro">
          <div className="introMeta">
            <span className="eyebrow">
              death obsession
            </span>

            <span className="playbackTime">
              {time}
            </span>
          </div>

          <h1>
            wizard
          </h1>

          <p>
            programmer from wales.
            anonymous musician.
          </p>
        </section>

        <div className="divider" />

        <section className="section">
          <span className="sectionLabel">
            music
          </span>

          <p className="statement">
            deathspell omega supremacy
          </p>

          <a
            className="textLink"
            href="https://rateyourmusic.com/~YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
          >
            rateyourmusic

            <span className="arrow">
              ↗
            </span>
          </a>
        </section>

        <section className="section">
          <span className="sectionLabel">
            games
          </span>

          <div className="factList">
            {games.map((game) => (
              <div
                className="fact"
                key={game.name}
              >
                <span className="factName">
                  {game.name}
                </span>

                <span className="factValue">
                  {game.value}
                </span>
              </div>
            ))}

            <div className="fact">
              <span className="factName">
                dayz
              </span>

              <span className="factValue">
                owner @{" "}

                <a
                  className="inlineLink"
                  href="https://forlorn.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  forlorn pvp

                  <span className="inlineArrow">
                    ↗
                  </span>
                </a>
              </span>
            </div>
          </div>
        </section>

        <section className="section">
          <span className="sectionLabel">
            other interests
          </span>

          <p className="interestLine">
            {interests.map((interest, index) => (
              <span key={interest}>
                {interest}

                {index < interests.length - 1 && (
                  <span className="separator">
                    /
                  </span>
                )}
              </span>
            ))}
          </p>

          <p className="personalNote">
            always alone in the woods.
            preoccupied with things best left alone.
            entirely unconcerned with earthly matters.
          </p>
        </section>

        <footer className="closingNote">
          <span className="closingPrompt">
            want a site like this?
          </span>

          <span className="closingText">
            dm me.
          </span>
        </footer>
      </div>
    </main>
  );
}