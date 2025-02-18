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
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

// added below for phase 4 of frontend readme
// removed below to fix error  'Greeting' is assigned a value but never used
// const Greeting = () => {
//     return (
//       <OpenModalButton
//         buttonText="Greeting"
//         modalComponent={<h2>Hello World!</h2>}
//         onButtonClick={() => console.log("Greeting initiated")}
//         onModalClose={() => console.log("Greeting completed")}
//       />
//     );
//   };
  // 
// 

export default OpenModalButton;
// 