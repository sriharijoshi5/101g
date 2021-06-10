import React, { Component,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { COLOR } from "../Constants/Color";
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import { Paper } from "@material-ui/core";



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
        <div >
            <Paper elevation={3} variant="outlined" className="top_bar text-white mt-4 mb-3 ml-4 mr-4  p-3">
				<Row>
					<Col md={5} className="summary_heading">
                        Live Videos
					</Col>
				</Row>
				
            </Paper>
            <Paper elevation={3} variant="outlined" className="bg-dark-local text-white mt-2 ml-4 mr-4" style={{backgroundColor: COLOR.COMPONENT_BACKGROUND_BLUE}}>
                <Row style={{marginLeft:'1px',marginRight:'1px',padding:'50px'}}>
                        {videos.map(video =>
                        <Col md={4} key={video.id}>
                            <Card style={{backgroundColor:COLOR.SELECTED_ROW}}>
                                <CardImg top width="100%" src={`http://localhost:4000${video.poster}`} alt={video.name} />
                                <CardBody>
                                    <CardTitle tag="h5">{video.name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted"><i className="spinner-grow spinner-grow-sm text-danger" /> Live</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Link to={`/player/${video.id}`} props={videos}>
                                        <Button>View</Button>
                                    </Link>
                                </CardBody>
                             </Card>
                        </Col>
                    )}            
                </Row>
            </Paper>
            
        </div>
    )
}

export default Home