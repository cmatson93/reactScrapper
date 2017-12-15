import React from "react";

export const ListItem = props =>
  <li className="list-group-item">
    <p>{props.children}</p>
    <a target="_blank" href={props.href}>Read Article</a>
  </li>;


