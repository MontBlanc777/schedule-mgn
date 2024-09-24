import React, { useEffect } from "react";
import {Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, Button, Grid, Box, TextareaAutosize} from '@mui/material'; 
import moment from "moment";
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AxiosRequest } from '../utils/request';



const Review = () => {
    const [ modalOpen, setModalOpen ] = React.useState(false);
    const [ selectDate, setSelectDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
    const [ list, setList ] = React.useState(null);
    const [ selectInfo, setSelectInfo] = React.useState(null);

    const handleClose = () => {
        setModalOpen(false);
    }

    const handleOpen = (data)=> {
        setModalOpen(true);
        setSelectInfo(data)
    }

    const clickPicker = ()=> {
        const dateInput = document.getElementById('pickDate');
        dateInput.showPicker();
    }

    const setField =(e)=> {
        setSelectDate(moment(e.target.value).format('YYYY-MM-DD'))
    }

    useEffect(()=> {
         async function getList() {
            const param = {
                date: selectDate,
            };
            const res = await AxiosRequest('/todayReview', 'GET', null, param, null);
            if(res && res.status) {
                setList(res.data);
            }
        };
        getList();
    }, [selectDate])

    function truncate(str, maxLength) {
        if(str) return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
    }
    
    return (
        <>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                <h3>📑 &nbsp;Review&nbsp; 📑 </h3>
            </div>
            {/* insert wrapper */}
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '24px', paddingTop: '32px'}}>
                <Grid 
                    container
                    direction="row"
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    spacing={5}
                >
                    {
                        list && list.map(item=> {
                            return (
                                <Grid size="auto" style={{ width: '250px' }}>
                                    <Box onClick={()=> handleOpen(item.description)} style={{border: '1px solid rgb(152, 150, 145)', borderRadius: '5px', textAlign: 'center', height: '250px', background: 'wheat', cursor: 'pointer'}}>
                                        <p style={{color: 'blue', marginBottom: 0}}>
                                            - { item.archive.target } -
                                        </p>
                                        <p style={{color: 'red', marginBottom: 0}}>
                                            = { item.subject.target_name } =
                                        </p>
                                        <p style={{width: '100%',padding: '0px 8px',textAlign: 'center',fontWeight:'bold', marginBottom: 0}}>
                                            { item.name }
                                        </p>
                                        <p style={{padding: '0px 8px', textAlign: 'justify', textIndent: '14px', color: 'rgba(0,0,0,0.7)'}}>
                                            { truncate(item.description, 59) }
                                        </p>
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
            <div className='selectCalender' >
                <span onClick={()=> clickPicker()} style={{fontSize: '2.5rem', cursor:'pointer', filter: 'drop-shadow(1px 2px 5px black)'}}>📆</span>
                <input id="pickDate" type="date"  onChange={(e)=> setField(e)}/>
            </div>

            <Dialog
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{padding: '5px', width: '500px', maxWidth: '500px'}}>
                    <DialogTitle>Review Memo...</DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        <TextField
                            label=""
                            multiline
                            rows={25}
                            placeholder=' Memo...'
                            defaultValue=""
                            variant="filled"
                            fullWidth={true}
                            value={selectInfo}
                            disabled={true}
                        />
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={()=>handleClose()}>Close</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Review;