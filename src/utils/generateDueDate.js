export const generateDueDate = (created, rem) => {
  const dueDate = new Date(created);
  dueDate.setDate(dueDate.getDate() + rem);
  return dueDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
