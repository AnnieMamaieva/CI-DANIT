import Validator from "fastest-validator";
const v = new Validator();
const newspostSchema = {
  id: { type: "number", optional: true },
  title: { type: "string", max: 1500 },
  text: { type: "string", max: 3000 },
};

export const validateNewspost = v.compile(newspostSchema);
