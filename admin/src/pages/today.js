import React, {useState, useEffect} from 'react';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AxiosRequest } from '../utils/request';
import Pagination from '../components/pagination';

function Today () {
    
    const [ name, setName ] = useState(null);
    const [ subject, setSubject ] = useState(null);
    const [ target, setTarget ] = useState(null);
    const [ startTime, setStartTime ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ list, setList ] = useState([]);
    const [ subjectList, setSubjectList ] = useState([]);
    const [ modifyStatus, setModifyStatus ] = useState(false);
    const [ error, setError ] = useState(true);
    const [ id, setId ] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    // totalPages = Math.ceil(totalItems / pageSize);

    useEffect(()=> {
        if(currentPage == 0) setCurrentPage(1);
        async function getList() {
            const param = {
                pn: currentPage,
                pc: pageSize
            };
            const res = await AxiosRequest('/todayTask', 'GET', null, param, null);
            if(res && res.status) {
                const result = res.data;
                const totalItems = result[0].metadata.totalItems || 0;
                const items = [];
                for( let i = 0; i < result.length; i++) {
                    const item = result[i];
                    items.push(item.data)
                }

                setTotalPages(Math.ceil(totalItems / pageSize))
                setList(items);
            }
        }
        async function getSubjectList() {
            const param = {};
            const res = await AxiosRequest('/normalSubject', 'GET', null, param, null);
            if(res && res.status) {
                setError(true)
                setSubjectList(res.data)
            }
        }
        getList();
        getSubjectList();
    }, [error, currentPage]);


    const setField =(e, field)=> {
        field(e.target.value);
    }

    const insertValue = async()=> {
        let reqData = {
            name,
            subject,
            target,
            description,
            startTime: moment(startTime).format('YYYY-MM-DD')
        }
        
        if(name && target) {
            swal.fire({
                title: 'Are you sure?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: "Yes!",
            }).then(async(result)=> {
                if(result.isConfirmed) {
                    let method = 'POST';
                    if(modifyStatus) {
                        method = 'PUT';
                        reqData._id = id;
                    }
                    const res = await AxiosRequest('/todayTask', method, null, null, reqData);
                    setCurrentPage(1);
                    if(res.status) {
                        toast.success('Successful');
                        if(modifyStatus) {
                            setError(false)
                            setModifyStatus(false);
                        }
                    } else {
                        setModifyStatus(false);
                        setName(null);
                        setTarget(null);
                        setDescription(null);
                        setError(false);
                        toast.error('Error');
                    } 
                }
            })      
        } else {
            toast.warning('You must fill in the input field');
            return;
        }
    }

    const modifyData =async(param)=> {
        setName(param.name);
        setTarget(param.target);
        setDescription(param.description);
        setModifyStatus(true);
        setId(param._id)
    }

    const deleteData =async(_id)=> {
        swal.fire({
            title: 'Are you sure?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Yes!",
        }).then(async(result)=> {
            if(result.isConfirmed) {
                const res = await AxiosRequest('/todayTask', 'DELETE', null, null, {_id});
                if(res.status) {
                    setError(false)
                    toast.success('Successful');
                } else {
                    setError(false)
                    toast.warning('Error');
                }
            }
        });
    }

    const clickPicker = ()=> {
        const dateInput = document.getElementById('picker');
        dateInput.showPicker();
    }

    return (
        <>
            
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                <h3>🧠 Today Target 🧠 </h3>
            </div>
            {/* insert wrapper */}            
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '24px'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Name: </label>      
                        </div>
                        <div className='col-75'>
                            <input type="text" onChange={(e)=>setField(e, setName)} value={name} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Subject: </label>      
                        </div>
                        <div className='col-75'>
                            <select id="country" name="country" onChange={(e)=> setField(e, setSubject)}>
                                <option value="">Select a Subject...</option>
                                {
                                    subjectList && subjectList.map(item => {
                                        return(
                                            <option value={item._id}>{item.target_name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Target: </label>      
                        </div>
                        <div className='col-75'>
                            <input
                                style={{width: '100%', height: '5vh', border: '1px solid #cccccc', borderRadius: '3px'}} 
                                type="number" onChange={(e)=> setField(e, setTarget)} value={target}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Start Time: </label>      
                        </div>
                        <div className='col-75'>
                            <input 
                                id="picker"
                                style={{width: '100%', height: '5vh', border: '1px solid #cccccc', borderRadius: '3px'}} 
                                type="date" onClick={()=>clickPicker()} onChange={(e)=> setField(e, setStartTime)} value={startTime}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Description: </label>      
                        </div>
                        <div className='col-75'>
                            <textarea id="subject" value={description} onChange={(e)=> setField(e, setDescription)} name="subject" placeholder="Write something.." style={{height:'200px'}}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <button type='button' style={{width: '100px'}} onClick={()=>insertValue()}>
                            Insert
                        </button>

                    </div>
                </div>
            </div>
            {/* inserted list wrapper */}            
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Subject</th>
                            <th>Name</th>
                            <th>Target</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>CreateTime</th>
                            <th>UpdateTime</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            list.length && list.map((item, idx)=> {
                                return (
                                    <tr>
                                        <td className='row-1'>{idx + 1}</td>
                                        <td className='row-1' style={{color: '#007aff'}}>{item.subject_info.target_name}</td>
                                        <td className='row-2'>{item.name}</td>
                                        <td className='row-1'>{item.target}</td>
                                        <td className='row-4'>{item.description}</td>
                                        <td className='row-1' style={item.status == 0 ? {color: 'red'} : { color: '#5856d6'} }>{item.status == 0 ? 'Pending' : 'Done'}</td>
                                        <td className='row-1'>{moment(item.createAt).format('YYYY/MM/DD hh:mm:ss')}</td>
                                        <td className='row-1'>{moment(item.createAt).format('YYYY/MM/DD hh:mm:ss')}</td>
                                        <td className='row-1'>
                                            <button 
                                                type="button" 
                                                style={{width: '70px'}} 
                                                onClick={()=> modifyData(item)}
                                            >
                                                    update
                                            </button>
                                            <button 
                                                type="button" 
                                                style={{width: '70px'}}
                                                onClick={()=> deleteData(item._id)}
                                            >
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div style={{ display:'flex', justifyContent:'center', paddingBottom: '10%'}}>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    )
};

export default Today;


// I need step-by-step png images 
// depicting the process of growing 
// from a young sprout to a lush tree. 
// The number of images is about 20. 
// The size of the images is 500 * 500 dpi. Please make them.