const Modal = ({ text, hideModal, action }) => {
  return (
    <>
      <div className="modal">
        <p>Are you sure you want to {text}</p>

        <div className="btns">
          <button className="btn-no" onClick={hideModal}>
            No
          </button>
          <button
            className="btn-yes"
            onClick={() => {
              action();
              hideModal();
            }}
          >
            Yes
          </button>
        </div>
      </div>
      <div className="overlay" onClick={hideModal}></div>
    </>
  );
};

export default Modal;
