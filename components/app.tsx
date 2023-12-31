import React, { useEffect } from "react";
import Sidebar from "./sidebar";

interface CustomEventDetail {
  publicationId: number;
}

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleEvent = (event: CustomEvent<CustomEventDetail>) => {
    setOpen(true);
  };

  useEffect(() => {
    window.addEventListener("atlas-ext-show", handleEvent as EventListener);

    return () => {
      window.removeEventListener(
        "atlas-ext-show",
        handleEvent as EventListener
      );
    };
  }, []);

  return <Sidebar open={open} handleClose={() => setOpen(false)} />;
};

export default App;
