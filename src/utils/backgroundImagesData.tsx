import { FilterOptions } from "./constants";

// Images
import BeachImage from '@/assets/images/backgrounds/beach.jpg';
import VioletImage from '@/assets/images/backgrounds/violet.jpg';
import ColorfulImage from '@/assets/images/backgrounds/colorful.jpg';
import DarkNatureImage from '@/assets/images/backgrounds/dark-nature.jpg';
import SunriseImage from '@/assets/images/backgrounds/sunrise.jpg';
import HomeTvImage from '@/assets/images/backgrounds/home-tv.jpg';
import CampImage from '@/assets/images/backgrounds/camp.jpg';
import HomeImage from '@/assets/images/backgrounds/home.jpg';
import SunsetImage from '@/assets/images/backgrounds/sunset.jpg';

// Icons
import CrossCircleIco from '@/assets/images/svg/Cross-Circle.svg?react';
import HardBlurIco from '@/assets/images/svg/Blur-hard.svg?react';
import SparkleStarIco from '@/assets/images/svg/Sparkle-Star.svg?react';


export const BackgroundButtons = [
    {
        text: "No effects", 
        ico: <CrossCircleIco/>,
        value: FilterOptions.none,
    },
    {
        text: "Blur", 
        ico: <HardBlurIco/>,
        value: FilterOptions.blur,
    },
    {
        text: "Touch-up", 
        ico: <SparkleStarIco/>,
        value: FilterOptions.image,
    }
];

export const BackgroundsFroYou = [
    {
        src: BeachImage, 
        alt: "Beach background",
    }, 
    {
        src: ColorfulImage,
        alt: "Colorful background",
    }, 
    {
        src: VioletImage,
        alt: "Violet background",
    },
];

export const BackgroundsDefault = [
    {
        src: DarkNatureImage, 
        alt: "Nature background",
    },
    {
        src: SunriseImage, 
        alt: "Sunrise background",
    },
    {
        src: HomeTvImage, 
        alt: "Home background",
    },
    {
        src: CampImage, 
        alt: "Camp background",
    },
    {
        src: HomeImage, 
        alt: "Home background",
    },
    {
        src: SunsetImage,
        alt: "Sunset background",
    }
];