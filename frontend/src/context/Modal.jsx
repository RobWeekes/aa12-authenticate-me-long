// // frontend/src/context/Modal.jsx
// // added below for phase 4 of frontend readme
// // changed below for phase 4 of frontend readme
// // import { useRef, createContext } from 'react';
// import { useRef, useState, useContext, createContext } from 'react';
// // added below for phase 4 of frontend readme
// import ReactDOM from 'react-dom';
// //
// //
// // added below for phase 4 of frontend readme
// import './Modal.css';
// //

// const ModalContext = createContext();

// export function ModalProvider({ children }) {
//   const modalRef = useRef();
//   // added below for phase 4 of frontend readme
//   const [modalContent, setModalContent] = useState(null);
//   const [onModalClose, setOnModalClose] = useState(null);   // callback function that will be called when modal is closing
// //

// // added below for phase 4 of frontend readme
// const closeModal = () => {
//     setModalContent(null); // clear the modal contents
//     // If callback function is truthy, call the callback function and reset it
//     // to null:
//     if (typeof onModalClose === "function") {
//       setOnModalClose(null);
//       onModalClose();
//     }
//   };
// //

//   // added below for phase 4 of frontend readme
//   const contextValue = {
//     modalRef, // reference to modal div
//     // added below for phase 4 of frontend readme
//     modalContent, // React component to render inside modal
//     setModalContent, // function to set the React component to render inside modal
//     setOnModalClose, // function to set the callback function to be called when modal is closing
//     //
//     // added below for phase 4 of frontend readme
//     closeModal // function to close the modal
//     //
//   };
// //

//   return (
//     <>
//     {/* changed below for phase 4 of frontend readme */}
//       {/* <ModalContext.Provider> */}
//       <ModalContext.Provider value={contextValue}>
//       {/*  */}
//         {children}
//         </ModalContext.Provider>
//       <div ref={modalRef} />
//     </>
//   );
// }
// //

// // added below for phase 4 of frontend readme
// export function Modal() {
//     const { modalRef, modalContent, closeModal } = useContext(ModalContext);
//     // If there is no div referenced by the modalRef or modalContent is not a
//     // truthy value, render nothing:
//     if (!modalRef || !modalRef.current || !modalContent) return null;

//     // Render the following component to the div referenced by the modalRef
//     return ReactDOM.createPortal(
//       <div id="modal">
//         <div id="modal-background" onClick={closeModal} />
//         <div id="modal-content">{modalContent}</div>
//       </div>,
//       modalRef.current
//     );
//   }
// //

// // added below for phase 4 of frontend readme
// export const useModal = () => useContext(ModalContext);
// //
// Modal.jsx
// frontend/src/context/Modal.jsx
import { useRef, useState, useContext, createContext } from 'react';
// added below for phase 4 of frontend readme
import ReactDOM from 'react-dom';
//
//
// added below for phase 4 of frontend readme
import './Modal.css';
//

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  // console.log('modalRef from ModalProvider:', modalRef)
  // added below for phase 4 of frontend readme
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);   // callback function that will be called when modal is closing
//

// added below for phase 4 of frontend readme
const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      onModalClose();           // Call the callback first
      setOnModalClose(null);    // Then clear it
      // QUESTION -- SHOULDN'T "onModalClose" be called before it is reset??
      // setOnModalClose(null);
      // onModalClose();
      // The current implementation in the code has setOnModalClose(null) running before onModalClose(), but it should be reversed. The onModalClose callback should be called first, and then cleaned up by setting it to null. This ensures the callback function has access to any state or props it needs before the cleanup occurs.
    }
  };

  // added below for phase 4 of frontend readme
  const contextValue = {
    modalRef, // reference to modal div
    // added below for phase 4 of frontend readme
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function to be called when modal is closing
    // added below for phase 4 of frontend readme
    closeModal // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

// added below for phase 4 of frontend readme
export function Modal() {
    const { modalRef, modalContent, closeModal } = useContext(ModalContext);
    // If there is no div referenced by the modalRef or modalContent is not a
    // truthy value, render nothing:
    if (!modalRef || !modalRef.current || !modalContent) return null;

    // Render the following component to the div referenced by the modalRef
    return ReactDOM.createPortal(
      // What to render...
      <div id="modal">
        <div id="modal-background" onClick={closeModal} />
        <div id="modal-content">{modalContent}</div>
      </div>,
      modalRef.current  // Where to render it
    );
  }

// added below for phase 4 of frontend readme
export const useModal = () => useContext(ModalContext);
