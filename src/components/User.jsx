import React from "react";
import { Link } from "react-router-dom";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex items-center shrink-0">
      <Link to="profile">
        <img className="w-8 h-8 rounded-full lg:mr-2" src={photoURL} alt={displayName} />
      </Link>
      <span className="hidden lg:block text-xs">{displayName}님</span>
    </div>
  );
}
