import React from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import FirebaseContext from "../../firebase/context";
import LinkItem from "../Link/LinkItem";

function LinkDetail(props) {
  const { firebase, user } = React.useContext(FirebaseContext);
  const linkId = props.match.params.linkId;
  const linkRef = firebase.db.collection("links").doc(linkId);

  const [link, setLink] = React.useState(null);
  const [commentText, setCommentText] = React.useState("");

  React.useEffect(() => {
    getLink();
  });

  function getLink() {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id });
    });
  }

  function handleAddComment() {
    if (!user) {
      props.history.push("/login");
    } else {
      linkRef.get().then(doc => {
        if (doc.exists) {
          const previousComments = doc.data().comments;
          const comment = {
            postedBy: { id: user.uid, name: user.displayName },
            created: Date.now(),
            text: commentText
          };
          const updatedComments = [...previousComments, comment];
          linkRef.update({ comments: updatedComments });
          setLink(prev => ({
            ...prev,
            comments: updatedComments
          }));
          setCommentText("");
        }
      });
    }
  }

  return !link ? (
    <div>Loading...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea
        onChange={event => setCommentText(event.target.value)}
        value={commentText}
        rows="8"
        columns="80"
      />
      <div>
        <button className="button" onClick={handleAddComment}>
          Add comment
        </button>
      </div>
      {link.comments.map((comment, index) => (
        <div key={index}>
          <p className="comment-author">
            {comment.postedBy.name} | {distanceInWordsToNow(comment.created)}
            <p>{comment.text}</p>
          </p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
