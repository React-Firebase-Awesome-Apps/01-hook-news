import React from "react";
import firebase from "../../firebase";

function LinkList(props) {
  React.useEffect(() => {
    getLinks();
  }, []);

  function getLinks() {
    firebase.db.collection("links").onSnapshot(handleSnashot);
  }

  function handleSnashot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    console.log({ links });
  }

  return <div>LinkList</div>;
}

export default LinkList;
