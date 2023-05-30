import { useState, useRef, useEffect } from 'react';
import { Avatar, IconButton, Modal } from '@mui/material';
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { ToastContainer, toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

export default function Track({ id, name, link, album, image, artists, length, isRecommendation }) {

    const msToMinutesAndSeconds = (ms) => {
        var minutes = Math.floor(ms / 60000);
        var seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    let backendURL = 'https://spotify-app-server.onrender.com';

    if(process.env.NODE_ENV !== 'production') {
        backendURL = 'http://localhost:8888';
    }

    const toastId = useRef(null);

    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        setOpen(true);

        console.log(id)
        axios.get(`${backendURL}/audio-features/${id}`)
            .then(res => {
                console.log(res.data)
                setAcousticness(res.data.acousticness)
                setDanceability(res.data.danceability)
                setEnergy(res.data.energy)
                setValence(res.data.valence)
            })
            .catch(err => {
                console.log('Error getting audio features')
            })
    }

    const handleClose = () => setOpen(false);

    const addTrack = (id) => {

        toastId.current = toast.loading('Adding...', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        
        axios.get(`${backendURL}/add-track/${id.id}`)
            .then(res => {
                if(res.status === 200) {
                    toast.update(toastId.current, {
                        render: 'Song added to Liked Songs!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000,
                    })
                }
            })
            .catch(err => {
                if(err.response.status === 400) {
                    toast.update(toastId.current, {
                        render: 'Error adding song. Please try again.',
                        type: 'error',
                        isLoading: false,
                        autoClose: 3000,
                    })
                }
            })
    };

    const [acousticness, setAcousticness] = useState(0);
    const [danceability, setDanceability] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [valence, setValence] = useState(0);

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: ['Acousticness', 'Danceability', 'Energy', 'Valence',],
        datasets: [
            {
                data: [acousticness, danceability, energy, valence],
                backgroundColor: [
                    'purple',
                    '#1ED760',
                    '#0763e5',
                    '#F88379',
                ],
                borderColor: [
                    'purple',
                    '#1ED760',
                    '#0763e5',
                    '#F88379',
                ],
                borderWidth: 1,
            },
        ],
    };
    const plugin = {
        beforeInit(chart) {
          console.log("be");
          // reference of original fit function
          const originalFit = chart.legend.fit;
      
          // override the fit function
          chart.legend.fit = function fit() {
            // call original function and bind scope in order to use `this` correctly inside it
            originalFit.bind(chart.legend)();
            // increase the width to add more space
            this.height += 20;
          };
        }
    };

  return (
    <div>
        <div className='px-24 w-screen flex flex-row shrink-0 justify-start items-center m-auto rounded-lg shadow-2xl'>
            <Avatar alt={name} src={image} variant='square' sx={{ width: 72, height: 72 }}/>

            <div className='flex flex-col justify-start items-start w-full p-5'>


                <h1 className='text-white text-xl py-2'>
                    {/* <a href={link} target='_blank' className='hover:text-[#1ED760]'>{name}</a> */}
                    <a onClick={() => handleOpen(id)} className='hover:text-[#1ED760]'>{name}</a>
                </h1>

                <div className='hidden md:flex flex-row justify-start items-center'>
                    {artists.slice(0,3)?.map((artist, index) => {
                        return (
                            <div key={index}>
                                <h2 className='text-white text-md px-1'>
                                    <a href={artist.external_urls.spotify} target='_blank' className='hover:underline hover:text-[#1ED760]'>{artist.name}</a>
                                </h2>
                            </div>
                        )
                    })}
                    
                    <h1 className='text-white text-md'>&#183; {album}</h1>
                </div>
            </div>

            {!length  ? 
            <div className='text-white flex flex-col justify-center items-center p-5'>
                <IconButton onClick={() => {addTrack({id})}} >
                    <AddCircleOutlineIcon sx={{ color: 'white', "&:hover": {color: '#1ED760', scale: '1.3'} }} />
                </IconButton>
            </div>
            :
            <div className='text-white flex justify-center items-center px-5'>
                <h1>{msToMinutesAndSeconds(length)}</h1>
            </div>
            }

            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='w-4/6 sm:w-4/6 md:w-3/6 lg:w-3/6 xl:w-5/12 m-auto bg-[#222222] bg-opacity-95 flex flex-col justify-center items-center mt-5 xs:mt-12 sm:mt-24 md:mt-36 lg:mt-5 xl:mt-8 mb-72 rounded-xl px-20 pt-8 pb-4'>
                    
                    <div className='flex flex-row justify-center items-center border-b-white border-b-2 pb-5 mb-4'>
                        <Avatar alt={name} src={image} variant='square' sx={{ width: 90, height: 90 }}/>

                        <div className='flex flex-col justify-center items-start px-5'>
                            <h3 className='text-white text-2xl py-2 xs:text-sm sm:text-md md:text-lg lg:text-xl'>{name}</h3>
                            
                            <div className='hidden lg:hidden md:hidden xl:flex flex-row justify-start items-center w-full'>
                                {artists.slice(0,3)?.map((artist, index) => {
                                    return (
                                        <div key={index}>
                                            <h2 className='text-white text-md px-1'>
                                                <a href={artist.external_urls.spotify} target='_blank' className='hover:underline hover:text-[#1ED760]'>{artist.name}</a>
                                            </h2>
                                        </div>
                                    )
                                })}
                                
                                <h1 className='text-white text-md'>&#183; {album}</h1>
                            </div>
                        </div>

                        <IconButton sx={{ color: '#1ED760' }} href={link} target='_blank'>
                            <PlayCircleIcon fontSize='large' />
                        </IconButton>      
                    </div>

                    <Doughnut data={data} plugins={[plugin]}/>

                    <div className='text-white text-center pt-3 hidden md:block lg:block xl:block'>
                        <ul className='list-none text-white'>
                            <li><em>Valence is a measure of musical positiveness.</em></li>
                            <li><em>All measures range on a scale from 0.0 to 1.0.</em></li>
                        </ul>
                    </div>
                </div>
            </Modal>

            
        </div>
        <ToastContainer />
    </div>
  )
}
