import React, { useContext } from "react";
import Link from "next/link";
import Button from "components/CustomButtons/Button.js";
import { AuthContext } from "../pages/_app";

export default function UnderReview() {
  const { signOut } = useContext(AuthContext);
  return (
    <div className="container-review">
      <div className="overlay-review">
        <h1>
          Profile under review. You will be notified by email when you are
          verified
        </h1>
        <Link href="/">
          <span>
            <Button color="primary" size="lg">
              Return to homepage
            </Button>
          </span>
        </Link>
        <Button color="danger" onClick={signOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
