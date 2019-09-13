import React from "react";

export default function MultipleObservationForm({ pastedIODs, setPastedIODs }) {
  return (
    <textarea
      className="multiple-observation-form"
      // TODO - better placeholder text, and placeholder IODs that aren't user specific.
      placeholder={`Paste your observations in this field, one observation per line like so:
          
28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S`}
      value={pastedIODs}
      onChange={event => setPastedIODs(event.target.value)}
      rows="10"
      cols="80"
    />
  );
}

// IODs
// 28537 05 004A   4353 G 20190324193958688 56 75 0850592+471197 16 S
// 28537 05 004A   4353 G 20190324193959728 56 75 0852089+468562 16 S
// 28537 05 004A   4353 G 20190324194001008 56 75 0853326+465278 16 S
// 28537 05 004A   4353 G 20190324194001888 56 75 0854298+463051 16 S
// 28537 05 004A   4353 G 20190324194037131 56 75 0926071+373796 16 S
// 28537 05 004A   4353 G 20190324194038691 56 75 0927158+369915 16 S