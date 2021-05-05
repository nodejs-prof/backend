import { handler } from "../services/handler";
import { Userservice } from "../services/user_service";

// Display list of all Authors.
// const author_list = handler((req, res, X_HADER) => {
//   console.log("X_HADER :::::::: " + X_HADER);
//   res.send("NOT IMPLEMENTED: Author list");
// });

const author_list = (req, res) => {
  const userService = new Userservice();
  userService.registerUser();
  res.send("NOT IMPLEMENTED: Author list");
};

// Display detail page for a specific Author.
const author_detail = (req, res) => {
  res.send("NOT IMPLEMENTED: Author detail: " + req.params.id);
};

// Display Author create form on GET.
const author_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// Handle Author create on POST.
const author_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// Display Author delete form on GET.
const author_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
const author_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
const author_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
const author_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};

const authorController = {
  author_list,
  author_update_post,
  author_delete_post,
  author_create_post,
  author_detail,
};

export { authorController };
