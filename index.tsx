import { fetchIssuePublications, findPublication } from "./utils/api";
import { getIusseNum, isSection, isSectionItem } from "./utils/dom";

const issueNum = getIusseNum();
const main = document.getElementById("main-content");

if (main && issueNum) {
  fetchIssuePublications(issueNum).then((publications) => {
    let currentSection = null;
    for (let i = 0; i < main.children.length; i++) {
      const current = main.children[i];

      if (isSection(current)) {
        currentSection = current.textContent!;
        const publication = findPublication(publications, currentSection);
        if (publication) {
          console.log(`Found section ${currentSection}`);
          console.log(publication);
          // inject(current, publication.id);
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
          console.log(`Found ${publication.id} for ${currentSection}`);
          console.log(publication);
          // inject(current, publication.id);
        }
      }
    }
  });
}
