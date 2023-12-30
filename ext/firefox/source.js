// utils/api.ts
var apiUrl = "https://atlas.brancraft.com/api";
var fetchIssuePublications = async (issueNum) => {
  const url = `${apiUrl}/publications.json?source=ruanyf&issue_id=${issueNum}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.publications;
};
var findPublication = (publications, sectionTitle, itemIndex = null) => {
  return publications.find((item) => item.item_index === itemIndex && item.section === sectionTitle) || null;
};

// utils/dom.tsx
var getIusseNum = () => {
  const title = document.getElementById("page-title")?.textContent;
  const match = title?.match(/第\s?(\d+)\s?期/);
  return match ? match[1] : null;
};
var isSectionItem = (item) => {
  const text = item.textContent?.trim();
  const regex = /^(\d+)、(.*)$/;
  if (!text)
    return false;
  return regex.test(text);
};
var isSection = (item) => {
  return item.tagName.toLowerCase() === "h2";
};

// index.tsx
var issueNum = getIusseNum();
var main = document.getElementById("main-content");
if (main && issueNum) {
  fetchIssuePublications(issueNum).then((publications) => {
    let currentSection = null;
    for (let i = 0;i < main.children.length; i++) {
      const current = main.children[i];
      if (isSection(current)) {
        currentSection = current.textContent;
        const publication = findPublication(publications, currentSection);
        if (publication) {
          console.log(`Found section ${currentSection}`);
          console.log(publication);
        } else {
          currentSection = null;
        }
        continue;
      }
      if (isSectionItem(current) && currentSection) {
        const itemIndex = parseInt(current.textContent.split("\u3001")[0]);
        const publication = findPublication(publications, currentSection, itemIndex);
        if (publication) {
          console.log(`Found ${publication.id} for ${currentSection}`);
          console.log(publication);
        }
      }
    }
  });
}
