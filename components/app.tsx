import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import {
  PublicationWithDescription,
  fetchSimilarPublications,
} from "../utils/api";
import { currentToggled, toggleItem } from "../utils/dom";

interface CustomEventDetail {
  publicationId: number;
}

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [publications, setPublications] = React.useState<
    PublicationWithDescription[]
  >([]);

  const handleEvent = (event: CustomEvent<CustomEventDetail>) => {
    const { publicationId } = event.detail;
    setOpen(true);
    fetchSimilarPublications(publicationId).then((publications) => {
      setPublications(publications);
    });
  };

  const handleHide = () => {
    setOpen(false);
    const currentPublicationId = currentToggled();
    if (currentPublicationId) {
      toggleItem(parseInt(currentPublicationId));
    }
  };

  useEffect(() => {
    window.addEventListener("atlas-ext-show", handleEvent as EventListener);
    window.addEventListener("atlas-ext-hide", handleHide);

    return () => {
      window.removeEventListener(
        "atlas-ext-show",
        handleEvent as EventListener
      );
      window.removeEventListener("atlas-ext-hide", handleHide);
    };
  }, []);

  return (
    <Sidebar open={open} publications={publications} handleHide={handleHide} />
  );
};

export default App;
