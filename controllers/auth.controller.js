export const registerController = async (req, res) => {
  res.status(200).json({ message: "Register route" });
};

export const loginController = async (req, res) => {
  res.status(200).json({ message: "Login Route" });
};

export const meController = async (req, res) => {
  res.status(200).json({ message: "Me Route" });
};
