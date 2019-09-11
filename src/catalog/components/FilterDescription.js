import React from "react";

import { useCatalogState } from "../catalog-context";

export default function FilterDescription() {
  const { catalogFilter } = useCatalogState();

  const filterDescriptions = [
    {
      filter: "priorities",
      copy:
        "This is a hitlist of satellites most in need of amateur observations. Higher priority sats include recent launches, changes in orbit, or lesser known orbits"
    },
    { filter: "undisclosed", copy: "bla bla undisclosed." },
    { filter: "debris", copy: "bla bla debris." },
    { filter: "latest", copy: "bla bla latest" },
    { filter: "all", copy: "bla bla all." }
  ];

  return filterDescriptions.map(description => {
    if (description.filter === catalogFilter) {
      return (
        <p
          key={`${description.filter} copy`}
          className="catalog__filter-description"
        >
          {description.copy}
        </p>
      );
    }
  });
}
