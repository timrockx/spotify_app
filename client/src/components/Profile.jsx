import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import ProfileHeading from './ProfileHeading';
import UserTops from './UserTops';

export default function ({ accessToken }) {

    // profile object
    const [profile, setProfile] = useState(null);
    const [following, setFollowing] = useState(null);

    let backendURL = 'https://spotify-app-server.onrender.com';

    // on page load get the information of the signed in user
    useEffect(() => {
        const getProfile = async() => {
            axios.get(`${backendURL}/me`)
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: Profile.jsx:27 ~ getProfile ~ err:", err);
            })
        };

        const getFollowing = async() => {
            axios.get(`${backendURL}/following`)
            .then(res => {
                setFollowing(res.data.artists.items.length);
            })
            .catch(err => {
                console.log("🚀 ~ file: Profile.jsx:31 ~ getFollowing ~ err:", err);
            })
        }

        getProfile();
        getFollowing();

    }, []);


  return (
    <div className='min-h-screen bg-[#1b1b1b]'>

        <div className='flex flex-col justify-center items-center'>
            {profile ? 
                <ProfileHeading 
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
