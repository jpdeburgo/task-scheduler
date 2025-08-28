import { TaskScheduler } from "./TaskScheduler";

const scheduler = new TaskScheduler("tasks.csv");
scheduler.start();
