// Necessary Imports, DO NOT REMOVE
const { parse } = require("path");
const { LinkedList } = require("./LinkedList");
const { Student } = require('./Student')
const readline = require('readline');

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save [fileName]: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(' ');

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
        console.log('Adding student...')
        const [name, year, email, specialization] = args; 
        // --------> WRITE YOUR CODE BELOW
        
        // Ensure the input is valid
        const parsedYear = parseInt(year);

        // Validate the inputs and output messages if any are invalid
        if (!name) {
          console.error('Error: Name is required.');
        }
        if (isNaN(parsedYear)) {
          console.error('Error: Year is required and should be a valid number.');
        }
        if (!email ||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          console.error('Error: Email is required and should be a valid email address.');
        }
        if (!specialization) {
          console.error('Error: Specialization is required.');
        }

        // Check if all required fields are provided in the correct order
        if (!name || isNaN(parsedYear) || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !specialization) {         
          console.error('Please provide all required fields in this sequence: name, year, email, specialization.');
          console.error('Example: add JohnDoe 4 jd@gmail.com ComputerScience');
          break;
        }

        // Check if the student already exists by email and display message if it does
        const existingStudent = studentManagementSystem.findStudent(email);
        if (existingStudent !== -1) {
          console.log(`Student with email "${email.toLowerCase()}" already exists.`);
          console.log(existingStudent.getString()); 
          break;
        } 
          
        // Create a new student object with the processed name and specialization
        const student = new Student(name, parsedYear, email, specialization);
        studentManagementSystem.addStudent(student);

        // Display success message and display the updated LinkedList
        console.log(`Student "${name}" added successfully.`);
        console.log(studentManagementSystem.displayStudents());
        
        // --------> WRITE YOUR CODE ABOVE
        break;

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      const [removeEmail] = args;

      // Checking if the email is valid
      if (!removeEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(removeEmail)) {
        console.error('Error: A valid email is required to remove a student.');
        console.error('Example: remove johnndoe@gmail.com');
        break;
      }
      
      // Remove the student by email and print message if it does not exist
      const studentToRemove = studentManagementSystem.findStudent(removeEmail);
      if (studentToRemove !== -1) {
        studentManagementSystem.removeStudent(removeEmail);
        console.log(`Student with email "${removeEmail.toLowerCase()}" is successfully removed.`);
        // Display the updated LinkedList
        console.log('Updated student list:');
        console.log(studentManagementSystem.displayStudents());
      } else {
        console.error(`Student with email "${removeEmail.toLowerCase()}" does not exist.`);
      }
      
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      console.log(studentManagementSystem.displayStudents());
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const [findEmail] = args;

      // Ensure the student's email is provided
      if (!findEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(findEmail)) {
        console.error('Error: A valid email is required to find a student.');
        console.error('Example: find johndoe@gmail.com');
        break;
      }

      // Find the student by email
      const foundStudent = studentManagementSystem.findStudent(findEmail);

      // Display the result
      if (foundStudent !== -1) {
        console.log(foundStudent.getString());
      } else {
        console.error('Student not found.');
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      const [saveFileName] = args;

      // Ensure the filename has a .json extension if it's not already included
      let jsonFileName = saveFileName;
      if (!jsonFileName.endsWith('.json')) {
        jsonFileName += '.json'; 
      }

      // Save the LinkedList to a JSON file
      try {
        await studentManagementSystem.saveToJson(jsonFileName);
        console.log(`Data saved to file: "${jsonFileName}".`);
      } catch (error) {
        console.error('Error saving data:', error.message);
      }
      break;
      // --------> WRITE YOUR CODE ABOVE

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log('Loading data...')
      // --------> WRITE YOUR CODE BELOW
      const [loadFileName] = args;

      // Load the LinkedList from a JSON file
      try {
        await studentManagementSystem.loadFromJSON(loadFileName);
        // If the file is loaded successfully, output the updated list.
        console.log(`Data loaded from file: "${loadFileName}".`);
        console.log('Updated student list:');
        console.log(studentManagementSystem.displayStudents()); 
      } catch (error) {
        console.error('Error loading data:', error.message);
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents(); 
      console.log('All students in the list have been cleared.');
      // --------> WRITE YOUR CODE ABOVE
      break;

    case 'q':
        console.log('Exiting...');
        rl.close();
        break;

    default:
        console.log('Unknown command. Type "help" for a list of commands.');
        break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!');
main();
rl.on('line', async (input) => {
  if (input.trim().toLowerCase() === 'help') {
    main();
  } else {
      await handleCommand(input);
  }
});
rl.on('close', () => {
  console.log('Goodbye!');
});
