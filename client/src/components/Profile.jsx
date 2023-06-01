import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import ProfileHeading from './ProfileHeading';
import UserTops from './UserTops';
import Error from './Error';

export default function ({ accessToken }) {

    // profile object
    const [profile, setProfile] = useState(null);
    const [following, setFollowing] = useState(null);

    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const [isError, setIsError] = useState(false);

    // on page load get the information of the signed in user
    useEffect(() => {
        const getProfile = async() => {
            axios.get(`${backendURL}/me`)
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                setIsError(true);
                console.log("🚀 ~ file: Profile.jsx:27 ~ getProfile ~ err:", err.status);
            })
        };

        const getFollowing = async() => {
            axios.get(`${backendURL}/following`)
            .then(res => {
                setFollowing(res.data.artists.items.length);
            })
            .catch(err => {
                console.log("🚀 ~ file: Profile.jsx:31 ~ getFollowing ~ err:", err.response.status);
                setIsError(true);
            })
        }

        getProfile();
        getFollowing();

    }, []);


  return (
    isError ? 
        <Error />
    :
    <div className='min-h-screen min-w-screen bg-[#1b1b1b] overflow-hidden'>

        <div className='flex flex-col justify-center items-center'>
            {profile ? 
                <ProfileHeading 
                    id={profile.id}
                    name={profile.display_name} 
                    image={profile.images[0]?.url} 
                    link={profile.external_urls.spotify}
                    followers={profile.followers.total}
                    following={following}
                /> : null
            }   
        </div>

        <div className='flex flex-col justify-center items-center pb-10'>
            <UserTops />
        </div>

    </div>
  )
}
