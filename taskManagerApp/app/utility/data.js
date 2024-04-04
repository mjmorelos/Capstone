import { User } from "./models";
import { connectToDB } from "./utils";
import { Task } from "./models";

export const fetchUsers = async (search, page) => {
const regex = new RegExp(search, "i");
const ITEM_PER_PAGE = 6;
  try {
    connectToDB();
    const count = await User.find({ name: { $regex: regex } }).countDocuments();
    const users = await User.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
    return {users, count};
} catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchTasks= async (search, page) => {
  const regex = new RegExp(search, "i");
  const ITEM_PER_PAGE = 10;
    try {
      connectToDB();
      const count = await Task.find({ task: { $regex: regex } }).countDocuments();
      const tasks = await Task.find({ task: { $regex: regex } }).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
      return {tasks, count};
  } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch tasks!");
    }
  };

  export const fetchStudentTasks= async (search, page) => {
    const regex = new RegExp(search, "i");
    const ITEM_PER_PAGE = 100;
      try {
        connectToDB();
        const count = await Task.find({ task: { $regex: regex } }).countDocuments();
        const tasks = await Task.find({ task: { $regex: regex } }).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return {tasks, count};
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch tasks!");
      }
    };

  //single user/ task  page
  export const fetchUser = async (id) => {
      try {
        connectToDB();
        const user = await User.findById(id);
        return user || {}; // Return an empty object if no user is found
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch user!");
      }
    };
  

    export const fetchTask = async (id) => {
      try {
        connectToDB();
        const task = await Task.findById(id);
        return task || {};;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch task!");
      }
    };


    export const fetchUsersPrint = async (search, page) => {
      const regex = new RegExp(search, "i");
      const ITEM_PER_PAGE = 100;
      const query = { name: { $regex: regex }, isAdmin: false, isActive: true };
    
      try {
        connectToDB();
        const count = await User.countDocuments(query);
        const users = await User.find(query).limit(ITEM_PER_PAGE).skip((page - 1) * ITEM_PER_PAGE);
        return { users, count };
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users!");
      }
    };