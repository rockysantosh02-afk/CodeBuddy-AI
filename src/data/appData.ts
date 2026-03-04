export const LANGUAGES = [
  { id: "c", name: "C", color: "#3b82f6", icon: "⚙️", border: "border-blue-500" },
  { id: "cpp", name: "C++", color: "#a855f7", icon: "🔷", border: "border-purple-500" },
  { id: "java", name: "Java", color: "#f59e0b", icon: "☕", border: "border-yellow-500" },
  { id: "python", name: "Python", color: "#eab308", icon: "🐍", border: "border-yellow-400" },
  { id: "html", name: "HTML", color: "#ef4444", icon: "🌐", border: "border-red-500" },
  { id: "css", name: "CSS", color: "#22c55e", icon: "🎨", border: "border-green-500" },
  { id: "javascript", name: "JavaScript", color: "#f97316", icon: "⚡", border: "border-orange-500" },
  { id: "sql", name: "SQL", color: "#ec4899", icon: "🗄️", border: "border-pink-500" },
];

export const LEARNING_DATA: Record<string, {
  topics: Array<{
    name: string;
    concepts: string[];
    sampleCode: string;
    explanation: string;
    logic: string;
  }>
}> = {
  c: {
    topics: [
      {
        name: "Introduction to C",
        concepts: ["History of C", "Structure of C Program", "Compilation Process", "Hello World"],
        sampleCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
        explanation: "C is a general-purpose procedural programming language developed by Dennis Ritchie at Bell Labs in 1972.",
        logic: "Every C program starts with main(). The #include directive includes header files. printf() outputs text to the console."
      },
      {
        name: "Variables & Data Types",
        concepts: ["int", "float", "char", "double", "Declaring Variables", "sizeof operator"],
        sampleCode: `#include <stdio.h>\n\nint main() {\n    int age = 20;\n    float gpa = 9.5;\n    char grade = 'A';\n    printf("Age: %d, GPA: %.1f, Grade: %c\\n", age, gpa, grade);\n    return 0;\n}`,
        explanation: "Variables store data values. Each variable has a data type that determines what kind of data it holds.",
        logic: "int stores integers, float stores decimals, char stores single characters. Format specifiers (%d, %f, %c) are used in printf."
      },
      {
        name: "Control Flow",
        concepts: ["if-else", "switch-case", "for loop", "while loop", "do-while", "break/continue"],
        sampleCode: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0)\n            printf("%d is even\\n", i);\n        else\n            printf("%d is odd\\n", i);\n    }\n    return 0;\n}`,
        explanation: "Control flow statements control the execution order of your program.",
        logic: "The for loop runs from 1 to 5. The if-else checks if a number is divisible by 2 to determine if it's even or odd."
      },
      {
        name: "Functions",
        concepts: ["Function Declaration", "Function Definition", "Parameters", "Return Types", "Recursion"],
        sampleCode: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("Sum: %d\\n", add(3, 4));\n    printf("5! = %d\\n", factorial(5));\n    return 0;\n}`,
        explanation: "Functions are reusable blocks of code that perform a specific task.",
        logic: "Functions break code into smaller pieces. Recursive functions call themselves with a smaller input until they reach a base case."
      },
      {
        name: "Arrays & Strings",
        concepts: ["Array Declaration", "Array Indexing", "Multi-dimensional Arrays", "String Functions", "strlen/strcpy/strcmp"],
        sampleCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    int arr[] = {1, 2, 3, 4, 5};\n    char name[] = "CodeBuddy";\n    printf("Array[2] = %d\\n", arr[2]);\n    printf("Length: %lu\\n", strlen(name));\n    return 0;\n}`,
        explanation: "Arrays store multiple values of the same type. Strings are arrays of characters.",
        logic: "Arrays use zero-based indexing. strlen() returns the length of a string. String functions are in <string.h>."
      },
      {
        name: "Pointers",
        concepts: ["Pointer Declaration", "Address Operator &", "Dereference Operator *", "Pointer Arithmetic", "NULL Pointer"],
        sampleCode: `#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n    printf("Value: %d\\n", *ptr);\n    printf("Address: %p\\n", (void*)ptr);\n    *ptr = 20;\n    printf("New Value: %d\\n", x);\n    return 0;\n}`,
        explanation: "Pointers store memory addresses. They are one of C's most powerful features.",
        logic: "& gives the address of a variable. * dereferences a pointer to get its value. Changing *ptr changes the original variable."
      },
    ]
  },
  python: {
    topics: [
      {
        name: "Python Basics",
        concepts: ["Print Statement", "Comments", "Indentation", "Python Shell", "Variables"],
        sampleCode: `# Python is easy to learn!\nname = "CodeBuddy"\nage = 1\nprint(f"Hello from {name}!")\nprint(f"Age: {age} year old")`,
        explanation: "Python is a high-level, interpreted programming language known for its simple and readable syntax.",
        logic: "Python uses indentation instead of braces. f-strings allow embedding variables directly in strings."
      },
      {
        name: "Data Types",
        concepts: ["int", "float", "str", "bool", "list", "tuple", "dict", "set", "type()"],
        sampleCode: `x = 42          # int\ny = 3.14         # float\nname = "Python"  # str\nis_fun = True    # bool\nlst = [1,2,3]    # list\ntpl = (1,2,3)    # tuple\ndct = {"a": 1}  # dict\nprint(type(x), type(name))`,
        explanation: "Python has dynamic typing — you don't need to declare the type of a variable.",
        logic: "Python automatically determines the data type. type() tells you what type a variable is."
      },
      {
        name: "Control Flow",
        concepts: ["if/elif/else", "for loop", "while loop", "range()", "break/continue/pass"],
        sampleCode: `for i in range(1, 6):\n    if i % 2 == 0:\n        print(f"{i} is even")\n    else:\n        print(f"{i} is odd")`,
        explanation: "Python control flow is clean and readable with consistent indentation.",
        logic: "range(1,6) generates numbers 1-5. for loop iterates over each. if/else checks the condition."
      },
      {
        name: "Functions",
        concepts: ["def keyword", "Parameters", "Default Arguments", "Return Values", "Lambda", "*args/**kwargs"],
        sampleCode: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nsquare = lambda x: x ** 2\n\nprint(greet("B.Tech Student"))\nprint(greet("Coder", "Hi"))\nprint(square(5))`,
        explanation: "Functions in Python are defined with the def keyword and can have default parameter values.",
        logic: "Default arguments allow calling functions with fewer arguments. Lambda creates small anonymous functions."
      },
      {
        name: "Lists & Dictionaries",
        concepts: ["List Methods", "append/remove/sort", "List Comprehension", "Dict Methods", "keys/values/items"],
        sampleCode: `fruits = ["apple", "banana", "cherry"]\nfruits.append("mango")\nprint(fruits)\n\nsquares = [x**2 for x in range(5)]\nprint(squares)\n\nstudent = {"name": "Rocky", "gpa": 9.2}\nfor key, val in student.items():\n    print(f"{key}: {val}")`,
        explanation: "Lists and dictionaries are the most used data structures in Python.",
        logic: "List comprehensions create lists in one line. .items() returns key-value pairs from a dictionary."
      },
      {
        name: "OOP in Python",
        concepts: ["class", "__init__", "self", "Inheritance", "Polymorphism", "Encapsulation"],
        sampleCode: `class Student:\n    def __init__(self, name, gpa):\n        self.name = name\n        self.gpa = gpa\n    def info(self):\n        return f"{self.name} - GPA: {self.gpa}"\n\nclass BTechStudent(Student):\n    def __init__(self, name, gpa, year):\n        super().__init__(name, gpa)\n        self.year = year\n\ns = BTechStudent("Rocky", 9.2, 1)\nprint(s.info())`,
        explanation: "OOP organizes code into objects that combine data and behavior.",
        logic: "__init__ is the constructor. self refers to the current object. super() calls the parent class constructor."
      },
    ]
  },
  java: {
    topics: [
      {
        name: "Java Basics",
        concepts: ["JVM", "JDK vs JRE", "main method", "System.out.println", "Comments"],
        sampleCode: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeBuddy!");\n        System.out.println("Welcome to Java!");\n    }\n}`,
        explanation: "Java is a class-based, object-oriented programming language designed to be platform-independent.",
        logic: "Every Java program needs a class. The main method is the entry point. System.out.println prints with a newline."
      },
      {
        name: "Variables & Types",
        concepts: ["Primitive Types", "int/double/char/boolean", "String", "Type Casting", "Final keyword"],
        sampleCode: `public class Variables {\n    public static void main(String[] args) {\n        int age = 20;\n        double gpa = 9.5;\n        char grade = 'A';\n        boolean isPassed = true;\n        String name = "B.Tech Fresher";\n        System.out.printf("Name: %s, Age: %d%n", name, age);\n    }\n}`,
        explanation: "Java is statically typed — you must declare the type of every variable.",
        logic: "Java has 8 primitive types. String is a class, not a primitive. printf uses format specifiers like C."
      },
      {
        name: "OOP Concepts",
        concepts: ["Classes & Objects", "Constructors", "Inheritance", "Polymorphism", "Abstraction", "Encapsulation"],
        sampleCode: `class Animal {\n    String name;\n    Animal(String name) { this.name = name; }\n    void speak() { System.out.println(name + " makes a sound"); }\n}\n\nclass Dog extends Animal {\n    Dog(String name) { super(name); }\n    @Override\n    void speak() { System.out.println(name + " barks!"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog("Rex");\n        a.speak(); // Polymorphism\n    }\n}`,
        explanation: "OOP is the heart of Java. Everything is an object (except primitives).",
        logic: "Inheritance uses extends. @Override marks overridden methods. Polymorphism lets a parent reference hold a child object."
      },
    ]
  },
  javascript: {
    topics: [
      {
        name: "JS Basics",
        concepts: ["let/const/var", "console.log", "Data Types", "Template Literals", "typeof"],
        sampleCode: `const name = "CodeBuddy";\nlet age = 1;\nconsole.log(\`Hello from \${name}!\`);\nconsole.log(typeof name); // string\nconsole.log(typeof age);  // number`,
        explanation: "JavaScript is the language of the web, running in browsers and on servers (Node.js).",
        logic: "const for immutable, let for mutable variables. Template literals use backticks and ${} for interpolation."
      },
      {
        name: "Functions & Arrow Functions",
        concepts: ["function declaration", "arrow functions", "callbacks", "default params", "rest params"],
        sampleCode: `// Traditional function\nfunction add(a, b) { return a + b; }\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\n// With default params\nconst greet = (name = "World") => \`Hello, \${name}!\`;\n\nconsole.log(add(3, 4));\nconsole.log(multiply(3, 4));\nconsole.log(greet("B.Tech"));`,
        explanation: "Arrow functions are a shorter syntax introduced in ES6.",
        logic: "Arrow functions implicitly return when the body is a single expression. They also don't have their own 'this'."
      },
      {
        name: "Arrays & Objects",
        concepts: ["Array methods", "map/filter/reduce", "Object destructuring", "Spread operator", "JSON"],
        sampleCode: `const nums = [1, 2, 3, 4, 5];\nconst evens = nums.filter(n => n % 2 === 0);\nconst doubled = nums.map(n => n * 2);\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(evens, doubled, sum);\n\nconst { name, age } = { name: "Rocky", age: 20 };\nconsole.log(name, age);`,
        explanation: "Modern JavaScript arrays have powerful built-in methods for functional programming.",
        logic: "filter returns matching elements, map transforms each element, reduce aggregates all elements into one value."
      },
    ]
  },
  html: {
    topics: [
      {
        name: "HTML Structure",
        concepts: ["DOCTYPE", "html/head/body", "Headings", "Paragraphs", "Links", "Images"],
        sampleCode: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Welcome to CodeBuddy</h1>\n  <p>Learn web development step by step!</p>\n  <a href="https://example.com">Click here</a>\n</body>\n</html>`,
        explanation: "HTML (HyperText Markup Language) is the standard language for creating web pages.",
        logic: "HTML uses tags to structure content. The DOCTYPE declaration tells browsers this is HTML5."
      },
      {
        name: "HTML Forms",
        concepts: ["input types", "form action", "labels", "buttons", "select", "textarea"],
        sampleCode: `<form action="/submit" method="POST">\n  <label>Name: <input type="text" name="name" required></label>\n  <label>Email: <input type="email" name="email"></label>\n  <select name="year">\n    <option>1st Year</option>\n    <option>2nd Year</option>\n  </select>\n  <button type="submit">Submit</button>\n</form>`,
        explanation: "HTML forms collect user input and send it to a server for processing.",
        logic: "Each input has a name attribute used to identify the data. Labels improve accessibility."
      },
    ]
  },
  css: {
    topics: [
      {
        name: "CSS Basics",
        concepts: ["Selectors", "Properties", "Values", "Colors", "Box Model", "Units"],
        sampleCode: `/* CSS Basics */\nbody {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 0;\n  padding: 20px;\n}\n\nh1 {\n  color: #2563EB;\n  font-size: 2rem;\n  text-align: center;\n}\n\n.card {\n  background: white;\n  border-radius: 8px;\n  padding: 16px;\n  box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}`,
        explanation: "CSS (Cascading Style Sheets) styles the HTML content and controls the layout.",
        logic: "Selectors target HTML elements. Properties define what to style. Values set how it looks."
      },
      {
        name: "Flexbox",
        concepts: ["display:flex", "flex-direction", "justify-content", "align-items", "gap", "flex-wrap"],
        sampleCode: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n\n.item {\n  flex: 1;\n  min-width: 200px;\n  background: #2563EB;\n  color: white;\n  padding: 20px;\n  border-radius: 8px;\n}`,
        explanation: "Flexbox is a layout model that makes it easy to align and distribute elements.",
        logic: "justify-content controls horizontal alignment, align-items controls vertical alignment."
      },
    ]
  },
  cpp: {
    topics: [
      {
        name: "C++ Basics",
        concepts: ["cout/cin", "Namespaces", "Headers", "auto keyword", "References"],
        sampleCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "Enter your name: ";\n    cin >> name;\n    cout << "Hello, " << name << "!" << endl;\n    auto x = 42;  // auto type\n    int& ref = x; // reference\n    ref = 100;\n    cout << "x = " << x << endl;\n    return 0;\n}`,
        explanation: "C++ is an extension of C with object-oriented programming features.",
        logic: "cout/cin are C++'s input/output streams. auto lets the compiler infer the type. References are aliases for variables."
      },
      {
        name: "OOP in C++",
        concepts: ["Classes", "Constructor/Destructor", "Inheritance", "Virtual Functions", "Polymorphism", "Templates"],
        sampleCode: `#include <iostream>\nusing namespace std;\n\nclass Shape {\npublic:\n    virtual double area() = 0;  // pure virtual\n    virtual ~Shape() {}\n};\n\nclass Circle : public Shape {\n    double r;\npublic:\n    Circle(double r) : r(r) {}\n    double area() override { return 3.14159 * r * r; }\n};\n\nint main() {\n    Shape* s = new Circle(5);\n    cout << "Area: " << s->area() << endl;\n    delete s;\n    return 0;\n}`,
        explanation: "C++ OOP uses classes with public/private/protected access modifiers.",
        logic: "Pure virtual functions (=0) make a class abstract. Virtual enables runtime polymorphism. override makes intent explicit."
      },
    ]
  },
  sql: {
    topics: [
      {
        name: "SQL Basics",
        concepts: ["SELECT", "FROM", "WHERE", "ORDER BY", "LIMIT", "DISTINCT"],
        sampleCode: `-- Basic SELECT query\nSELECT * FROM students;\n\n-- With conditions\nSELECT name, gpa\nFROM students\nWHERE gpa > 8.0\nORDER BY gpa DESC\nLIMIT 10;\n\n-- Distinct values\nSELECT DISTINCT branch\nFROM students;`,
        explanation: "SQL (Structured Query Language) is used to manage and query relational databases.",
        logic: "SELECT retrieves data, FROM specifies the table, WHERE filters rows, ORDER BY sorts results."
      },
      {
        name: "DDL & DML",
        concepts: ["CREATE TABLE", "INSERT INTO", "UPDATE", "DELETE", "ALTER TABLE", "DROP"],
        sampleCode: `-- Create table\nCREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    gpa DECIMAL(3,1),\n    branch VARCHAR(50)\n);\n\n-- Insert data\nINSERT INTO students VALUES (1, 'Rocky', 9.2, 'CSE');\n\n-- Update\nUPDATE students SET gpa = 9.5 WHERE id = 1;\n\n-- Delete\nDELETE FROM students WHERE gpa < 5.0;`,
        explanation: "DDL (Data Definition Language) defines structure. DML (Data Manipulation Language) manages data.",
        logic: "PRIMARY KEY uniquely identifies each row. VARCHAR stores variable-length strings. DECIMAL stores precise decimal numbers."
      },
    ]
  }
};

export const QUIZ_DATA = {
  mcq: {
    c: {
      easy: [
        { q: "What is the correct syntax to print 'Hello' in C?", options: ["print('Hello')", "echo 'Hello'", "printf(\"Hello\");", "cout << \"Hello\";"], ans: 2, explanation: "printf() is the standard output function in C." },
        { q: "Which header file is needed for printf()?", options: ["<stdlib.h>", "<string.h>", "<stdio.h>", "<math.h>"], ans: 2, explanation: "#include <stdio.h> is required for input/output functions." },
        { q: "What does int store?", options: ["Decimals", "Whole numbers", "Characters", "Strings"], ans: 1, explanation: "int (integer) stores whole numbers like -5, 0, 42." },
        { q: "Which is the correct way to declare a variable in C?", options: ["var x = 5;", "x := 5;", "int x = 5;", "let x = 5;"], ans: 2, explanation: "In C, you must specify the data type before the variable name." },
        { q: "What does return 0 mean in main()?", options: ["Error occurred", "Program ran successfully", "Restart program", "Skip execution"], ans: 1, explanation: "Returning 0 from main() indicates successful program execution." },
        { q: "What symbol is used for single-line comment in C?", options: ["#", "//", "--", "/*"], ans: 1, explanation: "// is used for single-line comments in C." },
        { q: "How do you take integer input in C?", options: ["input()", "read()", "scanf(\"%d\", &n);", "cin >> n;"], ans: 2, explanation: "scanf() reads formatted input. %d is for integers and & gives the address." },
        { q: "What is the size of int on most systems?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], ans: 2, explanation: "int is typically 4 bytes (32 bits) on modern systems." },
        { q: "Which loop checks condition after executing the body?", options: ["for", "while", "do-while", "foreach"], ans: 2, explanation: "do-while executes the body first, then checks the condition." },
        { q: "What is the output of printf(\"%d\", 5+3)?", options: ["5+3", "8", "53", "Error"], ans: 1, explanation: "5+3 is evaluated to 8 first, then printed as an integer." },
      ],
      medium: [
        { q: "What is a pointer in C?", options: ["A variable that stores a value", "A variable that stores a memory address", "A function", "A data type"], ans: 1, explanation: "A pointer stores the memory address of another variable." },
        { q: "What does & operator do in C?", options: ["Bitwise AND", "Logical AND", "Address of operator", "Reference"], ans: 2, explanation: "& gives the memory address of a variable when used as a unary operator." },
        { q: "What is the output of: int a=5; printf(\"%d\", a++);?", options: ["5", "6", "4", "Error"], ans: 0, explanation: "Post-increment (a++) returns the value first, then increments. So 5 is printed." },
        { q: "Which function is used for dynamic memory allocation?", options: ["alloc()", "malloc()", "calloc()", "Both malloc() and calloc()"], ans: 3, explanation: "Both malloc() and calloc() allocate memory dynamically. calloc() also initializes to zero." },
        { q: "What is a segmentation fault?", options: ["Syntax error", "Logic error", "Memory access violation", "Divide by zero"], ans: 2, explanation: "Segmentation fault occurs when a program tries to access memory it doesn't own." },
      ],
      hard: [
        { q: "What is the output: int a[]={1,2,3}; printf(\"%d\", *(a+1));?", options: ["1", "2", "3", "Address"], ans: 1, explanation: "a is a pointer to the first element. a+1 points to index 1 (value 2). *() dereferences it." },
        { q: "What does volatile keyword do?", options: ["Makes variable constant", "Prevents compiler optimization of variable", "Allocates memory dynamically", "Creates pointer"], ans: 1, explanation: "volatile tells the compiler the variable can change unexpectedly, preventing certain optimizations." },
      ]
    },
    python: {
      easy: [
        { q: "How do you print 'Hello' in Python?", options: ["echo 'Hello'", "printf('Hello')", "print('Hello')", "cout << 'Hello'"], ans: 2, explanation: "print() is Python's built-in function to display output." },
        { q: "Which keyword is used to define a function?", options: ["function", "func", "def", "define"], ans: 2, explanation: "def is used to define functions in Python." },
        { q: "What is the correct way to create a list?", options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"], ans: 2, explanation: "Square brackets [] are used to create lists in Python." },
        { q: "What does len() do?", options: ["Returns last element", "Returns length", "Adds element", "Removes element"], ans: 1, explanation: "len() returns the number of elements in a sequence." },
        { q: "How do you start a comment in Python?", options: ["//", "/*", "#", "--"], ans: 2, explanation: "# is used for single-line comments in Python." },
        { q: "What is the output of: print(2**3)?", options: ["6", "8", "9", "23"], ans: 1, explanation: "** is the exponentiation operator. 2**3 = 2×2×2 = 8." },
        { q: "Which of these is a valid variable name?", options: ["2name", "my-var", "my_var", "my var"], ans: 2, explanation: "Variable names can contain letters, numbers (not at start), and underscores." },
        { q: "What type is True in Python?", options: ["int", "str", "bool", "float"], ans: 2, explanation: "True and False are boolean literals in Python." },
        { q: "How do you get input from user?", options: ["scanf()", "readline()", "input()", "read()"], ans: 2, explanation: "input() reads a line from standard input and returns it as a string." },
        { q: "What does range(5) produce?", options: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0,1,2,3,4,5]", "5"], ans: 1, explanation: "range(5) generates numbers 0 through 4 (5 numbers, starting from 0)." },
      ],
      medium: [
        { q: "What is a list comprehension?", options: ["A way to copy lists", "A concise way to create lists", "A sorting method", "A search function"], ans: 1, explanation: "List comprehensions create lists in a single readable line: [expr for item in iterable]." },
        { q: "What does *args allow?", options: ["Keyword arguments", "Variable number of positional arguments", "Default values", "Type hints"], ans: 1, explanation: "*args collects extra positional arguments into a tuple." },
        { q: "What is the difference between a list and tuple?", options: ["No difference", "Tuples are mutable, lists immutable", "Lists are mutable, tuples immutable", "Lists are ordered, tuples aren't"], ans: 2, explanation: "Lists can be modified (mutable), tuples cannot (immutable)." },
      ],
      hard: [
        { q: "What is a Python decorator?", options: ["A syntax for loops", "A function that modifies another function", "A class method", "A data type"], ans: 1, explanation: "Decorators wrap functions with additional behavior using the @decorator syntax." },
        { q: "What does __init__ do in Python?", options: ["Deletes an object", "Initializes a new object", "Inherits a class", "Imports a module"], ans: 1, explanation: "__init__ is the constructor — it initializes the object's attributes when a new instance is created." },
      ]
    }
  }
};

export const MINDMAP_DATA = {
  c: {
    root: "C Programming",
    color: "#3b82f6",
    categories: [
      { name: "Basics", color: "#3b82f6", concepts: ["Keywords & Identifiers", "Data Types (int, float, char, double)", "Variables & Constants", "Operators", "Input/Output (scanf, printf)", "Comments", "Preprocessor Directives"] },
      { name: "Control Flow", color: "#8b5cf6", concepts: ["if / else if / else", "switch-case", "for loop", "while loop", "do-while loop", "break / continue / goto", "Nested loops"] },
      { name: "Functions", color: "#06b6d4", concepts: ["Function Declaration", "Function Definition", "Pass by Value", "Pass by Reference", "Recursion", "Inline Functions", "Library Functions"] },
      { name: "Arrays & Strings", color: "#10b981", concepts: ["1D Arrays", "2D Arrays", "Multidimensional Arrays", "String Declaration", "String Functions (strlen, strcpy, strcat, strcmp)", "Character Arrays"] },
      { name: "Pointers", color: "#f59e0b", concepts: ["Pointer Declaration", "Address & Dereference Operators", "Pointer Arithmetic", "Pointers & Arrays", "Pointer to Pointer", "NULL Pointer", "Function Pointers"] },
      { name: "Structures & Unions", color: "#ef4444", concepts: ["struct declaration", "Accessing Members", "Nested Structures", "Array of Structures", "union", "typedef", "Bit Fields"] },
      { name: "Memory Management", color: "#ec4899", concepts: ["Stack vs Heap", "malloc()", "calloc()", "realloc()", "free()", "Memory Leaks", "Dynamic Arrays"] },
      { name: "File I/O", color: "#84cc16", concepts: ["fopen/fclose", "fread/fwrite", "fprintf/fscanf", "File Modes (r,w,a)", "fseek/ftell", "EOF handling"] },
    ]
  },
  python: {
    root: "Python",
    color: "#eab308",
    categories: [
      { name: "Basics", color: "#eab308", concepts: ["Print & Input", "Variables (no declaration)", "Indentation rules", "Comments (#)", "Type Casting", "f-strings & format()"] },
      { name: "Data Types", color: "#3b82f6", concepts: ["int, float, complex", "str (immutable)", "bool", "None", "type() function", "isinstance()"] },
      { name: "Data Structures", color: "#8b5cf6", concepts: ["list (mutable, ordered)", "tuple (immutable)", "dict (key-value)", "set (unique)", "frozenset", "List/Dict Comprehensions"] },
      { name: "Control Flow", color: "#10b981", concepts: ["if/elif/else", "for loop + range()", "while loop", "break/continue/pass", "Walrus operator :="] },
      { name: "Functions", color: "#f59e0b", concepts: ["def keyword", "Default Arguments", "*args, **kwargs", "Lambda functions", "map/filter/zip", "Decorators (@)"] },
      { name: "OOP", color: "#ef4444", concepts: ["class definition", "__init__ constructor", "self parameter", "Inheritance (extends)", "super()", "Dunder Methods", "Abstract Classes"] },
      { name: "Modules & Packages", color: "#06b6d4", concepts: ["import statement", "from...import", "Built-in modules (os, sys, math)", "pip install", "__name__ == '__main__'"] },
      { name: "Exception Handling", color: "#ec4899", concepts: ["try/except/finally", "raise statement", "Custom Exceptions", "Exception hierarchy", "with statement (context manager)"] },
    ]
  },
  java: {
    root: "Java",
    color: "#f59e0b",
    categories: [
      { name: "Basics", color: "#f59e0b", concepts: ["JVM / JDK / JRE", "public static void main", "System.out.println", "Primitive Types", "Wrapper Classes", "String class"] },
      { name: "OOP", color: "#8b5cf6", concepts: ["class & object", "Constructors", "this keyword", "Inheritance (extends)", "super keyword", "Abstract classes", "Interfaces"] },
      { name: "Pillars of OOP", color: "#3b82f6", concepts: ["Encapsulation (getters/setters)", "Inheritance (IS-A)", "Polymorphism (overloading/overriding)", "Abstraction (abstract/interface)"] },
      { name: "Collections", color: "#10b981", concepts: ["ArrayList", "LinkedList", "HashMap", "HashSet", "Stack & Queue", "Iterator", "Collections class"] },
      { name: "Exception Handling", color: "#ef4444", concepts: ["try-catch-finally", "throw / throws", "Checked vs Unchecked", "Custom Exceptions", "Multi-catch"] },
      { name: "Multithreading", color: "#ec4899", concepts: ["Thread class", "Runnable interface", "sleep/join/wait", "Synchronization", "volatile & atomic"] },
    ]
  },
  javascript: {
    root: "JavaScript",
    color: "#f97316",
    categories: [
      { name: "Basics", color: "#f97316", concepts: ["var / let / const", "Data Types (7 types)", "typeof operator", "Template Literals", "Destructuring", "Spread/Rest operators"] },
      { name: "Functions", color: "#8b5cf6", concepts: ["Function Declaration", "Function Expression", "Arrow Functions =>", "Callbacks", "Default Parameters", "IIFE"] },
      { name: "Arrays", color: "#3b82f6", concepts: ["map()", "filter()", "reduce()", "forEach()", "find/findIndex", "flat/flatMap", "Array Destructuring"] },
      { name: "Objects", color: "#10b981", concepts: ["Object literals", "Property Shorthand", "Computed Properties", "Object methods", "Prototype chain", "Object.keys/values/entries"] },
      { name: "Async JS", color: "#ef4444", concepts: ["Callbacks", "Promises (.then/.catch)", "async/await", "Promise.all/race", "Event Loop", "Microtask Queue"] },
      { name: "DOM", color: "#eab308", concepts: ["getElementById/querySelector", "innerHTML/textContent", "addEventListener", "classList", "createElement/appendChild", "Event Bubbling"] },
      { name: "ES6+ Features", color: "#ec4899", concepts: ["Classes", "Modules (import/export)", "Symbol", "WeakMap/WeakSet", "Optional Chaining ?.", "Nullish Coalescing ??"] },
    ]
  },
  html: {
    root: "HTML",
    color: "#ef4444",
    categories: [
      { name: "Structure", color: "#ef4444", concepts: ["DOCTYPE declaration", "html/head/body", "meta tags", "title", "link/script", "Semantic HTML5"] },
      { name: "Text Elements", color: "#3b82f6", concepts: ["h1-h6 headings", "p paragraph", "span/div", "strong/em/b/i", "br/hr", "blockquote/code/pre"] },
      { name: "Links & Media", color: "#8b5cf6", concepts: ["<a href>", "target attribute", "<img src alt>", "<video>/<audio>", "Responsive images", "Lazy loading"] },
      { name: "Lists & Tables", color: "#10b981", concepts: ["ul/ol/li", "dl/dt/dd", "table/tr/td/th", "colspan/rowspan", "caption", "thead/tbody/tfoot"] },
      { name: "Forms", color: "#f59e0b", concepts: ["form action/method", "input types (20+)", "label for", "select/option", "textarea", "button types", "Validation attributes"] },
      { name: "Semantic HTML5", color: "#ec4899", concepts: ["header/nav/main", "section/article/aside", "footer", "figure/figcaption", "details/summary", "time/mark/progress"] },
    ]
  },
  css: {
    root: "CSS",
    color: "#22c55e",
    categories: [
      { name: "Selectors", color: "#22c55e", concepts: ["Element/Class/ID", "Attribute selectors", "Pseudo-classes (:hover, :nth-child)", "Pseudo-elements (::before, ::after)", "Combinators (>, +, ~)", "Specificity"] },
      { name: "Box Model", color: "#3b82f6", concepts: ["content", "padding", "border", "margin", "box-sizing", "overflow", "display values"] },
      { name: "Typography", color: "#8b5cf6", concepts: ["font-family/size/weight", "line-height/letter-spacing", "text-align/decoration", "Google Fonts", "@font-face", "CSS Variables (--custom-prop)"] },
      { name: "Layout", color: "#f59e0b", concepts: ["Flexbox", "CSS Grid", "position (static/relative/absolute/fixed/sticky)", "z-index", "float/clear (legacy)"] },
      { name: "Flexbox", color: "#06b6d4", concepts: ["display:flex", "flex-direction", "justify-content", "align-items/align-content", "flex-wrap", "order/flex-grow/flex-shrink"] },
      { name: "Grid", color: "#ef4444", concepts: ["display:grid", "grid-template-columns/rows", "gap", "grid-area", "auto-fill/auto-fit", "minmax()"] },
      { name: "Responsive Design", color: "#ec4899", concepts: ["Media Queries @media", "Mobile-first approach", "viewport units (vw/vh)", "clamp()", "CSS Container Queries"] },
      { name: "Animations", color: "#84cc16", concepts: ["transition property", "transform (scale/rotate/translate)", "@keyframes", "animation shorthand", "will-change", "prefers-reduced-motion"] },
    ]
  },
  cpp: {
    root: "C++",
    color: "#a855f7",
    categories: [
      { name: "Basics", color: "#a855f7", concepts: ["cin/cout", "Namespaces", "References (&)", "auto keyword", "nullptr", "Range-based for loop"] },
      { name: "OOP", color: "#3b82f6", concepts: ["Classes & Objects", "Constructors & Destructors", "this pointer", "Static members", "friend functions", "Operator Overloading"] },
      { name: "Inheritance", color: "#10b981", concepts: ["public/protected/private", "Single/Multiple/Multilevel", "Virtual functions", "Pure virtual (abstract)", "vtable", "override/final"] },
      { name: "Templates", color: "#f59e0b", concepts: ["Function Templates", "Class Templates", "Template Specialization", "variadic templates", "SFINAE"] },
      { name: "STL", color: "#ef4444", concepts: ["vector", "list/deque", "map/unordered_map", "set/multiset", "stack/queue/priority_queue", "Iterators", "Algorithms (sort, find, binary_search)"] },
      { name: "Memory", color: "#ec4899", concepts: ["new/delete", "Smart Pointers (unique_ptr, shared_ptr)", "RAII", "Move Semantics", "Rule of Three/Five"] },
    ]
  },
  sql: {
    root: "SQL",
    color: "#ec4899",
    categories: [
      { name: "DML", color: "#ec4899", concepts: ["SELECT (basic queries)", "INSERT INTO", "UPDATE SET", "DELETE FROM", "MERGE", "TRUNCATE"] },
      { name: "DDL", color: "#3b82f6", concepts: ["CREATE TABLE", "ALTER TABLE", "DROP TABLE", "CREATE INDEX", "CREATE VIEW", "Constraints (PK, FK, UNIQUE, NOT NULL, CHECK)"] },
      { name: "Queries", color: "#8b5cf6", concepts: ["WHERE clause", "ORDER BY ASC/DESC", "GROUP BY + HAVING", "LIMIT/OFFSET", "DISTINCT", "CASE WHEN"] },
      { name: "Joins", color: "#10b981", concepts: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN", "CROSS JOIN", "Self Join", "JOIN on multiple conditions"] },
      { name: "Functions", color: "#f59e0b", concepts: ["Aggregate (COUNT, SUM, AVG, MAX, MIN)", "String (CONCAT, LENGTH, UPPER, LOWER, TRIM)", "Date (NOW, DATEADD, DATEDIFF)", "Window Functions (ROW_NUMBER, RANK, LEAD/LAG)"] },
      { name: "Subqueries", color: "#ef4444", concepts: ["Scalar Subquery", "Correlated Subquery", "IN/EXISTS/ANY/ALL", "CTE (WITH clause)", "Derived Tables"] },
    ]
  }
};
