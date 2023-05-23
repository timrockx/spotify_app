import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import ProfileCard from './ProfileCard';

export default function ({ accessToken }) {

    // profile fields
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [isPremium, setIsPremium] = useState(null);


    // on page load get the information of the signed in user
    useEffect(() => {
        const getProfile = async() => {
            axios.get('http://localhost:8888/me')
            .then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                console.log("🚀 ~ file: Profile.jsx:27 ~ getProfile ~ err:", err);
            })
        }

        getProfile();

    }, []);
    


  return (
    <div className='h-screen bg-[#FAFAFA]'>

        <div className='flex flex-col justify-center items-center p-12 w-3/5 m-auto'>
            <h1 className='text-4xl font-gotham py-5 border-solid border-b-2 border-black'>Unlock Your Spotify Data</h1>
        </div>

        <div className='p-20 flex justify-center items-center'>
            {profile ? 
                <ProfileCard name={profile.display_name} email={profile.email} country={profile.country} premium={profile.product === 'premium' ? true : false} image={profile.images[0].url} /> : null
            }   
        </div>
        
        
    </div>
  )
}
