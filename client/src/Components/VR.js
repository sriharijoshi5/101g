import React from 'react';
import { Row,Col } from "reactstrap";
import { Paper } from '@material-ui/core';
import { COLOR } from "../Constants/Color";

const VR = (props) => {
    return(
        <div style={{minHeight:'90vh'}}>
            <Paper elevation={3} variant="outlined" className="top_bar text-white mt-4 mb-3 ml-4 mr-4  p-3">
				<Row>
					<Col md={5} className="summary_heading">
                        VR
					</Col>
				</Row>
				
            </Paper>
            <div>
            <iframe width="1360" height="500" src="https://www.youtube.com/embed/0x16ngo8xfY?autoplay=1&loop=1&playlist=0x16ngo8xfY" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default VR;