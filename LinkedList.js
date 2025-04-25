// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    // Initialize an empty LinkedList
    this.head = null; 
    this.tail = null; 
    this.length = 0;  
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    // Create a new Node for the new student
    const newNode = new Node(newStudent);

    // If the list is empty, set the new node as both the head and tail
    if (this.length === 0) {
      this.head = newNode; 
      this.tail = newNode; 
    } else {
      // If the list is not empty, add the new node to the end of the list
      this.tail.next = newNode; 
      this.tail = newNode;      
    }

    // Increment the list length
    this.length++;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    // If the list is empty, print a message and exit the function
    if (!this.head) {
      console.log("The list is empty, no student to remove.");
      return; 
    }

    // Check if the student to remove is the head (first node) (case-insensitive)
    if (this.head.data.getEmail().toLowerCase() === email.toLowerCase()) {
      this.head = this.head.next; 

      // If there are no students left, set the tail to null
      if (!this.head) {
        this.tail = null; 
      }

      this.length--; // Decrease the length of the list 
      return; // Exit the function since the student has been removed
    }

    // If the student to remove is not the head, traverse the list to find it (case-insensitive)
    let current = this.head; 
    while (current.next) {
      if (current.next.data.getEmail().toLowerCase() === email.toLowerCase()) {
        current.next = current.next.next; // Skip the node to remove it

        // If we removed the last student, update the tail to the current node
        if (!current.next) {
          this.tail = current;
        }

        this.length--; // Decrease the length of the list 
        return; // Exit the function since the student has been removed
      }

      current = current.next; // Move to the next student in the list
    }

    // If the student is not found, print a message
    console.log("Student not found."); 
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    // Traverse the LinkedList to find the student by email (case-insensitive)
    let current = this.head;
    while (current) {
      if (current.data.getEmail().toLowerCase() === email.toLowerCase()) {
        return current.data; // Return the student's details if found
      }
      current = current.next; // Move to the next node
    }
    return -1; // Return -1 if not found
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   Noneq
   */
  clearStudents() {
    // TODO
    // Clear the LinkedList by resetting head, tail, and length
    this.head = null; 
    this.tail = null; 
    this.length = 0;  
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    // Return a message if the list is empty
    if (!this.head) {
      return "The students' list is empty.";
    }


    let result = '';
    let current = this.head; // Start from the head of the list

    // Traverse the LinkedList and append student names to the result string
    while (current) {
      result += current.data.getName();
      if (current.next) {
        result += ', '; // Add separator if there's another student
      }
      current = current.next; // Move to the next node
    }

    return result; // Return the final string of student names
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    // Convert LinkedList to an array
    const students = [];
    let current = this.head;

    // Traverse the LinkedList and add each student to the array
    while (current) {
      students.push(current.data); 
      current = current.next; 
    }

    // Sort the array alphabetically by student name
    students.sort((a, b) => a.getName().toLowerCase().localeCompare(b.getName().toLowerCase()));

    // Rebuild LinkedList in sorted order
    this.clearStudents(); // Clear the current LinkedList
    for (const student of students) {
      this.addStudent(student); // Add each student back in sorted order
    }

    return students; // Return the sorted array of students
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    // Filter students by specialization
    const filtered = [];
    let current = this.head;

    // Traverse the LinkedList to find students with the matching specialization (case-insensitive)
    while (current) {
      if (current.data.getSpecialization().toLowerCase() === specialization.toLowerCase()) {
        filtered.push(current.data); // Add matching student to the filtered list
      }
      current = current.next; // Move to the next node
    }

    // Sort the filtered students alphabetically by name (case-insensitive)
    filtered.sort((a, b) => {
      return a.getName().toLowerCase().localeCompare(b.getName().toLowerCase());
    });

    return filtered; // Return the sorted filtered array
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    // Filter students by minimum year
    const filtered = [];
    let current = this.head;
    while (current) {
      if (current.data.getYear() >= minYear) {
        filtered.push(current.data); // Add student if meets minimum year
      }
      current = current.next; // Move to the next node
    }

    // Sort the filtered students alphabetically by name (case-insensitive)
    filtered.sort((a, b) => {
      return a.getName().toLowerCase().localeCompare(b.getName().toLowerCase());
    });

    return filtered; // Return sorted filtered array
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    // Convert the list to an array of the student objects
    const students = [];
    let current = this.head;

    while (current) {
      const student = {
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      };
      students.push(student);
      current = current.next;
    }

    // Import fs/promises within the function.
    const fs = require('fs').promises;

    // Write array to a JSON file.
    await fs.writeFile(fileName, JSON.stringify(students, null, 2));
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO

    // Import fs/promises within the function.
    const fs = require('fs/promises');

    try {
     // Read the file and parse the JSON.
      const data = await fs.readFile(fileName, 'utf-8');
      const students = JSON.parse(data);
      
       // If file is empty or contains invalid data, handle it
      if (!students || students.length === 0) {
        throw new Error(`The file "${fileName}" contains no data.`);
      }
      
      this.clearStudents(); // Clear the existing LinkedList
      
      // Add each student to the list.
      for (const student of students) {
        const newStudent = new Student(student.name, student.year, student.email, student.specialization);
        this.addStudent(newStudent); 
      }

    } catch (error) {
      // Handle errors properly if the file doesn't exist
      if (error.code === 'ENOENT') {
        throw new Error(`Error: The file "${jsonFileName}" does not exist.`); 
      } else {
        throw new Error('Error loading data from JSON file:', error); 
      }
    }
  }
}

module.exports = { LinkedList }

