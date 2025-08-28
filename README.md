# Personal Task Scheduler

A robust and extensible **Task Scheduler** library written in TypeScript for Node.js.  
This project demonstrates clean code practices, modular design, and test-driven development (TDD) principles.

## Features

- **Task Management:** Create, update, delete, and list tasks.
- **Due Dates & Priorities:** Assign deadlines and priorities to tasks.
- **Recurring Tasks:** Support for daily, weekly, and monthly recurrence.
- **Persistence:** Tasks are saved and loaded from a simple CSV file (`tasks.csv`).
- **Overdue Detection:** Easily filter and display overdue tasks.
- **Extensible API:** The library can be integrated into other Node.js applications.
- **Example Driver:** The `driver.ts` script demonstrates usage of the API.

## Project Structure

```
.
├── driver.ts                # Example usage of the TaskScheduler library
├── index.ts                 # Entry point/export for the TaskScheduler
├── jest.config.js           # Jest configuration for testing
├── package-lock.json        # NPM lock file
├── package.json             # NPM package file
├── README.md                # This documentation
├── tasks.csv                # Persistent storage for tasks
├── TaskScheduler.test.ts    # Test suite (TDD)
├── TaskScheduler.ts         # Main library implementation
└── tsconfig.json            # TypeScript configuration
```

## Usage

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the example driver**

   ```bash
   npm run build      # Or tsc
   npm run start
   ```

3. **Run the tests**
   ```bash
   npm test
   ```

## Test-Driven Development (TDD)

This project was built using **TDD**:

- All core functionality was specified via tests in `TaskScheduler.test.ts` before implementation.
- Unit tests cover task creation, updates, deletion, recurrence, and persistence.
- The approach ensures reliability, maintainability, and ease of future extension.

## Extending

You can use the `TaskScheduler` library in your own projects by importing it from `index.ts`.  
See `driver.ts` for usage examples.

---

**Author:** [@jpdeburgo](https://github.com/jpdeburgo)

**License:** MIT (or your preferred license)
