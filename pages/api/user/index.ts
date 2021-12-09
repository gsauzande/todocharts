import prisma from "../../../lib/prisma";

// POST /api/user
// Required fields in body: displayName
// Optional fields in body: email
export default async function handle(req, res) {
  const result = await prisma.user.create({
    data: {
      displayName: req.body.displayName,
      mail: req.body.email || req.body.mail,
    },
  });
  res.json(result);
}
