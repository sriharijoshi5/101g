const express = require('express');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const thumbsupply = require('thumbsupply');

const videos = [
    {
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
    }
];


const reliveEvents = [{
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
}



];

const shopItNow = [{
    
        id: 8,
        poster: `https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/768399/01/fnd/IND/fmt/png/Royal-Challengers-Bangalore-Men's-Replica-Slim-fit-Jersey`,
    
            duration: 144,
            name: 'RCB Shirt',
            link:`https://in.puma.com/in/en/pd/royal-challengers-bangalore-mens-replica-slim-fit-jersey/4064535053425.html?utm_medium=PLA&utm_source=GGL-SSH&utm_aud=OTH&utm_obj=OLC&utm_campaign=PLA_GGL_SSH_OTH_Smart_Shopping_Auto_Discounted&gclid=Cj0KCQjw8IaGBhCHARIsAGIRRYqDJXRVtJwOBwj2BAnuxuQLENAnF7d9l0gyn1y0H250A6Z8cWAN3fQaAk1tEALw_wcB#`
    },
    {
            poster: 'https://www.panerai.com/content/dam/rcq/pan/21/28/39/9/2128399.png.transform.global_square_image_500_2x.png',
        id: 9,
            duration: 206,
            name: 'MSD Watch',
            link:`https://www.panerai.com/en/collections/watch-collection/luminor/pam01122-luminor-marina-44mm---guillaume-nery-edition.html`
    },
    {
            poster: 'https://rukminim1.flixcart.com/image/832/832/jbqtqq80/guard/k/f/r/ambidextrous-lglw-large-2-na-leg-guard-moonwalkr-original-imaeyzpweyhc8grb.jpeg?q=70',
            id: 10,
            duration: 210,
            name: 'AB de Velliers Batting Pad ',
            link: `https://www.flipkart.com/moonwalkr-lgmw-men-s-39-43-cm-batting-pad/p/itmf3wh2mfy9ngd6`
    
}]


const app = express();


app.use(cors());
app.get('/videos', (req, res) => res.json(videos));
app.get('/reliveEvents', (req, res) => res.json(reliveEvents));



app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id]);
});

app.get('/video/:id', (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.get('/video/:id/poster', (req, res) => {
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
    .then(thumb => res.sendFile(thumb));
});

// add to end of file

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});


