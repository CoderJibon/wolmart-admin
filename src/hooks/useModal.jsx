import React, { useEffect, useRef, useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  //create handle ref
  const handleRef = (e) => {
    if (dropDownRef.current && !dropDownRef?.current?.contains(e.target)) {
      setOpen(false);
    }
  };

  //useEffect
  useEffect(() => {
    document.addEventListener("click", handleRef);
    return () => {
      document.removeEventListener("click", handleRef);
    };
  }, []);

  // toggle
  const toggle = () => {
    setOpen(!isOpen);
  };

  //return
  return { isOpen, toggle, dropDownRef };
};

export default useModal;
