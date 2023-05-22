import React from 'react';
import { Button } from '@mui/material';

type Props = {}

export default function Home({}: Props) {
  return (
    <div className="flex flex-col m-0 justify-center items-center">
        <Button variant='contained'>Sign in</Button>
    </div>
  )
}