import { useLiveQuery } from 'dexie-react-hooks';
import getPhotoUrl from 'get-photo-url';
import { useState } from 'react';
import profileIcon from '../assets/profileIcon.svg';
import { db } from '../dexie';

const Bio = () => {
  //
  const defaultDetails = {
    name: 'John Doe',
    about: 'Lorem ipsium',
  };

  // Hooks
  const userDetails =
    useLiveQuery(() => db.bio.get('info'), []) || defaultDetails;
  const profilePhoto =
    useLiveQuery(() => db.bio.get('profilePhoto'), []) || profileIcon;
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);

  // Functions
  const updateUserDetails = async event => {
    const objectData = {
      name: event.target.nameOfUser.value,
      about: event.target.aboutUser.value,
    };
    event.preventDefault();
    await db.bio.put(objectData, 'info');
    setEditFormIsOpen(false);
  };

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl('#profilePhotoInput');
    await db.bio.put(newProfilePhoto, 'profilePhoto');
  };

  // Variables
  const editForm = (
    <form className="edit-bio-form" onSubmit={e => updateUserDetails(e)}>
      <input
        type="text"
        required
        defaultValue={userDetails?.name}
        name="nameOfUser"
        placeholder="Your name"
      />
      <input
        type="text"
        required
        defaultValue={userDetails?.about}
        name="aboutUser"
        placeholder="About you"
      />
      <br />
      <button
        type="button"
        className="cancel-button"
        onClick={() => setEditFormIsOpen(false)}
      >
        Cancel
      </button>
      <button type="submit">Save</button>
    </form>
  );

  const editButton = (
    <button onClick={() => setEditFormIsOpen(true)}>Edit</button>
  );

  //-----
  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div
          className="profile-photo"
          role="button"
          title="Click to edit photo"
        >
          <img src={profilePhoto} alt="profile" />
        </div>
      </label>
      <div className="profile-info">
        <p className="name">{userDetails.name}</p>
        <p className="about">{userDetails.about}</p>

        {editFormIsOpen ? editForm : editButton}
      </div>
    </section>
  );
};

export default Bio;
