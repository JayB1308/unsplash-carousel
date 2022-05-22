import React, { useEffect,useState } from 'react';
import "./Carousel.css";
import axios from "axios";
import Card from '../Card/Card';
import {AiOutlineLeft,AiOutlineSearch} from "react-icons/ai";
import {AiOutlineRight} from "react-icons/ai";
import {FiShuffle} from "react-icons/fi";
const Carousel = () => {
    
    const [images,setImages] = useState([]);

    const [search,setSearch] = useState("");

    const getImages = async () => {
        try {
            const res = await axios.get(`https://api.unsplash.com/photos/?client_id=${process.env.REACT_APP_CLIENT_ID}`);
            console.log(res.data);
            if(res.status === 200)
            {
                setImages(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const shuffleImages = async () =>{
        try {
            const res = await axios.get(`https://api.unsplash.com/photos/random/?count=10&client_id=${process.env.REACT_APP_CLIENT_ID}`);
            setImages(res.data); 
           
        } catch (error) {
            console.log(error);
        }
    }

    const searchImages = async () => {
        try {
            const res = await axios.get(`https://api.unsplash.com/search/photos/?query=${search}&client_id=${process.env.REACT_APP_CLIENT_ID}`);
            setImages(res.data.results);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const calculateWidth = (id) => {
        if(id%2 === 0 )
        {
            return "wide";
        }
        if(id%3 === 0)
        {
            return "narrow";
        }
        return "regular";
    }

    const calculateImage = (id) => {
        if(id%2 === 0 )
        {
            return "wide_image";
        }
        if(id%3 === 0)
        {
            return "narrow_image";
        }
        return "regular_image";
    }

    const slideLeft = () => {
        var slider = document.getElementById("slider")
        slider.scrollLeft = slider.scrollLeft + 300;
    }

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 300;
    }


    useEffect(() => {
        getImages();
    },[]);

  return (
    <div className="carousel">
    <div className="top-bar">
        <div className="search-field">
        <input type="text" placeholder='Search Tags'
        value={search}
        onChange = {(e) => {setSearch(e.target.value)}}/>
        <button
        onClick={searchImages}
        ><AiOutlineSearch id="search-icon"/></button>
        </div>
        <button id="shuffle-button"
        onClick={shuffleImages}>Shuffle<FiShuffle /></button>
    </div>
        <div className="cards" id="slider">
        {
            images.map((image,i) => {
                return (
                    <Card key={image.id} 
                    src={image.urls.small} 
                    name={image.user.name} 
                    likes={image.likes}
                    profile={image.user.profile_image.small}
                    download_link ={image.links.download}
                    width={calculateWidth(i)}
                    image_size = {calculateImage(i)}
                    />
                )
            })
        }
        </div>
        <div className="buttons">
            <button onClick={slideRight}><AiOutlineLeft /></button>
            <button onClick={slideLeft}><AiOutlineRight /></button>
        </div>
    </div>
  )
}

export default Carousel