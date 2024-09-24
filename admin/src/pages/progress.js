import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@mui/material/Card';
import swal from 'sweetalert2';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import moment from 'moment';
import { Grid, Box, TextField, DialogActions, Button, TextareaAutosize, DialogTitle   } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';
import {
    useGetArchiveQuery,
    useGetProgressQuery,
    useGetTotalQuery,
    useUpdateProgressMutation,
    useGetSubPlantsQuery,
    useGetMainPlantsQuery,
    useUpdateReasonMutation,
    useUpdateStatusMutation,
    useGetMemoQuery,
    useUpdateMemoMutation,
    useCreateMemoMutation,
    useUpdateTodayMemoMutation
} from '../store/progress/api';
import { setProgressList, setTotalList, setMainPlantsList, setSubPlantsList, setMemoList } from '../store/progress/slice';
import { toast } from 'react-toastify';
import Celebrate from '../components/celebrate';
 

let prizes = ['💰 $100', '🎁 Gift Card', '🚗 Car', '🍕 Pizza', '🎉 Nothing', '📱 Phone', '💎 Diamond', '🎮 Console'];


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * such as social game app, can show other user's plants info   is very nice  each other passion improve... ok?  2025.5.6.
*/

const Progress = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    /**
    * CRUD method with RTK Query
    */
    const { data: progress, isLoading, isError, error } = useGetProgressQuery();
    const { data: archivementTarget } = useGetArchiveQuery();
    const { data: total } = useGetTotalQuery();
    const { data: mainPlants } = useGetMainPlantsQuery();
    const { data: subPlants, isLoading: isGetPlantsLoading, isSuccess: isGetPlantsSuccess } = useGetSubPlantsQuery();
    const [ updateProgress, { isLoading: isUpdateProgressLoading, isSuccess: isUpdateProgressSuccess } ] = useUpdateProgressMutation();
    const [ updateReason, { data, isSuccess} ] = useUpdateReasonMutation();
    const [ updateStatus, {isSuccess: updateStatusSuccess}] = useUpdateStatusMutation();
    const { data: memo } = useGetMemoQuery();
    const [updateMemo, { isSuccess: updateMemoSuccess}] = useUpdateMemoMutation();
    const [createMemo, { isSuccess: createMemoSuccess}] = useCreateMemoMutation();
    const [updateTodayMemo, { isSuccess: updateTodayMemoSuccess}] = useUpdateTodayMemoMutation();
    const handleUpdate = () => {
        updateProgress({

        })
    }

    /**
     *  React-Slick Part
    */
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 900,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '24px'
    };

    useEffect(()=> {
        let arr = []
        for(let i = 1; i < 31; i++) {
            arr.push(`image-gallery/${i}.jpg`)
        }
        setImgList(arr);
        prizes = arr;
    }, []);

    useEffect(()=> {
        // setProgressList(progress)
        if(total) dispatch(setTotalList(total));
        if(mainPlants) dispatch(setMainPlantsList(mainPlants));
        if(subPlants) dispatch(setSubPlantsList(subPlants));
        if(memo) dispatch(setMemoList(memo));
    }, [total, mainPlants, subPlants, memo]);


    const totalList = useSelector((state) => state.progress.totalList.data);
    const mainPlantsList = useSelector((state)=> state.progress.mainPlantsList.data);
    const subPlantsList = useSelector((state)=> state.progress.subPlantsList.data);
    const memoList = useSelector((state)=> state.progress.memoList);
    const [ open, setOpen ] = React.useState(false);
    const [ imgList, setImgList ] = React.useState([])
    const [ selectImg, setSelectImg ] = React.useState(null);
    const [ curDate, setCurDate ] = React.useState(null);
    const [ openEditModal, setOpenEditModal ] = React.useState(null);
    const [ reasonInfo, setReasonInfo ] = React.useState({
        _id: null,
        reason: null,
    });
    const [ inputReason, setInputReason ] = React.useState(null);
    const [ openGiftModal, setOpenGiftModal ] = React.useState(null);
    const [ openPlantsModal, setOpenPlantsModal ] = React.useState(null);
    const [ selectSubject, setSelectSubject ] = React.useState([]);
    const [ chosenImg, setChosenImg ] = React.useState(null);
    const [ spinning, setSpinning ] = useState(false);
    const [ rotation, setRotation ] = useState(0);
    const [ result, setResult ] = useState(null);
    const [ celebrateStatus, setCelebrateStatus ] = React.useState(false);
    const [ memoOpen, setMemoOpen ] = React.useState(false);
    const [ descriptionID, setDescriptionID]  = React.useState(null);
    const [ todayMemoContent, setTodayMemoContent] = React.useState('');

    const [ memoValue, setMemoValue ] = useState('');

    const arr = [ 1,2,3,4,5 ];
    const spin = () => {
        if (spinning) return;
        setSpinning(true);
        const prizeCount = prizes.length;
        const anglePerPrize = 360 / prizeCount;
        const chosen = Math.floor(Math.random() * prizeCount);
    
        // Add multiple full spins plus prize offset
        const extraSpin = 360 * 5;
        const stopAngle = extraSpin + (360 - chosen * anglePerPrize - anglePerPrize / 2);
        setRotation(prev => prev + stopAngle);
    
        setTimeout(() => {
          setResult(prizes[chosen]);
          setSpinning(false);
        }, 4000);
      };

    const handleClickOpen = (item) => {
        setSelectImg(item)
        setOpen(true);
    };
    const handleClickEditOpen = (id, reason) => {
        setReasonInfo({
            _id: id,
            reason: reason === undefined ? null : reason
        });
        setOpenEditModal(true);

    };

    const handleTodayMemoOpen = (id, content) => {
        setMemoOpen(true);
        setTodayMemoContent(content)
        setDescriptionID(id)
    }

    const handleClose = () => {
        setOpen(false);
        setOpenEditModal(false);
        setOpenGiftModal(false);
        setOpenPlantsModal(false);
        setMemoOpen(false);
    };
    /* ~ */

    useEffect(()=> {
        setCurDate(moment(new Date()).format('YYYY-MM-DD'));
    }, []);
    
    useEffect(()=> {
        if(memoList) setMemoValue(memoList.content);
    },[memoList])
    // const play = ()=> {
    //     const file = document.getElementById('ad')
    //     if(file.paused) {
    //         file.play();
    //     } else {
    //         file.pause()
    //     }
    // }

    const openGift =(result)=> {
        setOpenGiftModal(true);
        setChosenImg(result);
    }
    
    const openPlantModal = (id) => {
        setOpenPlantsModal(true);
        let arr = subPlantsList.filter(item=> { return item.id[0] === id[0] })
        setSelectSubject(arr);
    }

    const calcPercentA = (total, current) => { // flower
        let percent = (current / total) * 100;
        if(percent === 100) {
            return 4;
        } else if(100 > percent && 80 <= percent) {
            return 4;
        } else if(80 > percent && 60 <= percent) {
            return 3;
        } else if(60 > percent && 40 <= percent) {
            return 2;
        } else if(40 > percent && 20 <= percent) {
            return 1;
        } else if(20 > percent && 0 <= percent) {
             return 0;
        } else {
            return 0;
        }

    }

    const calcPercentB = (total, current) => { // gold
        let percent = (current / total) * 100;
        if(percent === 100) {
            return 6
        } else if(100 > percent &&  90 <= percent) {
            return 6
        } else if( 90 > percent && 75 <= percent) {
            return 5;
        } else if(75 > percent && 60 <= percent) {
            return 4;
        } else if(60 > percent && 45 <= percent) {
            return 3;
        } else if(45 > percent && 30 <= percent) {
            return 2;
        } else if( 30 > percent && 15 <= percent) {
            return 1;
        } else if(15 > percent && 0 <= percent) {
            return 0;
        } else {
            return 0;
        }
    }


    const handleSubmitMomo = async()=> {
        
        let res = await updateReason({
            id: reasonInfo._id,
            reason: inputReason
        });
        if(res.data.status) {
            toast.success('Successful~')
        } else {
            toast.error('Error~')
        }
        setMemoOpen(false);
    };

    const handleTodayMemo = async()=> {
        
        let res = await updateTodayMemo({
            id: descriptionID,
            description: todayMemoContent
        });
        if(res.data.status) {
            toast.success('Successful~')
        } else {
            toast.error('Error~')
        }
        setOpenEditModal(false);
    };

    const handleDone = async(_id)=> {
        swal.fire({
            title: 'Are you sure?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Yes!",
        }).then(async(result)=> {
            if(result.isConfirmed) {
                
                let res = await updateStatus({
                    id: _id,
                    staus: 1
                });
                if(res.data.status) {
                    // toast.success('Successful~')
                    setCelebrateStatus(true);
                    setOpenPlantsModal(true);
                } else {
                    toast.error('Error~')
                }
            }
        })
    };

    // useEffect(()=> {
    //     if(isSuccess) {
    //         console.log("Updated User", data)
    //     }
    // }, [isSuccess]);

    const handleMemo =async(method)=> {
        if(method === 'POST') {
            let res = await createMemo({
                content: memoValue,
                date: moment(new Date()).format('YYYY-MM-DD')
            });
            if(res.data.status) {
                toast.success('Successful~');
            } else {
                toast.error('Error~');
            }
        } else {
            let res1 = await updateMemo({
                id: memoList._id,
                content: memoValue
            });
            if(res1.data.status) {
                toast.success('Successful~');
            } else {
                toast.error('Error~');
            }
        }
    }

    function truncate(str, maxLength) {
        if(str) return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
    }
    
    return (
        <>
            {
                celebrateStatus ? 
                <Celebrate onButtonClick={setOpenPlantsModal} onBackBtnClick={setCelebrateStatus} onModalStatus={openPlantsModal}  />
                :
                <>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '16px'}}>
                        <h1 style={{fontSize: '2.5rem', }}>- Path to Success -</h1>
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '16px'}}>
                        <h2>🌹&nbsp; My Lovely Plants... 🌹 </h2>
                    </div>
                    <div className='App'style={{padding: 0}}>
                        <Grid
                            container
                            direction="row"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {
                                isLoading && <p>Loading...</p>
                            }
                            {
                                isLoading && <>Error: {error}</>
                            }
                            {
                                mainPlantsList && mainPlantsList.map(item=> {
                                    return (
                                        <Grid size="auto" style={{margin: '0px 32px'}}>
                                            <CardActionArea onClick={()=> openPlantModal(item.id)} style={{padding: '16px'}}>
                                                <CardContent style={{
                                                    padding: '16px 32px',
                                                    marginTop: '0px',
                                                    maxWidth: '264px',
                                                    height: '55vh',
                                                    // maxHeight: '50vh',
                                                    borderRadius: '32px',
                                                    background: 'linear-gradient(180deg, rgba(194, 247, 247, 0.05) 0%, rgba(30, 90, 90, 0.05) 100.33%)',
                                                }}>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={
                                                            item._id == 'Pro English' ||  item._id == 'To get a Job' ? 
                                                                `plants/gold/${calcPercentB(item.totalCnt, item.doneCnt)}.png` 
                                                                : 
                                                                `plants/flower/${calcPercentA(item.totalCnt, item.doneCnt)}.png`
                                                        }
                                                        style={{
                                                            position: 'relative',
                                                            border: '1px solid rgb(210 242 221)',
                                                            boxShadow: 'rgb(190, 190, 190) 1px 4px 7px inset, rgb(195, 195, 195) 0px -3px 7px inset',
                                                            borderRadius: '50%',
                                                            background: 'linear-gradient(360deg,rgb(184, 224, 227), rgb(232, 245, 241))'
                                                        }}
                                                        alt="green iguana"
                                                    />
                                                    <Box className='around' style={{
                                                        position: 'absolute',
                                                        left: '43px',
                                                        top: '27px',
                                                        width: '210px',
                                                        height: '210px',
                                                        border: '2px solid rgb(133 195 150)',
                                                        borderRadius: '50%',
                                                        borderStyle: 'dashed',
                                                    }}/> 
                                                    <Typography gutterBottom variant="h6" component="div" style={{paddingTop: '16px'}}>
                                                        {item.target}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{textAlign: 'justify', textIndent: '14px'}}>
                                                        { item.description }
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                        <h2>📉 Postponed Schedule 📉 </h2>
                    </div>
                    
                    <div className="App">
                        {
                            isLoading && <p>Loading...</p>
                        }
                        {
                            isLoading && <>Error: {error}</>
                        }
                        <div style={{width: '100%'}}>
                            <form style={{
                                display: 'inline-grid', 
                                width: '95%'
                            }}>
                                <div className='today-item'>
                                    <span className='grid-1'></span>
                                    <span className='grid-3'>Name </span>
                                    <span className='grid-3'>Description </span>
                                    <span className='grid-1'>Date</span>
                                    <span className='grid-1'>Value</span>
                                    <span className='grid-3'>Target</span>
                                    <span className='grid-2'>SubTarget</span>
                                    <span className='grid-4'>Reason</span>
                                    <span className='grid-1'>Action</span>
                                    <span className='grid-1'>Status</span>
                                </div>
                                {
                                    totalList && totalList.map(item => {
                                        return (
                                            <div className='today-item'>
                                                <label className="checkbox-inline">
                                                    {
                                                        ((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ?
                                                            <input type="checkbox" value="" /> 
                                                            :
                                                            <></>
                                                    }
                                                </label>
                                                <span className='grid-3'>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? item.today_name : ''}</span>
                                                <span className='grid-3' style={{textIndent: '20px', textAlign: 'justify', color:'gray', fontSize: '1.2rem'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? truncate(item.today_description, 50) : ''}</span>
                                                <span className='grid-1' style={{color: '#aaa9a9', fontSize: '1.2rem'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? moment(item.today_start).format('MM/DD') : ''}</span>
                                                <span className='grid-1' style={{color: 'green'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? `${item.today_target}` : ''}</span>
                                                <span className='grid-3' style={{color: 'rgb(0, 122, 255)', textAlign: 'center', fontSize: '1.2rem'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? item.subject_name : ''}</span>
                                                <span className='grid-2' style={{color: 'red', fontSize: '1.2rem'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? item.target : ''}</span>
                                                <span className='grid-4' style={{textIndent: '20px', textAlign: 'justify', color: 'rgb(106, 101, 88)', fontSize: '1.2rem'}}>{((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? item.today_reason : ''}</span>
                                                <span className='grid-1'>
                                                    {((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? 
                                                        <>
                                                            <button type="button" onClick={(e)=>handleDone(item.today_id)} style={{margin: '2.5px'}}>Done</button>
                                                            <button type="button" onClick={(e)=>handleTodayMemoOpen(item.today_id, item.today_description)} style={{margin: '2.5px'}}>Memo</button>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                </span>
                                                <span className='grid-1'>
                                                    {((item.today_start) !== curDate && item.today_status == 0) || (item.today_reason && item.today_status == 0) ? 
                                                        <img src={'coin0.png'} style={{filter: 'drop-shadow(black 0px 1px 2px )'}} width={45} height={45} />
                                                        :
                                                        <></>
                                                    }
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>
                    </div>
                    <div className='App' style={{display: 'flex', justifyContent: 'center'}}>
                        <h3 style={{border: '1px solid green', padding: '8px', borderRadius: '9px', background: '#ddfcfa'}}>⚡ Have you eaten so far? Have you slept? Have you taken a bath? But... Why haven't you done any work? ⚡</h3>
                    </div>
                    
                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                        <h2>📈&nbsp;&nbsp;Today's &nbsp; Schedule&nbsp;&nbsp;📈 </h2>
                    </div>
                    <div className="App">
                        <div style={{width: '100%'}}>
                            <form style={{
                                display: 'inline-grid',
                                width: '95%'
                            }}>
                                <div className='today-item'>
                                    <span className='grid-1'></span>
                                    <span className='grid-2'>Name </span>
                                    <span className='grid-2'>Description</span>
                                    <span className='grid-1'>Date</span>
                                    <span className='grid-1'>Value</span>
                                    <span className='grid-2'>Target</span>
                                    <span className='grid-2'>SubTarget</span>
                                    <span className='grid-2'>Action</span>
                                    <span className='grid-1'>Status</span>
                                </div>
                                {
                                    totalList && totalList.map(item=> {
                                        return (
                                            <div className='today-item'>
                                                <label className="checkbox-inline">
                                                    {
                                                        (item.today_start) == curDate && (item.today_reason) == null ? 
                                                            <input type="checkbox" value="" checked={(item.today_status) == 1 ?  true : false} /> 
                                                            : 
                                                            <></>
                                                    }
                                                </label>
                                            
                                                <span className='grid-3'>{(item.today_start) == curDate && (item.today_reason) == null ? item.today_name : ''}</span>
                                                <span className='grid-3' style={{textIndent: '20px', textAlign: 'justify', color: '#6f6b5a', fontSize: '1.2rem'}}>{(item.today_start) == curDate && (item.today_reason) == null ? truncate(item.today_description, 50) : ''}</span>
                                                <span className='grid-1' style={{color: '#aaa9a9', fontSize: '1.2rem'}}>{(item.today_start) == curDate && (item.today_reason) == null ? moment(item.today_start).format('MM/DD') : ''}</span>
                                                <span className='grid-1' style={{color: 'green'}}>{(item.today_start) == curDate && (item.today_reason) == null ? item.today_target : ''}</span>
                                                <span className='grid-2' style={{color: 'rgb(0, 122, 255)', textAlign: 'center', fontSize: '1.2rem'}}>{(item.today_start) == curDate && (item.today_reason) == null ? item.subject_name : ''}</span>
                                                <span className='grid-2' style={{color: 'red', fontSize: '1.2rem'}}>{(item.today_start) == curDate && (item.today_reason) == null ? item.target : ''}</span>
                                                <span className='grid-2'>
                                                    {
                                                        (item.today_start) == curDate && item.today_status == 0 && (item.today_reason) == null ? 
                                                        <>
                                                            <button type="button" onClick={(e)=>handleDone(item.today_id)} style={{margin: '2.5px'}}>Done</button>
                                                            <button type="button" onClick={(e)=>handleClickEditOpen(item.today_id, item.reason)} style={{margin: '2.5px'}}>Put off</button>
                                                            <button type="button" onClick={(e)=>handleTodayMemoOpen(item.today_id, item.today_description)} style={{margin: '2.5px'}}>Memo</button>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                </span>
                                                <span className='grid-1'>
                                                    {
                                                        (item.today_start) == curDate && item.today_status == 0 && (item.today_reason) == null ? 
                                                        <img src={'coin1.png'} style={{filter: 'drop-shadow(black 0px 1px 1px )'}} width={45} height={45} />
                                                            :
                                                            <></>
                                                    }
                                                    {
                                                        (item.today_start) == curDate && item.today_status == 1 && (item.today_reason) == null ? 
                                                        <img src={'coin2.png'} style={{filter: 'drop-shadow(black 0px 1px 1px )'}} width={45} height={45} />
                                                        :
                                                        <></>
                                                    }
                                                </span>
                                            </div>

                                        )
                                    })
                                }
                            </form>
                        </div>
                    </div>
                    <div className='App' style={{display: 'flex', justifyContent: 'center'}}>
                        <h3 style={{border: '1px solid green', padding: '8px', borderRadius: '9px', background: '#ddfcfa'}}>💎 Mother devote everything for her children, but always smiles. &nbsp; I love my mom.
                        Work hard for my mom. &nbsp; I will must...  &nbsp;Trust me! 💎</h3>
                    </div>
                    <div className="App" style={{paddingTop: '55px'}}> 
                        <Slider {...settings}>
                            {
                                imgList.map((item)=> {
                                    return (
                                        <div>
                                            <img onClick={()=> handleClickOpen(item)} style={{cursor: 'pointer', border: '1px solid black', borderRadius: '5px', height: '111px', width: '197px'}} src={item} />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className='App' style={{paddingTop: '55px'}}>
                        <Grid container
                            direction="row"
                            sx={{
                                justifyContent: "center",
                                alignItems: "center",
                            }} spacing={12}
                        >
                            {
                                arr.map(item => {
                                    item = `/mp4/${item}.mp4`;
                                    return(
                                        <Grid size="auto">
                                            <Grid 
                                                container
                                                direction="row"
                                                sx={{
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Grid>
                                                    <video id='ad' width={200} loop controls>
                                                        <source src={item} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </div>
                    <div className="App">
                        <Grid container spacing={2}>
                            <Grid size={7} >
                                <Grid container
                                    direction="row"
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                }} style={{height: '700px'}}>
                                        
                                    {/* Memo Wrapper */}
                                    <div className="App" style={{marginTop: '8%'}}>
                                        <h2> 📋&nbsp; Diary &nbsp;📋</h2>
                                            <TextareaAutosize
                                                aria-label="maximum height"
                                                minRows={15}
                                                maxRows={20}
                                                placeholder="Memo...  Today?"
                                                style={{ 
                                                    width: '75%', 
                                                    // minWidth:320,
                                                    background: 'wheat',
                                                    paddingTop: '32px',
                                                    borderRadius: '9px',
                                                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                                                    fontFamily: 'title5',
                                                    fontSize: '1.5rem',
                                                    textIndent: '45px',
                                                    paddingLeft: '32px',
                                                    paddingRight: '32px',
                                                    textAlign: 'justify',
                                                    resize: 'vertical',
                                                    position: 'relative'
                                                }}
                                                value={memoValue}
                                                onChange={(e) => setMemoValue(e.target.value)}
                                            />
                                        <spin style={{
                                            position: 'absolute',
                                            bottom: '10%',
                                            right: '25%',
                                            fontSize: '1.7rem',
                                            filter: 'drop-shadow(0 0 1px black)',
                                            cursor: 'pointer'
                                        }} onClick={(e)=> handleMemo('POST')}>
                                            ✔
                                        </spin>
                                        <spin style={{
                                            position: 'absolute',
                                            bottom: '10%',
                                            right: '20%',
                                            fontSize: '1.7rem',
                                            filter: 'drop-shadow(0 0 1px black)',
                                            cursor: 'pointer'
                                        }} onClick={(e)=> handleMemo('PUT')}>
                                            🖋
                                        </spin>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid size={5}>
                                <Grid container
                                    direction="row"
                                    sx={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                }} style={{height: '700px'}}>
                                    <div style={{paddingTop: '32px', marginTop: '8%'}}>
                                        <h2> 🎁&nbsp; Spin &nbsp;🎁</h2>
                                        <div className="spinner-container">
                                            {/* <div className="pointer">▲</div> */}
                                            <div
                                                className="wheel"
                                                style={{
                                                transform: `rotate(${rotation}deg)`,
                                                transition: 'transform 4s ease-out'
                                                }}
                                            >
                                                {
                                                // prizes.map((prize, index) => {
                                                //     const rotate = (360 / prizes.length) * index;
                                                //     return (
                                                //         <div
                                                //         key={index}
                                                //         className="segment"
                                                //         style={{
                                                //             transform: `rotate(${rotate}deg)`,
                                                //         }}
                                                //         >
                                                //         <span>{prize}</span>
                                                //         </div>
                                                //     );
                                                // })
                                                }
                                            </div>
                                            <button onClick={spin} disabled={spinning}>
                                                {spinning ? 'Spinning...' : 'Spin'}
                                            </button>
                                            {result && !spinning && <div className="result" onClick={(e)=> openGift(result)}>🎉 You got: {result}</div>}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    
                    {/* View Detail Image */}
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent style={{background: 'rgb(7, 7, 7)', padding: '5px'}}>
                            <DialogContentText id="alert-dialog-description">
                                <img src={selectImg} width={532} height={300} />
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    {/* View Detail Image */}
                    <Dialog
                        open={openEditModal}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent style={{padding: '5px', width: '500px', maxWidth: '500px'}}>
                            <DialogContentText id="alert-dialog-description">
                                <TextField
                                    label="Multiline"
                                    multiline
                                    rows={5}
                                    placeholder='Input Reason...'
                                    defaultValue=""
                                    variant="filled"
                                    fullWidth={true}
                                    value={reasonInfo.reason}
                                    onChange={e=> setInputReason(e.target.value)}
                                />
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={()=>handleSubmitMomo()}>Save</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    <Dialog
                        open={openGiftModal}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent style={{background: 'rgb(22, 22, 22)', padding: '5px'}}>
                            <DialogContentText id="alert-dialog-description">
                                <img src={chosenImg} width={532} height={300} />
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                    {/* View Detail Plants */}
                    <Dialog
                        fullScreen
                        open={openPlantsModal}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        style={{
                            zIndex: 9998
                        }}
                    >
                        <AppBar sx={{ position: 'relative' }} style={{background: '#05015e'}}>
                        <Toolbar>
                            <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                            >
                            </IconButton>
                            <Button autoFocus color="inherit" onClick={handleClose}>
                                Close
                            </Button>
                        </Toolbar>
                        </AppBar>
                        <List>
                            <Grid 
                                container
                                direction="row"
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                spacing={8}
                                style={{marginTop: '32px'}}
                            >
                                {
                                    selectSubject && selectSubject.map(item=> {
                                        return (
                                            <Grid size="auto" style={{width: '170px', textAlign: 'center', height: '250px'}}>
                                                <CardMedia
                                                    component="img"
                                                    image={
                                                        item.archive_target[0] == 'Pro English' || item._id == 'To get a Job' ? 
                                                            `plants/gold/${calcPercentB(item.totalTarget, item.doneTodayTarget)}.png` 
                                                            : 
                                                            `plants/flower/${calcPercentA(item.totalTarget, item.doneTodayTarget)}.png`
                                                    }
                                                    style={{
                                                        position: 'relative',
                                                        border: '1px solid rgb(210 242 221)',
                                                        boxShadow: 'rgb(190, 190, 190) 1px 4px 7px inset, rgb(195, 195, 195) 0px -3px 7px inset',
                                                        borderRadius: '50%',
                                                        background: 'linear-gradient(360deg,rgb(184, 224, 227), rgb(232, 245, 241))',
                                                        filter: ((item.doneTodayTarget / item.totalTarget) * 100 <= 15 ? 'grayscale(0.7)': 'grayscale(0)'),
                                                        width: '170px',
                                                        height: '170px',
                                                    }}
                                                    alt="green iguana"
                                                />
                                                <Typography gutterBottom variant="h6" component="div" style={{paddingTop: '16px', textAlign:'center', fontSize: '1rem'}}>
                                                    {item.step} - {item._id}
                                                </Typography>
                                            </Grid>
                                        )
                                    })
                                }
                                
                            </Grid>
                        </List>
                    </Dialog>
                    <Dialog
                        open={memoOpen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent style={{padding: '5px', width: '500px', maxWidth: '500px'}}>
                            <DialogTitle>Memo...</DialogTitle>
                            <DialogContentText id="alert-dialog-description">
                                <TextField
                                    label=""
                                    multiline
                                    rows={25}
                                    placeholder='Input Memo...'
                                    defaultValue=""
                                    variant="filled"
                                    fullWidth={true}
                                    value={todayMemoContent}
                                    onChange={e=> setTodayMemoContent(e.target.value)}
                                />
                            </DialogContentText>
                            <DialogActions>
                                <Button onClick={()=>handleTodayMemo()}>Save</Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </>
            }
        </>

    )
}

export default Progress;