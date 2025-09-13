import prisma from "../prisma/prisma-client.js";

export const addImageToCollege = async (req, res) => {
  const { collegeId } = req.params;
  const { imageURLs, uploadedBy } = req.body; // Expecting imageURLs to be an array

  try {
    // Check if the college exists
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
    });

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    // Create multiple images and associate them with the college
    await prisma.image.createMany({
      data: imageURLs.map((imageURL) => ({
        imageURL,
        uploadedBy,
        collegeId,
      })),
    });

    return res.status(201).json({
      message: "Images added successfully",
    });
  } catch (error) {
    console.error("Error adding images to college:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getCollegeImages = async (req, res) => {
  const { collegeId } = req.params;

  try {
    // Fetch the college with its images, sorted by likes first and then by uploadedAt
    const college = await prisma.college.findUnique({
      where: { id: collegeId },
      select: {
        id: true,
        name: true,
        images: {
          orderBy: [
            { likes: "desc" }, // Sort by most likes first
            { uploadedAt: "desc" }, // Then by most recent
          ],
          select: {
            id: true,
            imageURL: true,
            likes: true,
            uploadedBy: true,
            uploadedAt: true,
          },
        },
      },
    });

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    return res.status(200).json(college.images);
  } catch (error) {
    console.error("Error fetching college images:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const checkUserLike = async (req, res) => {
  const { imageId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.json({ hasLiked: false });
  }

  try {
    // Check if the user has liked the image
    const like = await prisma.userImageLike.findUnique({
      where: {
        userId_imageId: {
          userId: userId,
          imageId: imageId,
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
    console.error("Error in checkUserLike controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleLike = async (req, res) => {
  const { imageId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Check if the user has already liked the image
    const existingLike = await prisma.userImageLike.findUnique({
      where: {
        userId_imageId: {
          userId: userId,
          imageId: imageId,
        },
      },
    });

    if (existingLike) {
      // If the like exists, remove it (toggle off)
      await prisma.userImageLike.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Manually update the likes count by querying and setting the new value
      const image = await prisma.image.findUnique({
        where: { id: imageId },
      });

      const newLikeCount = image.likes - 1;

      await prisma.image.update({
        where: { id: imageId },
        data: { likes: newLikeCount },
      });

      return res.json({ message: "Like removed" });
    } else {
      // If the like does not exist, add it (toggle on)
      await prisma.userImageLike.create({
        data: {
          userId: userId,
          imageId: imageId,
        },
      });

      // Manually update the likes count by querying and setting the new value
      const image = await prisma.image.findUnique({
        where: { id: imageId },
      });

      const newLikeCount = image.likes + 1;

      await prisma.image.update({
        where: { id: imageId },
        data: { likes: newLikeCount },
      });

      return res.json({ message: "Like added" });
    }
  } catch (error) {
    console.error("Error in toggleLike controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
