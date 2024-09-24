import React from 'react';
import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// import { 
//     useGetUsersQuery,
//     useGetUserByIdQuery,
//     useCreatUserMutation,
//     useUpdateUserMutation,
//     useDeleteUserMutation
// } from './store/user(for example)/userApi';
// import { setUsername } from './store/user(for example)/userSlice';
// import { AxiosRequest } from './utils/request';
import LoadingScreen from './components/loadingScreen/';
import './App.css';

import Today from './pages/today';
import Subject from './pages/subject';
import ArchivementTarget from './pages/archivement-target';
// import Celebrate from './components/celebrate';
import Progress from './pages/progress';
import Review from './pages/review';
import Remember from './pages/record';
import NotFound from './pages/404';



function App() {

/**
 *  React.js RTK Query (For Test)
*/
  const dispatch = useDispatch();
  
//   const { data: users, isLoading, isError, error} = useGetUsersQuery();
//   const { data: user } = useGetUserByIdQuery(1);
//   const [ createUser ] = useCreatUserMutation();
//   // const handleCreate =()=> {
//   //   createUser({
//   //       name: 'jackson',
//   //       email: 'jackson@outlook.com'
//   //   });
//   //   // dispatch(createUser({
//   //   //     name: 'jackson',
//   //   //     email: 'jackson@outlook.com'
//   //   // }))
//   // };

//   const [updateUser] = useUpdateUserMutation();
//   const handleUpdate = () => {
//     updateUser({
//         id: 1,
//         name: 'new Name'
//     })
//   };

//   const [deleteUser] = useDeleteUserMutation();
//   const handleDelete =()=> {
//     deleteUser(1)
//   }

//   useEffect(()=> {      // normal communication with axios + useEffect
//     // dispatch(setUsername('KKK---'));

//     async function getList () {
//       let res = await AxiosRequest('http://localhost:3000/api/user/schedule', 'POST', null, null, {
//         title: 'hello'
//       });
//     }
//     getList();
//     // toast.success('Successful')
//     // toast.warning('Successful')
//     // toast.error('Successful')
//   }, [dispatch])

//   // useEffect(() => {
//   //   let isMounted = true;
//   //   async function getList() {
//   //     const res = await AxiosRequest(...);
//   //     if (isMounted) {
//   //       toast.success('Successful');
//   //     }
//   //   }
//   //   getList();
//   //   return () => { isMounted = false; };
//   // }, [dispatch]);

//   // const data1 = useSelector((state)=> console.log(state.user.username))

//   // for test
//   const [pwd, setPwd] = useState('');
//   const handleCreate = async()=> {
//     const res = await createUser({name: pwd});
//     dispatch(setUsername(res.user));
//   };
// ~


  return (
    <>
        <div id="appBar">
        <LoadingScreen />
        <BrowserRouter>
            <nav style={{
                // margin: 0, padding: '8px', paddingTop: '32px', paddingBottom: 0, background: '#282a35'
                padding: '30px 40px',
                backgroundColor: 'rgb(7, 5, 45)',
                backgroundImage: 'url(shape.png)',
                backgroundPosition: 'left bottom',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'fixed',
                width: '100%',
                top: 0,
                zIndex: 9000
            }}>
                <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0 }}>
                <li>
                        <NavLink 
                        to="/"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                             Home 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/today" 
                            style={({ isActive }) => ({ 
                                color: isActive ? '#f7be55' : 'wheat',
                                textDecoration: isActive ? 'underline' : 'none',
                                fontWeight: isActive? 'bold' : '500',
                                fontSize: isActive ? '1.1rem' : '1rem'
                            })}
                        >
                            Today 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/subject"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                        Subject 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/archivement"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                        ArchivementTarget 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/review"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                        Review 
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                        to="/remember"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                            Remember  
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink 
                        to="/celebrate"
                        style={({ isActive }) => ({ 
                            color:  isActive ? '#f7be55' : 'wheat',
                            textDecoration: isActive ? 'underline' : 'none',
                            fontWeight: isActive? 'bold' : '500',
                            fontSize: isActive ? '1.1rem' : '1rem'
                        })}
                        >
                            For Test (RTK & RTK Query)
                        </NavLink>
                    </li> */}
                </ul> 
            </nav>
            <Routes>
                <Route path="/" element={<Progress />} />
                <Route path="/today" element={<Today />} />
                <Route path="/subject" element={<Subject />} />
                <Route path="/archivement" element={<ArchivementTarget />} />
                <Route path="/review" element={<Review />} />
                <Route path="/remember" element={<Remember />} />
                {/* <Route path="/celebrate" element={<Celebrate />} /> */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {/* SVG style */}
            <div style={{width: '100%', position: 'fixed', top: '79px', zIndex: 9001}}>
                <svg style={{backgroundColor:'rgba(217,239,225, 0.14)'}} width="100%" height="30" viewBox= "0 0 100 100" preserveAspectRatio="none">
                    <path id="wavepath" d="M0,0  L110,0C35,150 35,0 0,100z" fill="rgb(12, 9, 75)">
                    </path>
                </svg>
            </div>
            
        </BrowserRouter>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <div className="App">
            
            {/* <h1>RTK + RTK Query Example</h1> */}
            {/* Display loading state */}
            {/* {
                isLoading && <p>Loading...</p>
            } */}

            {/* Display error state */}
            {/* {
                isError && <p>Error: {error.message}</p>
            } */}

            {/* Display the list of users */}
            {/* {
                users && !isLoading && (
                    <ul>
                        {users.map((user) => (
                        <li key={user.id}>{user.name}</li>
                        ))}
                    </ul>
                )
            }
                <input placeholder="Email" onChange={(e) => setName(e.target.value)} />
                <input placeholder="Password" type="password" onChange={(e) => setPwd(e.target.value)} />
                <button onClick={handleCreate}>Login</button> */}
        </div>
        
    </>
  );
}

export default App;
