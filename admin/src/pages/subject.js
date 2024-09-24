import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AxiosRequest } from '../utils/request';
import Pagination from '../components/pagination';

function Subject () {

    const [ name, setName ] = useState(null);
    const [ step, setStep ] = useState(null);
    const [ value, setValue ] = useState(null);
    const [ target, setTarget ] = useState(null);
    const [ list, setList ] = useState([]);
    const [ archiveTarget, setArchiveTarget ] = useState([]);
    const [ error, setError ] = useState(true);
    const [ modifyStatus, setModifyStatus ] = useState(false);
    const [ id, setId ] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    useEffect(()=> {
        const param = {
            pn: currentPage,
            pc: pageSize
        };
        async function getList() {
            const res = await AxiosRequest('/subject', 'GET', null, param, null);
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
                setError(true);
            }
        };
        async function getSubjectList() {
            const res = await AxiosRequest('/archivementTarget', 'GET', null, {}, null);
            if(res && res.status) {
                setArchiveTarget(res.data);
            }
        }
        getList();
        getSubjectList();
    }, [error,currentPage ]);

    const setField = (e, field)=> {
        field(e.target.value);
    }

    const insertValue = async()=> {
        let reqData = {
            name,
            step,
            value,
            target
        };
        if(name && step && value) {
            swal.fire({
                title: 'Are you sure?',
                icon: 'info',
                showCancelButton: true,
            }).then(async(result)=> {
                if(result.isConfirmed) {
                    let method = 'POST';
                    if(modifyStatus) {
                        method = 'PUT';
                        reqData._id = id;
                    }
                    const res = await AxiosRequest('/subject',  method, null, null, reqData);
                    if(res.status){
                        setModifyStatus(false);
                        setError(false);
                        toast.success('Successful');
                    } else {
                        console.log('herer');
                        setName(null);
                        setStep(null);
                        setValue(null);
                        setModifyStatus(false);
                        setError(true);
                        toast.error('Error');
                    }
                }
            });
        } else {
            toast.warning('You must fill in the input field');
            return;
        }
    }

    const modifyData = async(param)=> {
        setName(param.target_name);
        setStep(param.target_step);
        setValue(param.target_value);
        setModifyStatus(true);
        setId(param._id);
    };

    const deleteData = async(_id)=> {
        swal.fire({
            title: 'Are you sure?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: "Yes!",
        }).then(async(result)=> {
            if(result.isConfirmed) {
                const res = await AxiosRequest('/subject', 'DELETE', null, null, {_id})
                if(res.status) {
                    toast.success('Successful');
                    setError(false);
                } else {
                    toast.error('error')
                    setError(true);
                }
            }
        });
    }

    return (
        <>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px' , marginTop: '32px'}}>
                <h3>💡 Subject 💡 </h3>
            </div>
            {/* insert wrapper */}            
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '24px'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Subject Name: </label>      
                        </div>
                        <div className='col-75'>
                            <input type="text" value={name} onChange={(e)=> setField(e, setName)} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Subject Step: </label>      
                        </div>
                        <div className='col-75'>
                            <input type="text" value={step} onChange={(e)=> setField(e, setStep)} />
                        </div>
                    </div><div className='row'>
                        <div className='col-25'>
                            <label>Subject Value: </label>      
                        </div>
                        <div className='col-75'>
                            <input type="text" value={value} onChange={(e)=> setField(e, setValue)}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Target Subject: </label>      
                        </div>
                        <div className='col-75'>
                            <select id="country" name="country" onChange={(e)=> setField(e, setTarget)}>
                                <option value="">Select Item</option>
                                {
                                    archiveTarget && archiveTarget.map((item)=> {
                                        return (
                                            <option value={item._id}>{item.target}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <button type='button' onClick={()=> insertValue()} style={{width: '100px', marginTop: '32px'}}>
                            Insert
                        </button>
                    </div>
                </div>
            </div>
            {/* inserted list wrapper */}            
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                <table>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Step</th>
                        <th>Value</th>
                        <th>Target Subject</th>
                        <th>Status</th>
                        <th>CreateTime</th>
                        <th>UpdateTime</th>
                        <th>Action</th>
                    </tr>
                        {
                            list && list.map((item, idx)=> {
                                return(
                                    <tr>
                                        <td className='row-1'>{idx + 1}</td>
                                        <td className='row-2'>{item.target_name}</td>
                                        <td className='row-1'>{item.target_step}</td>
                                        <td className='row-1'>{item.target_value}</td>
                                        <td className='row-4' style={{color: '#007aff'}}>{item.target_subject_name.target}</td>
                                        <td className='row-1'style={item.status == 0 ? {color: 'red'} : { color: '#5856d6'} }>{item.status == 0 ? 'Pending' : 'Done'}</td>
                                        <td className='row-1'>{moment(item.createAt).format('YYYY/MM/DD hh:mm:ss')}</td>
                                        <td className='row-1'>{moment(item.createAt).format('YYYY/MM/DD hh:mm:ss')}</td>
                                        <td>
                                            <button type="button" onClick={()=> modifyData(item)} style={{width: '70px'}}>update</button>
                                            <button type="button" onClick={()=> deleteData(item._id)} style={{width: '70px'}}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
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

export default Subject;


