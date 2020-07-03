import React from "react";
import axios from "axios";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
// import posed from 'react-pose'

import firebase from "../../firebase";

import LinkItem from "../Link/LinkItem";
import { LINKS_PER_PAGE } from "../../utils/index";

// const Box = posed.div({
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 }
// });

const fadeInAnimation = keyframes`${fadeIn}`;

const BouncyDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;

function LinkList(props) {
  const [links, setLinks] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  // cursor base pagination
  const [cursor, setCursor] = React.useState(null);
  const page = Number(props.match.params.page);
  const isNewPage = props.location.pathname.includes("new");
  const isTopPage = props.location.pathname.includes("top");
  const liknsRef = firebase.db.collection("links");

  React.useEffect(() => {
    const unsub = getLinks();
    return () => unsub();
  }, [isTopPage, page]);

  function getLinks() {
    setLoading(true)
    // we could use .get, but .onSnapshot gets the latest updates, by setting a listener
    // just like .onAuthChangeState()
    // .orderBy('created', 'desc') = 1st the fild we want to order, 2nd the way i.e. descending...
    const hasCursor = Boolean(cursor);
    if (isTopPage) {
      return liknsRef
        .orderBy("voteCount", "desc")
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else if (page === 1) {
      return (
        liknsRef
          .orderBy("created", "desc")
          // .startAfter(1593682527937)
          // .startAt(1593682527937)
          .limit(LINKS_PER_PAGE)
          .onSnapshot(handleSnapshot)
      );
    } else if (hasCursor) {
      return liknsRef
        .orderBy("created", "desc")
        .startAfter(cursor.created)
        .limit(LINKS_PER_PAGE)
        .onSnapshot(handleSnapshot);
    } else {
      // In case of page 2 reload (watch lecture 28):
      // On reload, we get the offset and we send it to firebase
      // by executing a cloud function. From there we get the links and
      // the last link and we set them accordingly.
      const offset = page * LINKS_PER_PAGE - LINKS_PER_PAGE;
      axios
        .get(
          `https://us-central1-hooks-news-app-d9481.cloudfunctions.net/linksPagination?offset=${offset}`
        )
        .then(response => {
          const links = response.data;
          const lastLink = links[links.length - 1];
          setLinks(links);
          setCursor(lastLink);
          setLoading(false)
        });
      return () => {};
    }
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
    const lastLink = links[links.length - 1];
    setCursor(lastLink);
    setLoading(false)
    console.log({ links });
    // return links;
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
    if (page > 1) {
      props.history.push(`/new/${page - 1}`);
    }
  }
  function visitNextPage() {
    if (page <= links.length / LINKS_PER_PAGE) {
      props.history.push(`/new/${page + 1}`);
    }
  }

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE + 1 : 0;

  return (
    <div style={{opacity: loading ? 0.25 : 1}}>
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
