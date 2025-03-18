// // frontend/src/components/OpenModalButton/OpenModalButton.jsx
// // added below for phase 4 of frontend readme
// import { useModal } from '../../context/Modal';

// function OpenModalButton({
//   modalComponent, // component to render inside the modal
//   buttonText, // text of the button that opens the modal
//   onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
//   onModalClose // optional: callback function that will be called once the modal is closed
// }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onClick = () => {
//     if (onModalClose) setOnModalClose(onModalClose);
//     setModalContent(modalComponent);
//     if (typeof onButtonClick === "function") onButtonClick();
//   };

//   return <button onClick={onClick}>{buttonText}</button>;
// }

// // added below for phase 4 of frontend readme
// // removed below to fix error  'Greeting' is assigned a value but never used
// // const Greeting = () => {
// //     return (
// //       <OpenModalButton
// //         buttonText="Greeting"
// //         modalComponent={<h2>Hello World!</h2>}
// //         onButtonClick={() => console.log("Greeting initiated")}
// //         onModalClose={() => console.log("Greeting completed")}
// //       />
// //     );
// //   };
//   //
// //

// export default OpenModalButton;
// //
// OpenModalButton.jsx
// import { useContext } from 'react';










// frontend/src/components/OpenModalButton/OpenModalButton.jsx
// added below for phase 4 of frontend readme
// import { useModal } from '../../context/Modal';

// function OpenModalButton({
//   modalComponent, // component to render inside the modal
//   buttonText, // text of the button that opens the modal
//   onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
//   onModalClose // optional: callback function that will be called when the modal is closing
// }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onClick = () => {
//     if (typeof onButtonClick === "function") onButtonClick();
//     if (onModalClose) setOnModalClose(onModalClose);
//     setModalContent(modalComponent);
//   };
// // The order of operations should be adjusted. The logical order should be:
// // 1. Handle the button click first (onButtonClick)
// // 2. Set up the modal close handler (setOnModalClose)
// // 3. Display the modal content (setModalContent)
// // const onClick = () => {
// //   if (onModalClose) setOnModalClose(onModalClose);
// //   setModalContent(modalComponent);
// //   if (typeof onButtonClick === "function") onButtonClick();
// // };
//   return <button onClick={onClick}>{buttonText}</button>;
// }

// // added below for phase 4 of frontend readme
// // removed below to fix error  'Greeting' is assigned a value but never used
// // const Greeting = () => {
// //     return (
// //       <OpenModalButton
// //         buttonText="Greeting"
// //         modalComponent={<h2>Hello World!</h2>}
// //         onButtonClick={() => console.log("Greeting initiated")}
// //         onModalClose={() => console.log("Greeting completed")}
// //       />
// //     );
// //   };
//   //
// //

// export default OpenModalButton;
//






// frontend/src/components/OpenModalButton/OpenModalButton.jsx
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent,
  buttonText,
  onButtonClick,
  onModalClose,
  className // Add this prop
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === 'function') onButtonClick();
    if (typeof onModalClose === 'function') setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <button onClick={onClick} className={className}> {/* Use the className prop here */}
      {buttonText}
    </button>
  );
}

export default OpenModalButton;

