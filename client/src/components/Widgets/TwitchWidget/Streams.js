import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "./Api";
function Stream() {
  const [streams, setStreams] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get("https://api.twitch.tv/kraken/streams");
      console.log(result);
      setStreams(result.data.streams);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Most Popular Live Streams</h1>
      <div className="row">
        {streams.map((stream) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
            <div className="card">
              <img className="card-img-top" src={stream.preview.medium} />
              <div className="card-body">
                <h3 className="card-title">{stream.channel.display_name}</h3>
                <h5 className="card-text"> {stream.game}</h5>
                <div className="card-text">{stream.viewers} live viewers</div>
                <button className="btn btn-success">
                  <Link
                    className="link"
                    to={{
                      pathname:
                        "/game/" +
                        stream.game +
                        "/channel/" +
                        stream.channel.display_name,
                      state: {
                        gameID: stream.game,
                        channelName: stream.channel.display_name,
                        viewers: stream.viewers,
                      },
                    }}
                  >
                    {stream.game} streams{" "}
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stream;
