import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import {
  PublicationWithDescription,
  fetchSimilarPublications,
} from "../utils/api";
import Preflight from "./preflight";

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

  useEffect(() => {
    window.addEventListener("atlas-ext-show", handleEvent as EventListener);

    return () => {
      window.removeEventListener(
        "atlas-ext-show",
        handleEvent as EventListener
      );
    };
  }, []);

  return (
    <Preflight>
      <Sidebar
        open={open}
        handleClose={() => setOpen(false)}
        publications={publications}
      />
    </Preflight>
  );
};

export default App;
