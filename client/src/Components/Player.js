import React, { Component,useState,useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { Paper,Fab,Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, } from '@material-ui/core';
import { COLOR } from "../Constants/Color";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";

import { Link } from 'react-router-dom';

const Player = (props) => 
{
    const [state,setState] = useState({
        videoId : props.match.params.id,
        shopItNow : [{
    
            id: 7,
            poster: `https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/768399/01/fnd/IND/fmt/png/Royal-Challengers-Bangalore-Men's-Replica-Slim-fit-Jersey`,
        
                duration: 144,
                name: 'RCB Shirt',
                link:`https://in.puma.com/in/en/pd/royal-challengers-bangalore-mens-replica-slim-fit-jersey/4064535053425.html?utm_medium=PLA&utm_source=GGL-SSH&utm_aud=OTH&utm_obj=OLC&utm_campaign=PLA_GGL_SSH_OTH_Smart_Shopping_Auto_Discounted&gclid=Cj0KCQjw8IaGBhCHARIsAGIRRYqDJXRVtJwOBwj2BAnuxuQLENAnF7d9l0gyn1y0H250A6Z8cWAN3fQaAk1tEALw_wcB#`
        },
        {
                poster: 'https://www.panerai.com/content/dam/rcq/pan/21/28/39/9/2128399.png.transform.global_square_image_500_2x.png',
            id: 8,
                duration: 206,
                name: 'MSD Watch',
                link:`https://www.panerai.com/en/collections/watch-collection/luminor/pam01122-luminor-marina-44mm---guillaume-nery-edition.html`
        },
        {
                poster: 'https://rukminim1.flixcart.com/image/832/832/jbqtqq80/guard/k/f/r/ambidextrous-lglw-large-2-na-leg-guard-moonwalkr-original-imaeyzpweyhc8grb.jpeg?q=70',
                id: 9,
                duration: 210,
                name: 'AB de Velliers Batting Pad ',
                link: `https://www.brewingcricket.com/products/moonwalker-batting-pads`
        
    }],
        videoSrc: `http://localhost:4000/video/${props.match.params.id}`,
        videos: [{
            id: 0,
            poster: '/video/0/poster',
            duration: '3 mins',
            name: 'Wicket Keeper'
        },
        {
            id: 1,
            poster: '/video/1/poster',
            duration: '4 mins',
            name: 'Batsmen Perspective',
        },
        {
            id: 2,
            poster: '/video/2/poster',
            duration: '2 mins',
            name: 'Umpire Perspective'
        }],

        reliveEvents:[{
            id: 4,
            poster: 'https://penbugs.com/wp-content/uploads/2020/03/received_179725176786605.gif',
        
                duration: 140,
                name: 'Four'
        },
        {
                poster: 'https://p.imgci.com/db/PICTURES/CMS/268200/268254.gif',
            id: 5,
                duration: 202,
                name: 'Six'
        },
        {
                poster: 'https://www.cricketwale.com/wp-content/uploads/2017/09/gii.gif',
                id: 6,
                duration: 210,
                name: 'Wicket'
        },
        {
            poster: 'https://s4.scoopwhoop.com/anj/sachin/838739553.gif',
            id: 7,
            duration: 210,
            name: 'Slomo'
        }],
        videoData : {},
        seekDuration : 0,
        transitionDate : ''

    })

    const {videoId,videoSrc,videoData,videos,seekDuration,transitionDate,reliveEvents,shopItNow} = state

    const [isSidebarOpenLeft,toggleSidebarLeft] = useState(false)

    const [isSidebarOpenRight,toggleSidebarRight] = useState(false)

    const [isSidebarOpenBottom,toggleSidebarBottom] = useState(false)



   useEffect(() => 
    {
        try 
        {
            fetch(`http://localhost:4000/video/${videoId}/data`)
            .then(res => {
                res.json()
                .then(data => {console.log(data); setState({ ...state,videoData: data })})
                .catch(e => console.log(e))
            })
            .catch(err =>console.log(err))

            if(videos==[])
                fetch('http://localhost:4000/videos').then(response => {
                 response.json()
                .then((data) => {setState({ ...state,videos: [...data] });})
                .catch(e => console.log(e))
            })
            .catch(error => console.log(error))
            async function fetchReliveEvents(){
                await fetch('http://localhost:4000/reliveEvents').then(response => {
                response.json()
                .then((data) => {setState({ ...state,reliveEvents: [...data] });})
                .catch(e => console.log(e))
            })
            .catch(error => console.log(error))
        }
        fetchReliveEvents()
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
        let duration = videoElement.currentTime > (videoElement.duration -10) ? 0 : videoElement.currentTime
        duration = Number(duration).toFixed()

        setState({...state,videoId:id,videoSrc:`http://localhost:4000/video/${id}`,videoData:videos[id],seekDuration:duration,transitionDate:new Date()});
        videoElement.src = `http://localhost:4000/video/${id}`

        videoElement.currentTime = duration;

    }
    const seekToPoint = (e)=>{
        let time = e.duration
        let name = e.name
        if(name === "Slomo"){
            const videoElement = document.getElementById('video_element');
            videoElement.currentTime = time;
            videoElement.playbackRate = 0.5;
            setTimeout(()=>{videoElement.playbackRate = 1;},10000)
        }
        else{
            const videoElement = document.getElementById('video_element');
        videoElement.currentTime = time;
    }
        
    }

    const buyItNow = (link) =>{
        window.open(link)
        
    }
    return (    
        <div >
            <Drawer
                variant="temporary"
                anchor="bottom"
                open={isSidebarOpenBottom}
                onClose={() => toggleSidebarBottom(false)}
                onOpen={() => toggleSidebarBottom(true)}
                // style={{backgroundColor:"grey"}}
            >

<Row style={{marginLeft:'1px',marginRight:'1px',padding:'50px'}}>
                        {
                        videos.map(video =>
                        <Col md={4} key={video.id}>
                            <Card style={{backgroundColor:COLOR.SELECTED_ROW}}>
                                <CardImg top width="100%" src={`http://localhost:4000${video.poster}`} alt={video.name} />
                                <CardBody>
                                    <CardTitle tag="h5">{video.name}</CardTitle>
                                    <Link to={`/player/${video.id}`} props={videos}>
                                        <Button onClick={() => changeVideo(video.id)} >View</Button>
                                    </Link>
                                </CardBody>
                             </Card>
                        </Col>
                    )}            
                </Row>




                    ))
                {/* </List> */}
                <Divider />
            </Drawer>
            <Drawer
                variant="temporary"
                anchor="left"
                open={isSidebarOpenLeft}
                onClose={() => toggleSidebarLeft(false)}
                onOpen={() => toggleSidebarLeft(true)}
                // style={{backgroundColor:"grey"}}
            >
                <List>
                    {reliveEvents.map((e, index) => (
                        // {if(e.id<4)
                        // continue;
                    <ListItem id={e.id} button key={e.id} onClick={() => seekToPoint(e)}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                            </svg>
                        </ListItemIcon>
                        {/* <ListItemText primary={e.name} /> */}
                        <img src={`${e.poster}`} alt="Italian Trulli" width="200px" height="700px"></img>
                    </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>

            <Drawer
                variant="temporary"
                anchor="right"
                open={isSidebarOpenRight}
                onClose={() => toggleSidebarRight(false)}
                onOpen={() => toggleSidebarRight(true)}
                // style={{backgroundColor:"grey"}}
            >
                <List>
                    {shopItNow.map((e, index) => (
                    <ListItem id={e.id} button key={e.id} onClick={() => buyItNow(e.link)}>
                        <ListItemIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                            </svg>
                        </ListItemIcon>
                        {/* <ListItemText primary={e.name} /> */}
                        <img src={`${e.poster}`} alt="Italian Trulli"></img>
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
                <Row style={{marginLeft:'1px',marginRight:'1px',padding:'0px'}}>
                    <Col md={12} >
                        <div  >
                        <Fab variant="extended" style={{backgroundColor:COLOR.BUTTON_SUCCESS_BLUE, color:COLOR.WHITE, zIndex:99, top: '1250px', left: '1200px'}} onClick={()=>{toggleSidebarBottom(!isSidebarOpenBottom)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                    <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                                </svg>
              Follow the player
                            </Fab>
                            <Fab variant="extended" style={{backgroundColor:COLOR.BUTTON_SUCCESS_BLUE, color:COLOR.WHITE, zIndex:99, top: '650px', left: '-150px'}} onClick={()=>{toggleSidebarLeft(!isSidebarOpenLeft)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                    <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                                </svg>
                              Relive the moments
                            </Fab>

                            <Fab variant="extended" style={{backgroundColor:COLOR.BUTTON_SUCCESS_BLUE, color:COLOR.WHITE, zIndex:99, top: '650px', left: '1900px'}} onClick={()=>{toggleSidebarRight(!isSidebarOpenRight)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16" style={{marginRight:8}}>
                                    <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                                </svg>
                              Shop them now
                            </Fab>
                            <video id="video_element" controls muted autoPlay width="1800px" style={      {  minHeight:'900px',minWidth:'1600px'}}>

                            {/* <video id="video_element" controls muted autoPlay width="1800px" style={      {  minHeight:'1020px',minWidth:'1080p}}> */}

                            
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