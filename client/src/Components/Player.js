import React, { Component,useState,useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { Paper } from '@material-ui/core';
import { COLOR } from "../Constants/Color";

const Player = (props) => 
{
    const [state,setState] = useState({
        videoId : props.match.params.id,
        videoData : {},
        seekDuration : 0
    })

    const {videoId,videoData,seekDuration} = state

   useEffect(() => 
    {
        try 
        {
            fetch(`http://localhost:4000/video/${videoId}/data`)
            .then(res => {
                res.json()
                .then(data => setState({ ...state,videoData: data }))
                .catch(e => console.log(e))
            })
            .catch(err =>console.log(err))
        }
        catch (error)
        {
            console.log(error);
        }
    },[])

    return (    
        <div >
            <Paper elevation={3} variant="outlined" className="top_bar text-white mt-4 mb-3 ml-4 mr-4  p-3">
				<Row>
					<Col md={5} className="summary_heading">
                        { videoData.name }
					</Col>
				</Row>
				
            </Paper>
            <Paper elevation={3} variant="outlined" className="bg-dark-local text-white mt-2 ml-4 mr-4" style={{border: `solid 2px ${COLOR.SELECTED_ROW}`, backgroundColor: COLOR.SELECTED_ROW}}>
                <Row style={{marginLeft:'1px',marginRight:'1px',padding:'50px'}}>
                    <Col md={5} >
                        <div style={{width:'89vh', border:'2px solid',borderRadius: '8px'}}>
                            <video controls muted autoPlay>
                                <source src={`http://localhost:4000/video/${videoId}`} type="video/mp4"></source>
                            </video>
                        </div>
                    </Col>
                </Row>
            </Paper>
        </div>
    )
}

export default Player