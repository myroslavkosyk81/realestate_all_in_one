import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, 
  deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutStart,
   signInFailure, signOutSuccess} from "../redux/user/userSlice";
// import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';
import "./profile.css"
import '../i18n.js';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  // const [(userListings, setUserListings)] = useState([]);
  const [userLististings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  
  // allow read;
  // allow write: if 
  // request.resource.size < 5 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapsot) => {
        const progress = (snapsot.bytesTransferred / 
        snapsot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      };
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  }
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, { method: 'DELETE', 
    });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">

      <h1 className='text-3xl font-semibold text-center my-3'>{t('profile.title')}</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input onChange={(e) => setFile(e.target.files[0])}
        type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={() => fileRef.current.click()}
         src={formData.avatar || currentUser.avatar} alt="profile"
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
          {fileUploadError ? (
          <span className="text-red-700">
            {t('profile.err_image')}
          </span> 
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
              <span className="text-green-700">{t('profile.image_success')}</span>
           ) : (
              ""
          )}
          
        </p>
        <input type="text" placeholder={t('profile.username')} defaultValue={currentUser.username}
        id="username"
        className="border p-3 rounded-lg" onChange={handleChange} />

        <input type="email" placeholder={t('profile.email')} id="email"
        defaultValue={currentUser.email}
        className="border p-3 rounded-lg" onChange={handleChange} />

        <input type="password" placeholder={t('profile.password')} id="password"
        className="border p-3 rounded-lg" onChange={handleChange} />

        <div className="field flex flex-col columns-1 max-h-14">
          <input className="border p-3 rounded-lg " 
            type="email" placeholder=" " id="email-adress" required />
          <label htmlFor="email-adress" className="border p-3 rounded-lg">
            <span style={{"--i":"0"}}>E</span>
            <span style={{"--i":"1"}}>m</span>
            <span style={{"--i":"2"}}>a</span>
            <span style={{"--i":"3"}}>i</span>
            <span style={{"--i":"4"}}>l</span>
          </label> 
        </div>
        
        <button disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3
        uppercase hover:opacity-95 disabled:opacity-85">
          {loading ? <span>{t('profile.loading')}</span> : <span>{t('profile.update')}</span>}</button>
      
        <Link className="bg-green-700 text-white 
        p-3 rounded-lg uppercase text-center 
        hover:opacity-95" to={"/create-listing"}>{t('profile.create_listing')}
        </Link>

      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer">
          {t('profile.delete_account')}</span>
        <span onClick={handleSignOut}
          className="text-red-700 cursor-pointer">{t('profile.sign_out')}</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 
      <span>{t('profile.user_updated')}</span> : ''}</p>
      
      <button onClick={handleShowListings} className="text-green-700 w-full">{t('profile.show_listing')}</button>
      
      <p className="text-red-700 mt-5">{showListingsError ? <span>{t('profile.err_show_listing')}</span> : ''}</p>
      
      {userLististings && userLististings.length > 0 && 

        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">{t('profile.your_listings')} ({userLististings.length})</h1>
          {userLististings.map((listing) => (
            <div key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
              </Link>
              <Link className="text-slate-700 font-semibold hover:underline truncate flex-1" to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button onClick={() => handleListingDelete(listing._id)} className="text-red-700 uppercase">{t('profile.delete')}</button>
                
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">{t('profile.edit')}</button>
                </Link>
                
              </div>
              </div>
          ))}
        </div>}    
    </div>
  );
}  

