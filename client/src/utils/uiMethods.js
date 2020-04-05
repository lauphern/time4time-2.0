// export const toggleModal = (
//   pathnameOnShow,
//   pathnameOnHidden,
//   history,
//   offerId
// ) => {
//   history.push(typeof offerId == "string" ? pathnameOnShow : pathnameOnHidden);
// };


export const toggleModal = (
  pathname,
  history
) => {
  history.push(pathname);
};
