import prisma from "../prisma/prisma-client.js";

export const createCollege = async (req, res) => {
  const { createdBy, name, description, imageUrls } = req.body;

  if (!createdBy || !name || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const college = await prisma.college.findFirst({ where: { name } });

    if (college) {
      return res
        .status(400)
        .json({ error: "College with the same name already exists" });
    }
    // Create a new college
    const newCollege = await prisma.college.create({
      data: {
        name,
        description,
        createdBy,
        images: {
          create: imageUrls.map((url) => ({
            imageURL: url,
            uploadedBy: createdBy,
          })),
        },
      },
    });

    return res.status(201).json(newCollege);
  } catch (error) {
    console.error("Error in createCollege controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const AllColleges = async (req, res) => {
  try {
    const allColleges = await prisma.college.findMany({
      include: {
        creator: {
          select: {
            username: true, // Include only the username of the creator
          },
        },
        images: {
          orderBy: {
            likes: "desc", // Sort images by most liked first
          },
        },
        posts: true, // Include all associated posts
      },
    });

    // Sort the colleges by the latest post's creation date, and then by the college creation date
    const sortedColleges = allColleges.sort((a, b) => {
      const latestPostA = a.posts.length
        ? new Date(a.posts[a.posts.length - 1].createdAt)
        : new Date(0);
      const latestPostB = b.posts.length
        ? new Date(b.posts[b.posts.length - 1].createdAt)
        : new Date(0);

      if (latestPostA > latestPostB) return -1;
      if (latestPostA < latestPostB) return 1;

      // If both colleges have no posts or have the same latest post time, fallback to college creation date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return res.status(200).json(sortedColleges);
  } catch (error) {
    console.error("Error in AllColleges controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const SingleCollege = async (req, res) => {
  const { id } = req.params;
  try {
    const college = await prisma.college.findUnique({
      where: {
        id,
      },
      include: {
        creator: {
          // Use the correct relation name here
          select: {
            username: true, // Include only the username of the creator
          },
        },
        images: true, // Include all associated images
      },
    });

    return res.status(200).json(college);
  } catch (error) {
    console.error("Error in SingleCollege controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkUserLikeCollege = async (req, res) => {
  const { collegeId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.json({ hasLiked: false });
  }

  try {
    // Check if the user has liked the college
    const like = await prisma.userCollegeLike.findUnique({
      where: {
        userId_collegeId: {
          userId: userId,
          collegeId: collegeId,
        },
      },
    });

    // Return the result
    if (like) {
      return res.json({ hasLiked: true });
    } else {
      return res.json({ hasLiked: false });
    }
  } catch (error) {
    console.error("Error in checkUserLikeCollege controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleCollegeLike = async (req, res) => {
  const { collegeId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Check if the user has already liked the college
    const existingLike = await prisma.userCollegeLike.findUnique({
      where: {
        userId_collegeId: {
          userId: userId,
          collegeId: collegeId,
        },
      },
    });

    if (existingLike) {
      // If the like exists, remove it (toggle off)
      await prisma.userCollegeLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Manually update the likes count by querying and setting the new value
      const college = await prisma.college.findUnique({
        where: { id: collegeId },
      });

      const newLikeCount = college.likes - 1;

      await prisma.college.update({
        where: { id: collegeId },
        data: { likes: newLikeCount },
      });

      return res.json({ message: "Like removed" });
    } else {
      // If the like does not exist, add it (toggle on)
      await prisma.userCollegeLike.create({
        data: {
          userId: userId,
          collegeId: collegeId,
        },
      });

      // Manually update the likes count by querying and setting the new value
      const college = await prisma.college.findUnique({
        where: { id: collegeId },
      });

      const newLikeCount = college.likes + 1;

      await prisma.college.update({
        where: { id: collegeId },
        data: { likes: newLikeCount },
      });

      return res.json({ message: "Like added" });
    }
  } catch (error) {
    console.error("Error in toggleCollegeLike controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
