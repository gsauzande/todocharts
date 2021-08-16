import prisma from "../../../lib/prisma";

// POST /api/user
// Required fields in body: displayName
// Optional fields in body: email
export default async function handle(req, res) {
  const { displayName, mail } = req.body;

  const result = await prisma.user.create({
    data: {
      displayName,
      mail,
    },
  });
  res.json(result);
}
