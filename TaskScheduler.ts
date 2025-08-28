import * as fs from "fs";
import csv from "csv-parser";
import * as readline from "readline";
import { createObjectCsvWriter } from "csv-writer";
import { CsvWriter } from "csv-writer/src/lib/csv-writer";
import { ObjectMap } from "csv-writer/src/lib/lang/object";

export class TaskScheduler {
  tasksPath: string;
  readlineInterface: readline.Interface;
  csvWriter: CsvWriter<ObjectMap<any>>;

  constructor(tasksPath: string) {
    this.tasksPath = tasksPath;
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.csvWriter = createObjectCsvWriter({
      path: tasksPath,
      header: [
        { id: "id", title: "ID" },
        { id: "title", title: "Title" },
        { id: "dueDate", title: "Due Date" },
        { id: "completed", title: "Completed" },
      ],
    });
  }

  async start(): Promise<void> {
    let running = true;
    while (running) {
      this.readlineInterface.question(
        "Welcome to Task Scheduler!\nChoose an option:\n1. Add Task\n2. View Tasks\n3. Exit\n",
        async (answer) => {
          if (answer === "1") {
            await this.addTask();
          } else if (answer === "3") {
            running = false;
          }
        }
      );
    }
    this.readlineInterface.close();
  }

  async addTask(): Promise<void> {
    const newTask = {
      id: this.getNextId(),
      title: "",
      dueDate: "",
      completed: false,
    };
    newTask.title = await this.asyncPrompt("Enter task title: ");
    newTask.dueDate = await this.asyncPrompt("Enter due date (YYYY-MM-DD): ");
    await this.csvWriter.writeRecords([newTask]);
    console.log("Task added successfully.");
  }

  getNextId(): number {
    let rowCount = 0;
    fs.createReadStream(this.tasksPath)
      .pipe(csv())
      .on("data", () => {
        rowCount++;
      });
    return rowCount + 1;
  }

  private async asyncPrompt(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.readlineInterface.question(question, (answer) => {
        resolve(answer);
      });
    });
  }
}
