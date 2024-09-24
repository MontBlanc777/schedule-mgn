import React,  { useEffect, useState } from 'react';
import swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AxiosRequest } from '../utils/request';

function ArchivementTarget ()  {

    const [ error, setError ] = useState(false);
    const [ target, setTarget ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ list, setList ] = useState([]);
    const [ modifyStatus, setModifyStatus ] = useState(false);
    const [ id, setId ] = useState(null);

    useEffect(()=> {
        async function getList() {
            const param = {};
            const res = await AxiosRequest('/archivementTarget', 'GET', null, param, null);
            if(res && res.status) { 
                setList(res.data);
                setError(true);
            } 
        }
        getList();
    }, [error]);

    const setField = (e, field) => {
        field(e.target.value)
    }

    const insertData = async()=> {
        let reqData = {
            target,
            description
        };

        if(target && description) {
            swal.fire({
                title: 'Are you sure?',
                icon: 'info',
                showCancelButton: true
            }).then(async(result)=> {
                if(result.isConfirmed) {
                    let method = 'POST';
                    if(modifyStatus) {
                        method = 'PUT';
                        reqData._id = id;
                    }
                    const res = await AxiosRequest('/archivementTarget', method, null, null, reqData);
                    if(res && res.status) {
                        setError(false);
                        setModifyStatus(false);
                        setTarget(null);
                        setDescription(null);
                        toast.success('Successful')
                    } else {
                        setError(true);
                        setModifyStatus(false);
                        setTarget(null);
                        setDescription(null);
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
        setTarget(param.target);
        setDescription(param.description);
        setModifyStatus(true);
        setId(param._id);
    };

    const deleteData = async(_id)=> {
        swal.fire({
            title: 'Are you sure?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonAriaLabel: 'Yes!',
        }).then(async(result)=> {
            if(result.isConfirmed) {
                const res = await AxiosRequest('/archivementTarget', 'DELETE', null, null, {_id});
                if(res.status) {
                    toast.success('Successful');
                    setError(false);
                } else {
                    toast.error('Error');
                    setError(true);
                }
            }
        })
    }


    return(
        <>
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px'}}>
                <h3>💎 Archivement Target 💎 </h3>
            </div>
            {/* insert wrapper */}
            <div style={{display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '24px'}}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-25'>
                            <label>Target: </label>      
                        </div>
                        <div className='col-75'>
                            <input type="text" value={target} onChange={(e)=> setField(e, setTarget)} />
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
                        <button type='button' onClick={()=> insertData()} style={{width: '100px', marginTop: '32px'}}>
                            Insert
                        </button>
                    </div>
                </div>
            </div>
            
            {/* inserted list wrapper */}            
            <div style={{display: 'flex', width: '100%', justifyContent: 'center', gap: '24px', marginTop: '32px', paddingBottom: '10%'}}>
                <table>
                    <tr>
                        <th>No</th>
                        <th>Target</th>
                        <th>Description</th>
                        <th>createAt</th>
                        <th>Action</th>
                    </tr>
                        {
                            list && list.map((item, idx)=> {
                                return(
                                    <tr>
                                        <td className='row-1'>{idx + 1}</td>
                                        <td className='row-3'>{item.target}</td>
                                        <td className='row-4'>{item.description}</td>
                                        <td className='row-2'>{moment(item.createAt).format('YYYY/MM/DD hh:mm:ss')}</td>
                                        <td className='row-1'>
                                            <button type="button" onClick={()=> modifyData(item)} style={{width: '70px'}}>update</button>
                                            <button type="button" onClick={()=> deleteData(item._id)} style={{width: '70px'}}>delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </table>
            </div>
        </>
    )
};

export default ArchivementTarget;