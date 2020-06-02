import React from "react";
import Router from "next/router";

export default function Admin({ ...rest }) {
  React.useEffect(() => Router.push("/admin/dashboard"), []);
  return null;
}
