import { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';
import Artist from './Artist';
import Track from './Track';

export default function UserTops() {

    // handle top artists and tracks
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    // handle show more buttons for tracks are artists
    const [expandedArtists, setExpandedArtists] = useState(false);
    const artistsDisplay = expandedArtists ? topArtists : topArtists.slice(0, 5);

    const [expandedTracks, setExpandedTracks] = useState(false);
    const tracksDisplay = expandedTracks ? topTracks : topTracks.slice(0, 5);

    let backendURL = 'https://spotify-app-server.onrender.com';

    useEffect(() => {

        // console.log(process.env)

        const getArtists = () => {
            axios.get(`${backendURL}/top-artists`)
                .then(res => {
                    setTopArtists(res.data);
                })
                .catch(err => {
                    console.log("🚀 ~ file: Profile.jsx:34 ~ getArtists ~ err", err)
                })
        };

        const getTracks = () => {
            axios.get(`${backendURL}/top-tracks`)
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
    <div className='flex flex-col px-40'>

        <Tabs selectedTabClassName='text-[#1ED760]' focusTabOnClick={false}>
            <TabList className='text-3xl text-white text-center pb-8 flex justify-around items-center'>
                <Tab className='hover:scale-110 hover:cursor-pointer'>Top Artists</Tab>
                <Tab className='hover:scale-110 hover:cursor-pointer'>Top Songs</Tab>
            </TabList>

            <TabPanel>
                {/* <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl py-8'>Recent Top Artists</h1>
                </div> */}

                <div className='w-screen flex flex-row flex-wrap gap-y-4 justify-center items-center py-5 px-24'>
                    {artistsDisplay?.map((artist, index) => {
                            return (
                                <div key={index} className='px-5'>
                                    <Artist name={artist.name} link={artist.external_urls.spotify} genres={artist.genres} image={artist.images[0]?.url} />
                                </div>
                            )
                    })}
                </div>

                <div className='flex flex-col justify-center items-center pt-8 m-auto'>
                    <button type='button' className='text-white rounded-full border-solid border-white border-2 p-3 my-2 w-1/5 hover:bg-[#1ED760] hover:text-black hover:border-black' onClick={() => setExpandedArtists(!expandedArtists)}>
                        {expandedArtists ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </TabPanel>

            <TabPanel>
                {/* <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-white text-4xl py-8'>Recent Top Songs</h1>
                </div> */}

                <div className='w-screen shrink-0 flex flex-col flex-wrap gap-y-4 justify-start items-start'>
                    {tracksDisplay?.map((track, index) => {
                        return (
                            <div key={index}>
                                <Track name={track.name} link={track.external_urls.spotify} album={track.album.name} image={track.album.images[0].url} artists={track.artists} length={track.duration_ms} />
                            </div>
                        )
                    })}    
                </div>

                <div className='flex flex-col justify-center items-center pt-8 m-auto'>
                    <button type='button' className='text-white rounded-full border-solid border-white border-2 p-3 my-2 w-1/5 hover:bg-[#1ED760] hover:text-black hover:border-black' onClick={() => setExpandedTracks(!expandedTracks)}>
                        {expandedTracks ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            </TabPanel>
        </Tabs>

        

        
 

       


    </div>
  )
}
