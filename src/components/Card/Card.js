import React from 'react'
import "./Card.css";
import {BsDownload} from "react-icons/bs";
import {motion} from "framer-motion";

const Card = ({src,name,likes,profile,download_link,width,image_size}) => {
  return (
    <motion.div 
    initial = {{
        opacity:0.1,
        y:300
    }}
    animate = {{
        opacity:1,
        y:0
    }}
    transition = {{
        duration:1.5
    }}
    className={`card ${width}`}>
        <div 
        className="card-image">
            <img className={image_size} src={src} alt="" />
        </div>
        <div className="card-body">
            <div className="user-info">
                <div className="image">
                    <img src={profile} alt="avatar" />
                </div>
                <div className="info">
                    <h4>{name}</h4>
                    <p>{likes} Likes Recieved</p>
                </div>
            </div>
            <div className="download-info">
               <a href={download_link}><BsDownload /></a>
            </div>
        </div>
    </motion.div>
  )
}

export default Card