import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../pages/_app";
import { db } from "../pages/_app";

export default function MembersList() {
  const { user } = useContext(AuthContext);

  const docRef = user && db.collection("Users").orderBy("displayName");

  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (user)
      docRef
        .get()
        .then((querySnapshot) => {
          const data = [];
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push({ ...doc.data(), id: doc.id });
          });
          setMembers(data);
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
  }, []);

  return (
    <div>
      {members.map((member) => (
        <h5 key={member.id}>{member.displayName}</h5>
      ))}
    </div>
  );
}
