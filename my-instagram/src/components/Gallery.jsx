import trashIcon from "../assets/trash.svg";
import { useLiveQuery } from "dexie-react-hooks";
import getPhotoUrl from "get-photo-url";
import { useState } from "react";
import { db } from "../dexie";
import Modal from "./Modal";

const Gallery = () => {
  // Hooks
  const [showClearGalleryModal, setShowClearGalleryModal] = useState(false);
  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);
  const [photoId, setPhotoId] = useState();
  const allPhotos = useLiveQuery(() => db.gallery.reverse().toArray(), []);

  // Functions
  const addPhoto = async () => {
    await db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };

  const removePhoto = async (id) => {
    await db.gallery.delete(id);
  };

  // Variables
  const loader = (
    <>
      <div id="loader"></div>
      <div className="overlay"></div>
    </>
  );

  const clearGalleryIcon = (
    <img
      src={trashIcon}
      alt="Trash icon"
      className="clear-button"
      onClick={() => {
        setShowClearGalleryModal(true);
      }}
    />
  );

  //------
  return (
    <>
      {/* Add to gallery */}
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <p className="add-photo-button">+</p>
      </label>

      {/* Clear gallery Modal*/}
      {allPhotos?.length > 0 && clearGalleryIcon}
      {showClearGalleryModal && (
        <Modal
          text={"clear your gallery?"}
          hideModal={() => setShowClearGalleryModal(false)}
          action={() => db.gallery.clear()}
        />
      )}

      {/* Delete Photo Modal */}
      {showDeletePhotoModal && (
        <Modal
          text={"delete this photo?"}
          hideModal={() => setShowDeletePhotoModal(false)}
          action={() => removePhoto(photoId)}
        />
      )}

      <section className="gallery">
        {!allPhotos && loader}

        {allPhotos?.length === 0 && (
          <h1 className="empty-gallery">Your gallery is empty.</h1>
        )}

        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="Gallery item" />
            <button
              className="delete-button"
              onClick={() => {
                setPhotoId(photo.id);
                setShowDeletePhotoModal(true);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Gallery;
