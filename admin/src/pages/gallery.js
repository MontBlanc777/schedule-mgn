// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import { EffectCoverflow, Autoplay } from 'swiper/modules';

// const Gallery = () => {

//     return(
//         <>
//             <div style={{width: '100%'}}>
//              <Swiper
//                 effect="flip"  // coverflow, cube, fade, flip
//                 grabCursor
//                 centeredSlides
//                 slidesPerView="auto"
//                 coverflowEffect={{
//                 rotate: 100,
//                 stretch: 0,
//                 depth: 10,
//                 modifier: 1,
//                 slideShadows: true,
//                 }}
//                 loop={true}
//                 autoplay={{ delay: 3000 }}
//                 modules={[EffectCoverflow, Autoplay]}
//                 className="mySwiper"
//             >
//                 {['1.jpg', '2.jpg', '3.jpg'].map((img, i) => (
//                 <SwiperSlide key={i} style={{ width: '300px' }}>
//                     <img src={`${img}`} alt="" className="rounded-2xl shadow-lg" />
//                 </SwiperSlide>
//                 ))}
//             </Swiper>
//             </div>
//         </>
//     )
// }

// export default Gallery;

import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Gallery () {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 900,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '24px'
    };

    React.useEffect(()=> {
        let arr = []
        for(let i = 1; i < 28; i++) {
            arr.push(`image-gallery/${i}.jpg`)
        }
        console.log(arr)
        setImgList(arr)
    }, [])

    const [open, setOpen] = React.useState(false);
    const [ imgList, setImgList ] = React.useState([])
    const [selectImg, setSelectImg] = React.useState(null);

    const handleClickOpen = (item) => {
        setSelectImg(item)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
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
        </>
    );
}