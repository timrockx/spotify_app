import { useState, useEffect } from 'react';
import axios from 'axios';
import Artist from './Artist';
import Track from './Track';

export default function UserTops() {

    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    useEffect(() => {

        const getArtists = () => {
            axios.get('http://localhost:8888/top-artists')
                .then(res => {
                    setTopArtists(res.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: Profile.jsx:34 ~ getArtists ~ err", err)
                })
        };

        const getTracks = () => {
            axios.get('http://localhost:8888/top-tracks')
                .then(res => {
                    setTopTracks(res.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: Profile.jsx:34 ~ getTracks ~ err", err)
                })

        }

        getArtists();
        getTracks();

    }, []);

  return (
    <div className='flex flex-row flex-wrap gap-y-4 justify-between items-center px-40'>
        {/* {topArtists?.map((artist, index) => {
                return (
                    <div key={index} className='pr-px'>
                        <Artist name={artist.name} link={artist.external_urls.spotify} genres={artist.genres} image={artist.images[0].url} />
                    </div>
                )
            })
        } */}

        {topTracks?.slice(0, 10).map((track, index) => {
            return (
                <div key={index}>
                    <Track name={track.name} link={track.external_urls.spotify} album={track.album.name} image={track.album.images[0].url} artists={track.artists} />
                </div>


                
            )
        })}
    </div>
  )
}
