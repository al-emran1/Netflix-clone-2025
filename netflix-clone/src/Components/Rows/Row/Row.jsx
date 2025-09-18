import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(""); // store trailer URL

  const base_url = "https://image.tmdb.org/t/p/original";

  // Fetch movies
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    })();
  }, [fetchUrl]);

  // Handle movie click to fetch trailer
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // Reset trailer if already playing
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          console.log("Trailer URL: ", url); // Log the URL to see what is returned
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            const videoId = urlParams.get("v");

            // Check if the videoId is valid
            if (videoId) {
              setTrailerUrl(videoId); // Set the trailer URL if valid
            } else {
              console.error("Invalid URL returned from movieTrailer");
            }
          } else {
            console.error("No URL returned from movieTrailer");
          }
        })
        .catch((error) => console.log(error)); // Handle errors if any
    }
  };

  // YouTube player options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)} // Trigger handleClick on click
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
          />
        ))}
      </div>

      {/* Display trailer if trailerUrl is set */}
      {trailerUrl && (
        <div style={{ padding: "40px" }}>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default Row;
