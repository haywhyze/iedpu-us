import React, { useEffect } from "react";
import Router from "next/router";

export default function () {
  useEffect(() => {
    Router.push("/admin");
  });
  if (!process.browser) return null;
  return <div></div>;
}
