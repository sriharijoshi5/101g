import React from 'react';
import { Row,Col } from "reactstrap";
import { Paper } from '@material-ui/core';
import { COLOR } from "../Constants/Color";

const About = (props) => {
    return(
        <div style={{minHeight:'90vh'}}>
            <Paper elevation={3} variant="outlined" className="top_bar text-white mt-4 mb-3 ml-4 mr-4  p-3">
				<Row>
					<Col md={5} className="summary_heading">
                        About
					</Col>
				</Row>
				
            </Paper>
            <Paper elevation={3} variant="outlined" className="bg-dark-local text-white mt-2 ml-4 mr-4" style={{border: `solid 2px ${COLOR.SELECTED_ROW}`, backgroundColor: COLOR.SELECTED_ROW}}>
                <Row style={{marginLeft:'1px',marginRight:'1px',padding:'50px'}}>
                    <Col md={3} >
                        <Paper elevation={20} className="top_bar text-white" style={{height:'100px', textAlign:'center'}}>
                        <div>
                            <span>
                                <b>Version</b>
                                <hr></hr>
                                1.0.0 Under Development
                            </span>
                        </div>
                        </Paper>    
                    </Col>
                    <Col md={3} className="offset-1">
                        <Paper elevation={20} className="top_bar text-white" style={{height:'100px', textAlign:'center'}}>
                        <div>
                            <span>
                                <b>Project Name</b>
                                <hr></hr>
                                101G
                            </span>
                        </div>
                        </Paper>    
                    </Col>
                    <Col md={3} className="offset-1">
                        <Paper elevation={20} className="top_bar text-white" style={{height:'100px', textAlign:'center'}}>
                        <div>
                            <span>
                                <b>Team Name</b>
                                <hr/>
                                101G
                            </span>
                        </div>
                        </Paper>    
                    </Col>
                </Row>
            </Paper>
        </div>
    )
}

export default About;