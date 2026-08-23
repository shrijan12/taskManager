import Task from "./../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created sucessfully",
      data: {
        task,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating the task",
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const { status, priority, search, page = 1, limit = 10 } = req.query;
    const query = {
      createdBy: req.body_id,
    };
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    const pageNumber = Math.max(Number(page), 1);

    const limitNumber = Math.min(Math.max(Number(limit), 1), 50);

    const skip = (pageNumber - 1) * limitNumber;

    const tasks = await Task.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limitNumber);

    const total = await Task.countDocuments(query);
    res.status(200).json({
      success: true,

      data: {
        tasks,

        pagination: {
          total,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(total / limitNumber),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting the task",
    });
  }
};

export const getTaskByID = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while getting the task based on task ID",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating the task",
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting the task",
    });
  }
};
