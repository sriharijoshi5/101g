import React, { Component,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = (props) => 
{
    const [state,setState] = useState({ 
        videos: []
    })
    const {videos} = state

    useEffect(() =>
    {
        try
        {
            fetch('http://localhost:4000/videos').then(response => {
                const data = response.json()
                .then((data) => {setState({ ...state,videos: [...data] });})
                .catch(e => console.log(e))
            })
            .catch(error => console.log(error))
        }
        catch (err)
        {
            console.log(err);
        }
    },[])

    return (
        <div className="container">
            <div className="row">
                {videos.map(video =>
                <div className="col-md-4" key={video.id}>
                    <Link to={`/player/${video.id}`}>
                        <div className="card border-0">
                            <img src={`http://localhost:4000${video.poster}`} alt={video.name} />
                            <div className="card-body">
                                <p>{video.name}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                )}
            </div>
        </div>
    )
}

export default Home