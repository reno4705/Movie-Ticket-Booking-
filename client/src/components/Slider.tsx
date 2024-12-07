import React from 'react'
import Carousel from "react-material-ui-carousel"; 
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import banner4 from '../assets/banner4.png';

const data: string[] = [
  banner1, banner2, banner3, banner4,
];

const Slider: React.FC = () => {
  return (
    <div>
      <Carousel
                className="carasousel"
                autoPlay={true}
                animation="slide"
                indicators={false}
                navButtonsAlwaysVisible={true}
                cycleNavigation={true}
                NextIcon={<ArrowForwardIosIcon style={{ fontSize: '3rem' }} />}
                PrevIcon={<ArrowBackIosNewIcon style={{ fontSize: '3rem' }} />}
                navButtonsProps={{
                    style: {
                        // backgroundColor: "#fff",
                        backgroundColor: "transparent" ,
                        color: "white",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "50px",
                        margin: -2
                    },
                }}
            >
                {data.map((imag, i) => {
                    return (
                        <>
                            <img
                                src={imag}
                                alt="carousel-img"
                                key={i}
                                className="h-[550px] w-full"
                            />
                        </>
                    );
                })}
            </Carousel>
    </div>
  )
}

export default Slider