export interface Publication {
  id: number;
  title: string;
  section: string;
  item_index: number | null;
}

export interface PublicationWithDescription extends Publication {
  description: string;
  url: string | null;
  issue_id: number;
  source: string;
}

const apiUrl = "https://atlas.brancraft.com/api";

export const fetchIssuePublications = async (
  issueNum: string
): Promise<Publication[]> => {
  const url = `${apiUrl}/publications.json?source=ruanyf&issue_id=${issueNum}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.publications;
};

export const fetchSimilarPublications = async (
  id: number
): Promise<PublicationWithDescription[]> => {
  const url = `${apiUrl}/publications/${id}.json`;
  const response = await fetch(url);
  const data = await response.json();
  return data.similars;
};

export const findPublication = (
  publications: Publication[],
  sectionTitle: string,
  itemIndex: number | null = null
): Publication | null => {
  return (
    publications.find(
      (item) => item.item_index === itemIndex && item.section === sectionTitle
    ) || null
  );
};
