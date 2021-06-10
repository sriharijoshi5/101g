import React, { Component,useState,useEffect } from 'react'

const Player = (props) => 
{
    const [state,setState] = useState({
        videoId : props.match.params.id,
        videoData : {}
    })

    const {videoId,videoData} = state

   useEffect(() => 
    {
        try 
        {
            fetch(`http://localhost:4000/video/${videoId}/data`)
            .then(res => {
                const data = res.json();
                setState({ ...state,videoData: data });
            })
            .catch(err =>console.log(err))
        }
        catch (error)
        {
            console.log(error);
        }
    },[])

    return (    
        <header className="App-header">
            <video controls muted autoPlay>
                <source src={`http://localhost:4000/video/${videoId}`} type="video/mp4"></source>
            </video>
            <h1>{ videoData.name }</h1>
        </header>
    )
}

export default Player