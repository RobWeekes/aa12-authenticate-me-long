// frontend/src/components/Navigation/OpenModalMenuItem.jsx
// optional: added below for phase 5 of frontend readme
// removed below to fix error: 'React' is defined but never used
// import React from 'react';
// 
// frontend/src/components/Navigation/OpenModalMenuItem.jsx
import { useModal } from '../../context/Modal';  // Ensure this path is correct

function OpenModalMenuItem({
  modalComponent, // React component to render inside modal
  itemText,       // Text of the menu item that opens the modal
  onItemClick,    // Optional callback for when the item is clicked
  onModalClose    // Optional callback for when the modal closes
}) {
  const { openModal } = useModal(); // Destructure openModal from useModal

  // Function that is called when the menu item is clicked
  const onClick = () => {
    openModal(modalComponent, onModalClose); // Open modal with content and callback
    if (onItemClick) onItemClick(); // Execute the optional callback
  };

  return <li onClick={onClick}>{itemText}</li>;
}

export default OpenModalMenuItem;
