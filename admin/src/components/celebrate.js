import React, {useState, useEffect} from 'react';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import { Grid, Box, TextField, DialogActions, Button, TextareaAutosize   } from '@mui/material';
import Slide from '@mui/material/Slide';

// import Fireworks from 'react-fireworks';    // search usage?
// import { Canvas } from '@react-three/fiber';  // search usage?
// import { Fireworks } from '@react-three/drei';   // search usage?


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Celebrate ({onButtonClick, onBackBtnClick, onModalStatus }) {
    
    const [ play, setPlay ] = useState(false);


    // const firework =(x, y)=> {
    //     confetti({
    //       particleCount: 150,
    //       angle: 90,
    //       spread: 70,
    //       origin: { x: x/window.innerWidth, y: y/window.innerHeight },
    //       colors: ['#ff0000', '#ffff00', '#00ff00'],
    //       shapes: ['circle', 'star']
    //     })
    // }

    useEffect(()=> {
        setPlay(true);
        function call() {

        }
    }, [play])

    const goBack =()=> {
        onButtonClick(false);
        onBackBtnClick(false);
        // window.history.back();
    }

    const handleClose = () => {
        onButtonClick(false)
    };
    useEffect(()=> {
        onButtonClick(true);
    }, [onButtonClick])

    return (
        <>
            <Dialog
                fullScreen
                open={onModalStatus}
                onClose={handleClose}
                TransitionComponent={Transition}
                style={{
                    zIndex: 9999
                }}
            >
                <List>
                    <Grid 
                        container
                        direction="row"
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        spacing={8}
                    >
                        <div style={{display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'column', paddingTop: '32px', zIndex: 9999}}>
                            <h1 style={{fontSize: '3rem', margin: 'unset'}}>🎉🎉🎉</h1>
                            <h1 style={{fontSize: '3rem', margin: 'unset'}}>Yay, you completed </h1>
                            {/* <h1 style={{fontSize: '3rem', margin: 'unset'}}>. Congratulations. </h1> */}
                            <h1 style={{fontSize: '3rem', margin: 'unset', color: '#15803d'}}>Congratulations </h1>
                        </div>
                            {/* <div onClick={(e) => firework(e.clientX, e.clientY)}>
                                Click anywhere!
                            </div> */}
                            <Confetti
                                width={window.innerWidth - 50}
                                height={window.innerHeight}
                                recycle={false}
                                numberOfPieces={1000}
                            />
                        <div style={{display:'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <img src='minions.gif' style={{borderRadius: '25px'}} />
                            <button type='button' onClick={()=> goBack()} style={{cursor:'pointer',width: '200px', borderRadius: '5px', padding: '16px', fontSize: '1.2rem', borderColor: '#eeeeee', border: 'unset', marginTop: '55px'}}>🎉 Celebrate 🎉</button>
                        </div>
                    </Grid>
                </List>
            </Dialog>
            
        </>
    )
};

export default Celebrate;
