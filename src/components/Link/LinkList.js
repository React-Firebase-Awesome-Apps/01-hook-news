import React from "react";
import { bounce } from "react-animations";
import styled, { keyframes } from "styled-components";
// import posed from 'react-pose'

import firebase from "../../firebase";

import LinkItem from "../Link/LinkItem";
import { LINKS_PER_PAGE } from "../../utils/index";

// const Box = posed.div({
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 }
// });

const bounceAnimation = keyframes`${bounce}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;

function LinkList(props) {
  const [links, setLinks] = React.useState([]);
  const [isIndexVisible, setIsIndexVisible] = React.useState(true);
  // cursor base pagination
  const [cursor, setCursor] = React.useState(null);
  const page = Number(props.match.params.page);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");

  React.useEffect(() => {
    const unsub = getLinks();
    return () => unsub();
  }, [isTopPage, page]);

  function getLinks() {
    // we could use .get, but .onSnapshot gets the latest updates, by setting a listener
    // just like .onAuthChangeState()
    // .orderBy('created', 'desc') = 1st the fild we want to order, 2nd the way i.e. descending...
    const hasCursor = Boolean(cursor);
    if (isTopPage) {
      return firebase.db
        .collection("links")
        .orderBy("voteCount", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return (
        firebase.db
          .collection("links")
          .orderBy("created", "desc")
          // .startAfter(1593682527937)
          // .startAt(1593682527937)
          .limit(LINKS_PER_PAGE)
          .onSnapshot(handleSnapshot)
      );
    } else if (hasCursor) {
      return firebase.db
        .collection("links")
        .orderBy("created", "desc")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else {
      return (
        firebase.db
          .collection("links")
          .orderBy("created", "desc")
          // .startAfter(cursor.created)
          // .limit(LINKS_PER_PAGE)
          .onSnapshot(handleSnapshot)
      );
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
    console.log({ links });
    return links;
  }

  // function renderLinks() {
  //   if (isNewPage) {
  //     return links;
  //   }
  //   const topLinks = links
  //     .slice()
  //     .sort((l1, l2) => l2.votes.length - l1.votes.length);
  //   return topLinks;
  // }

  function visitPreviousPage() {
    setIsIndexVisible(false);
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
    setIsIndexVisible(true);
  }
  function visitNextPage() {
    setIsIndexVisible(false);

    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
    setIsIndexVisible(true);
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div>
      {links.map((link, index) => (
        <BouncyDiv>
          <LinkItem
            key={link.id}
            showCount={true}
            link={link}
            index={index + pageIndex}
          />
        </BouncyDiv>
      ))}
      {isNewPage && (
        <div className="pagination">
          <div className="pointer mr2" onClick={visitPreviousPage}>
            Previous
          </div>
          <div className="pointer mr2" onClick={visitNextPage}>
            Next
          </div>
        </div>
      )}
    </div>
  );
}

export default LinkList;
