import { TaskScheduler } from "./TaskScheduler";

const mockCreateInterface = {
  question: jest.fn(),
  close: jest.fn(),
};

const mockWriteRecords = jest.fn();

const mockPath = "/path/to/store";

jest.mock("readline", () => ({
  createInterface: jest.fn(() => mockCreateInterface),
}));

jest.mock("csv-writer", () => ({
  createObjectCsvWriter: jest.fn(() => ({
    writeRecords: mockWriteRecords,
  })),
}));

jest.mock("fs");

import * as fs from "fs";
import * as mockReadline from "readline";
import { createObjectCsvWriter as mockCreateObjectCsvWriter } from "csv-writer";

describe("TaskScheduler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fs.createReadStream as jest.Mock).mockReturnValue({
      pipe: () => ({
        on: (_: string, cb: Function) => {
          cb();
        },
      }),
    });
  });

  describe("constructor", () => {
    it("initializes with correct path to store tasks", () => {
      const scheduler = new TaskScheduler(mockPath);
      expect(scheduler.tasksPath).toBe(mockPath);
      expect(mockReadline.createInterface).toHaveBeenCalled();
      expect(mockCreateObjectCsvWriter).toHaveBeenCalledWith({
        path: mockPath,
        header: [
          { id: "id", title: "ID" },
          { id: "title", title: "Title" },
          { id: "dueDate", title: "Due Date" },
          { id: "completed", title: "Completed" },
        ],
      });
    });
  });

  describe("start", () => {
    it("welcomes user with the menu options", () => {
      const scheduler = new TaskScheduler(mockPath);
      scheduler.start();
      expect(mockCreateInterface.question).toHaveBeenCalledWith(
        expect.stringContaining("Choose an option"),
        expect.any(Function)
      );
    });

    it("closes readline only when user selects exit", () => {
      const scheduler = new TaskScheduler(mockPath);
      mockCreateInterface.question.mockImplementationOnce((_, cb) => cb("2"));
      mockCreateInterface.question.mockImplementationOnce((_, cb) => cb("3"));
      scheduler.start();
      expect(mockCreateInterface.close).toHaveBeenCalled();
    });
  });

  describe("getNextId", () => {
    it("returns the next available ID based on existing tasks", () => {
      const scheduler = new TaskScheduler(mockPath);
      const nextId = scheduler.getNextId();
      expect(nextId).toBe(2);
      expect(fs.createReadStream).toHaveBeenCalledWith(mockPath);
    });
  });

  describe("addTask", () => {
    it("saves a new task with all fields populated", () => {
      const scheduler = new TaskScheduler(mockPath);
      scheduler.addTask();
      expect(mockCreateInterface.question).toHaveBeenCalledTimes(2);
      expect(mockWriteRecords).toHaveBeenCalledWith(
        expect.arrayContaining([
          {
            id: expect.any(Number),
            title: expect.any(String),
            dueDate: expect.any(String),
            completed: false,
          },
        ])
      );
    });
  });
});
