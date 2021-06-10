import React, { Component,useState,useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { Paper,Fab,Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, } from '@material-ui/core';
import { COLOR } from "../Constants/Color";

const Player = (props) => 
{
    const [state,setState] = useState({
        videoId : props.match.params.id,
        videoSrc: `http://localhost:4000/video/${props.match.params.id}`,
        videos: [],
        videoData : {},
        seekDuration : 0,
        transitionDate : ''

    })

    const {videoId,videoSrc,videoData,videos,seekDuration,transitionDate} = state

    const [isSidebarOpen,toggleSidebar] = useState(false)

   useEffect(() => 
    {
        try 
        {
            fetch(`http://localhost:4000/video/${videoId}/data`)
            .then(res => {
                res.json()
                .then(data => {setState({ ...state,videoData: data })})
                .catch(e => console.log(e))
            })
            .catch(err =>console.log(err))

            fetch('http://localhost:4000/videos').then(response => {
                response.json()
                .then((data) => {setState({ ...state,videos: [...data] });})
                .catch(e => console.log(e))
            })
            .catch(error => console.log(error))
        }
        catch (error)
        {
            console.log(error);
        }
    },[])

    const changeVideo = (id) => 
    {
        if(id === videoId)
            return
        const videoElement = document.getElementById('video_element');
        let duration = videoElement.currentTime >= (videoElement.duration) ? 0 : videoElement.currentTime
        duration = Number(duration).toFixed()

        setState({...state,videoId:id,videoSrc:`http://localhost:4000/video/${id}`,videoData:videos[id],seekDuration:duration,transitionDate:new Date()});
        videoElement.src = `http://localhost:4000/video/${id}`

        videoElement.currentTime = duration;


    }


    
    return (    
        <div >
            <Drawer
                variant="temporary"
                anchor="left"
                open={isSidebarOpen}
                onClose={() => toggleSidebar(false)}
                onOpen={() => toggleSidebar(true)}
                // children=
                
            >
                <List className="bg-dark">
                    {videos.map((e, index) => (
                    <ListItem id={e.id} button key={e.id} onClick={() => changeVideo(e.id)}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                            </svg>
                        </ListItemIcon>
                        <ListItemText primary={e.name} />
                    </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
            <Paper elevation={3} variant="outlined" className="top_bar text-white mt-4 mb-3 ml-4 mr-4  p-3">
				<Row>
					<Col md={5} className="summary_heading">
                        { videoData.name }
					</Col>
				</Row>
				
            </Paper>
            <Paper elevation={3} variant="outlined" className="bg-dark-local text-white mt-2 ml-4 mr-4" style={{border: `solid 2px ${COLOR.SELECTED_ROW}`, backgroundColor: COLOR.SELECTED_ROW}}>
                <Row style={{marginLeft:'1px',marginRight:'1px',padding:'50px'}}>
                    <Col md={12} >
                        <div  >
                            <Fab variant="extended" style={{backgroundColor:COLOR.BUTTON_SUCCESS_BLUE, color:COLOR.WHITE, zIndex:99, top: '50px'}} onClick={()=>{toggleSidebar(!isSidebarOpen)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                    <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                                </svg>
                                Change Perspective
                            </Fab>
                            <video id="video_element" controls muted autoPlay width="1080px" style={{minHeight:'720px',minWidth:'1080px'}}>
                                <source src={videoSrc} type="video/mp4"></source>
                            </video>
                        </div>
                    </Col>
                </Row>
            </Paper>
        </div>
    )
}

export default Player