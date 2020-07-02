import React from "react";
import firebase from "../../firebase";

import LinkItem from "../Link/LinkItem";

function LinkList(props) {
  const [links, setLinks] = React.useState([]);
  const isNewPage = props.location.pathname.includes("new");

  React.useEffect(() => {
    const unsub = getLinks();

    return () => unsub();
  }, []);

  function getLinks() {
    // we could use .get, but .onSnapshot gets the latest updates...
    // .orderBy('created', 'desc') = 1st the fild we want to order, 2nd the way i.e. descending...
    return firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnashot);
  }

  function handleSnashot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    console.log({ links });
    return links;
  }

  function renderLinks() {
    if (isNewPage) {
      return links;
    }
    const topLinks = links
      .slice()
      .sort((l1, l2) => l2.votes.length - l1.votes.length);
    return topLinks;
  }

  return (
    <div>
      {renderLinks().map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
