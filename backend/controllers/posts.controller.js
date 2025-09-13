import prisma from "../prisma/prisma-client.js";

export const createPost = async (req, res) => {
  try {
    const { userId, collegeId, postTitle, postDescription } = req.body;

    // Validate the required fields
    if (!userId || !collegeId || !postTitle || !postDescription) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new post
    const newPost = await prisma.post.create({
      data: {
        postTitle,
        postDescription,
        userId,
        collegeId,
      },
    });

    return res.status(201).json({ message: "Post created successfully." });
  } catch (error) {
    console.error("Error in createPost controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostsByCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;

    // Validate that collegeId is provided
    if (!collegeId) {
      return res.status(400).json({ error: "collegeId is required." });
    }

    // Find all posts related to the specified college, sorted by upvotes in descending order, and then by createdAt in descending order
    const posts = await prisma.post.findMany({
      where: {
        collegeId,
      },
      orderBy: [
        {
          upvotes: "desc", // Sort posts by upvotes in descending order
        },
        {
          createdAt: "desc", // Sort posts by createdAt in descending order
        },
      ],
      select: {
        id: true,
        createdAt: true,
        postTitle: true,
        postDescription: true,
        upvotes: true,
        User: {
          select: {
            username: true, // Only include the username field from User
          },
        },
        comments: {
          select: {
            content: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error in getPostsByCollege controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkUserUpvote = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.json({ hasUpvoted: false });
  }

  try {
    // Check if the user has upvoted the post
    const upvote = await prisma.userPostUpvote.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    // Return the result
    if (upvote) {
      return res.json({ hasUpvoted: true });
    } else {
      return res.json({ hasUpvoted: false });
    }
  } catch (error) {
    console.error("Error in checkUserUpvote controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const toggleUpvote = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Check if the user has already upvoted the post
    const existingUpvote = await prisma.userPostUpvote.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (existingUpvote) {
      // If the upvote exists, remove it (toggle off)
      await prisma.userPostUpvote.delete({
        where: {
          id: existingUpvote.id,
        },
      });

      // Manually update the upvotes count by querying and setting the new value
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      const newUpvoteCount = post.upvotes - 1;

      await prisma.post.update({
        where: { id: postId },
        data: { upvotes: newUpvoteCount },
      });

      return res.json({ message: "Upvote removed" });
    } else {
      // If the upvote does not exist, add it (toggle on)
      await prisma.userPostUpvote.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });

      // Manually update the upvotes count by querying and setting the new value
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });

      const newUpvoteCount = post.upvotes + 1;

      await prisma.post.update({
        where: { id: postId },
        data: { upvotes: newUpvoteCount },
      });

      return res.json({ message: "Upvote added" });
    }
  } catch (error) {
    console.error("Error in toggleUpvote controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPostDetails = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        User: {
          select: {
            username: true,
            profilePicLink: true,
          },
        },
        College: {
          select: {
            name: true,
            id: true,
          },
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            content: true,
            createdAt: true,
            user: {
              select: {
                username: true,
                profilePicLink: true,
              },
            },
          },
        },
        upvoteData: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.json({
      id: post.id,
      postTitle: post.postTitle,
      postDescription: post.postDescription,
      createdAt: post.createdAt,
      username: post.User?.username,
      profilePicLink: post.User?.profilePicLink,
      collegeName: post.College?.name,
      collegeId: post.College?.id,
      upvotes: post.upvotes,
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error in getPostDetails controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  try {
    // Check if the post exists
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await prisma.comment.create({
      data: {
        content,
        postId,
        userId,
      },
    });

    return res.status(201).json({
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error in addComment controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const weekly_most_upvoted = async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - 7);

    const posts = await prisma.post.findMany({
      where: {
        createdAt: {
          gte: startOfWeek,
        },
      },
      orderBy: {
        upvotes: 'desc',
      },
      take: 3,
      select: {
        id: true,
        createdAt: true,
        postTitle: true,
        postDescription: true,
        upvotes: true,
        User: {
          select: {
            username: true,
          },
        },
        College: {
          select: {
            name: true,
          },
        }
      },
    });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching most upvoted posts of the week:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};