import React from 'react';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const LoadingScreen = React.memo(()=> {

    const isLoading = useSelector((state)=> state.global.isGLobalLoading);

    if(!isLoading) return null;
    
    return  <ClipLoader color="#36d7b7" />
    
});

export default LoadingScreen;