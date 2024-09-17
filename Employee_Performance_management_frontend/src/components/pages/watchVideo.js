// import React from "react";
// import "./getStart.css";

// export default function WatchVideo() {
//   return (
//     <div className="hero-container">
//       <video src="https://youtu.be/X9ivR4y03DE" />
//     </div>
//   );
// }
import React from "react";
import "./getStart.css";

export default function WatchVideo() {
  return (
    <div className="hero-container">
      <video src="/videos/office-2.mp4" autoPlay loop muted />
      <div className="hero-container">
        <iframe
          // width="1600"
          // height="800"
          width="80%"
          height="83%"
          src="https://www.youtube.com/embed/X9ivR4y03DE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
