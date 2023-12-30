import Toggle from "./components/toggle";
import { fetchIssuePublications, findPublication } from "./utils/api";
import { appendNode, getIusseNum, isSection, isSectionItem } from "./utils/dom";

const issueNum = getIusseNum();
const main = document.getElementById("main-content");

const show = (publicationId: number) => {
  window.dispatchEvent(
    new CustomEvent("atlas-ext-show", {
      detail: {
        publicationId,
      },
    })
  );
};

if (main && issueNum) {
  fetchIssuePublications(issueNum).then((publications) => {
    let currentSection = null;
    for (let i = 0; i < main.children.length; i++) {
      const current = main.children[i];

      if (isSection(current)) {
        currentSection = current.textContent!;
        const publication = findPublication(publications, currentSection);
        if (publication) {
          appendNode(current, <Toggle onClick={() => show(publication.id)} />);
        } else {
          currentSection = null;
        }
        continue;
      }

      if (isSectionItem(current) && currentSection) {
        const itemIndex = parseInt(current.textContent!.split("、")[0]);
        const publication = findPublication(
          publications,
          currentSection,
          itemIndex
        );
        if (publication) {
          appendNode(current, <Toggle onClick={() => show(publication.id)} />);
        }
      }
    }
  });
}
