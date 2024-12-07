import React from 'react';
import Slider from '../components/Slider';
import Moviecarousel from '../components/Moviecarousel';

const Home: React.FC = () => {
    return (
        <div className=''>
            <Slider/>
            <Moviecarousel/>
        </div>
    )
}

export default Home;