import React from "react";
import firebase from "../../firebase";

import LinkItem from "../Link/LinkItem";

function LinkList(props) {
  const [links, setLinks] = React.useState([]);

  React.useEffect(() => {
    const unsub = getLinks();

    return () => unsub();
  }, []);

  function getLinks() {
    // we could use .get, but .onSnapshot gets the latest updates...
    return firebase.db.collection("links").onSnapshot(handleSnashot);
  }

  function handleSnashot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    console.log({ links });
    return links;
  }

  return (
    <div>
      {links.map((link, index) => (
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
