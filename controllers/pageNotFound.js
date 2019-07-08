exports.pageNotFound = (req, res, next) => {
  res.status(404).render("404", {pageTitle: "not found", path: "/404"});
};
