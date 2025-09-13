import prisma from "../prisma/prisma-client.js";

export const createMailingListEntry = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    await prisma.mailingList.create({
      data: {
        email,
      },
    });
    res.status(201).json({ message: "Sucess" });
  } catch (error) {
    console.error("Error in createMailingListEntry controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
