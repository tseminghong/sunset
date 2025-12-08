package com.sunset.ictstudy.data

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.Code
import androidx.compose.material.icons.rounded.DataObject
import androidx.compose.material.icons.rounded.Functions
import androidx.compose.material.icons.rounded.IntegrationInstructions
import androidx.compose.material.icons.rounded.Memory
import androidx.compose.material.icons.rounded.Psychology
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector

/** Data model for Python programming topics. */
data class PythonTopic(
    val id: String,
    val title: String,
    val description: String,
    val progressPercent: Int,
    val isCompleted: Boolean,
    val accent: Color,
    val icon: ImageVector,
    val detail: PythonTopicDetail
)

data class PythonTopicDetail(
    val summary: String,
    val definition: String,
    val keyCharacteristics: List<String> = emptyList(),
    val concepts: List<InfoItem> = emptyList(),
    val advantages: List<InfoItem> = emptyList(),
    val challenges: List<InfoItem> = emptyList(),
    val commonApplications: List<String> = emptyList(),
    val codeExamples: List<CodeExample> = emptyList()
)

data class CodeExample(
    val title: String,
    val code: String,
    val explanation: String
)

object PythonRepository {
    val pythonTopics: List<PythonTopic> = listOf(
        PythonTopic(
            id = "python_basics",
            title = "Python Basics",
            description = "Learn Python fundamentals: variables, data types, and basic operations.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF3776AB),
            icon = Icons.Rounded.Code,
            detail = PythonTopicDetail(
                summary = "Master the foundation of Python programming including syntax, variables, and basic data types.",
                definition = "Python is a high-level, interpreted programming language known for its simple syntax and readability. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
                keyCharacteristics = listOf(
                    "Easy to read and write with clean syntax",
                    "Dynamically typed - no need to declare variable types",
                    "Interpreted language with interactive mode",
                    "Extensive standard library and third-party packages"
                ),
                concepts = listOf(
                    InfoItem("Variables", "Containers that store data values without type declaration"),
                    InfoItem("Data Types", "Integers, floats, strings, booleans, lists, dictionaries, tuples"),
                    InfoItem("Operators", "Arithmetic (+, -, *, /), comparison (==, !=, <, >), logical (and, or, not)"),
                    InfoItem("Input/Output", "input() for user input, print() for output")
                ),
                commonApplications = listOf(
                    "Web development with Django and Flask",
                    "Data analysis and visualization",
                    "Machine learning and AI",
                    "Automation and scripting",
                    "Scientific computing"
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "Variables and Data Types",
                        code = """# Variables
name = "Alice"
age = 25
height = 1.75
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Type conversion
age_str = str(age)
num = int("42")""",
                        explanation = "Python variables are created when you assign a value. Type conversion allows converting between different data types."
                    ),
                    CodeExample(
                        title = "Basic Operations",
                        code = """# Arithmetic
result = 10 + 5 * 2  # 20
power = 2 ** 3  # 8
division = 10 / 3  # 3.333...
floor_div = 10 // 3  # 3
modulus = 10 % 3  # 1

# String operations
greeting = "Hello" + " " + "World"
repeated = "Hi" * 3  # "HiHiHi"

# Comparison
is_equal = (5 == 5)  # True
is_greater = (10 > 5)  # True""",
                        explanation = "Python supports standard arithmetic, string concatenation, and comparison operations."
                    )
                ),
                advantages = listOf(
                    InfoItem("Beginner Friendly", "Clean syntax that resembles English", DetailTone.Positive),
                    InfoItem("Versatile", "Used in web dev, data science, AI, automation", DetailTone.Positive),
                    InfoItem("Large Community", "Extensive documentation and support", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Slower Execution", "Interpreted language is slower than compiled languages", DetailTone.Caution),
                    InfoItem("Memory Consumption", "Uses more memory than lower-level languages", DetailTone.Caution)
                )
            )
        ),
        PythonTopic(
            id = "python_control_flow",
            title = "Control Flow",
            description = "Master if statements, loops, and control structures.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFFFD43B),
            icon = Icons.Rounded.Psychology,
            detail = PythonTopicDetail(
                summary = "Learn to control program execution with conditional statements and loops.",
                definition = "Control flow determines the order in which code executes. Python provides if-elif-else for conditions, for and while for loops, and break/continue for loop control.",
                keyCharacteristics = listOf(
                    "Indentation defines code blocks (no braces)",
                    "Multiple conditional branches with elif",
                    "For loops iterate over sequences",
                    "While loops run until condition is False"
                ),
                concepts = listOf(
                    InfoItem("If Statements", "Execute code conditionally based on boolean expressions"),
                    InfoItem("For Loops", "Iterate over sequences (lists, strings, ranges)"),
                    InfoItem("While Loops", "Repeat while condition is True"),
                    InfoItem("Loop Control", "break exits loop, continue skips to next iteration")
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "If-Elif-Else",
                        code = """score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Grade: {grade}")""",
                        explanation = "Conditional statements check multiple conditions in sequence. First true condition executes."
                    ),
                    CodeExample(
                        title = "For Loop",
                        code = """# Iterate over list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Range function
for i in range(5):  # 0 to 4
    print(i)

# Enumerate for index and value
for idx, fruit in enumerate(fruits):
    print(f"{idx}: {fruit}")""",
                        explanation = "For loops iterate over any iterable object. Range creates number sequences."
                    ),
                    CodeExample(
                        title = "While Loop with Break",
                        code = """count = 0
while count < 10:
    if count == 5:
        break  # Exit loop
    print(count)
    count += 1

# While with user input
password = ""
while password != "secret":
    password = input("Enter password: ")""",
                        explanation = "While loops continue until condition becomes False. Break can exit early."
                    )
                ),
                commonApplications = listOf(
                    "Menu-driven programs",
                    "Data validation loops",
                    "Game loops",
                    "Processing collections of data"
                )
            )
        ),
        PythonTopic(
            id = "python_functions",
            title = "Functions & Modules",
            description = "Create reusable code with functions and organize code with modules.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF4B8BBE),
            icon = Icons.Rounded.Functions,
            detail = PythonTopicDetail(
                summary = "Functions encapsulate reusable code. Modules organize related functions and classes.",
                definition = "Functions are named blocks of code that perform specific tasks. Modules are Python files containing functions, classes, and variables that can be imported and reused.",
                keyCharacteristics = listOf(
                    "Functions defined with 'def' keyword",
                    "Can have default parameters and return values",
                    "Modules imported with 'import' statement",
                    "Standard library provides built-in modules"
                ),
                concepts = listOf(
                    InfoItem("Function Definition", "def function_name(parameters): with return statement"),
                    InfoItem("Parameters", "Positional, keyword, default, *args, **kwargs"),
                    InfoItem("Scope", "Local vs global variables, LEGB rule"),
                    InfoItem("Lambda Functions", "Anonymous one-line functions")
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "Function with Parameters",
                        code = """def greet(name, greeting="Hello"):
    \"\"\"Greet someone with custom message\"\"\"
    message = f"{greeting}, {name}!"
    return message

# Function calls
print(greet("Alice"))  # Hello, Alice!
print(greet("Bob", "Hi"))  # Hi, Bob!

# Multiple return values
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

min_val, max_val, total = get_stats([1, 2, 3, 4, 5])""",
                        explanation = "Functions can have default parameters and return multiple values as tuples."
                    ),
                    CodeExample(
                        title = "Using Modules",
                        code = """# Import entire module
import math
print(math.sqrt(16))  # 4.0
print(math.pi)  # 3.14159...

# Import specific functions
from random import randint, choice
num = randint(1, 10)  # Random number
fruit = choice(["apple", "banana"])

# Import with alias
import datetime as dt
now = dt.datetime.now()""",
                        explanation = "Modules provide pre-written functions. Import only what you need or use aliases."
                    )
                ),
                commonApplications = listOf(
                    "Code organization and reusability",
                    "Mathematical computations (math module)",
                    "Date and time operations (datetime module)",
                    "Random number generation (random module)",
                    "File operations (os, pathlib modules)"
                )
            )
        ),
        PythonTopic(
            id = "python_data_structures",
            title = "Data Structures",
            description = "Work with lists, tuples, dictionaries, and sets.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF646464),
            icon = Icons.Rounded.DataObject,
            detail = PythonTopicDetail(
                summary = "Master Python's built-in data structures for organizing and manipulating collections of data.",
                definition = "Data structures are specialized formats for organizing and storing data. Python provides lists (ordered, mutable), tuples (ordered, immutable), dictionaries (key-value pairs), and sets (unique elements).",
                keyCharacteristics = listOf(
                    "Lists: Ordered, mutable, allow duplicates",
                    "Tuples: Ordered, immutable, allow duplicates",
                    "Dictionaries: Unordered key-value pairs, mutable",
                    "Sets: Unordered, unique elements, mutable"
                ),
                concepts = listOf(
                    InfoItem("Lists", "Created with [], support indexing, slicing, methods like append(), extend()"),
                    InfoItem("Tuples", "Created with (), faster than lists, used for fixed collections"),
                    InfoItem("Dictionaries", "Created with {}, access by key, methods like get(), keys(), values()"),
                    InfoItem("Sets", "Created with {}, mathematical operations like union, intersection")
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "Lists Operations",
                        code = """# Creating and modifying lists
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")  # Add item
fruits.insert(1, "mango")  # Insert at index
fruits.remove("banana")  # Remove by value
popped = fruits.pop()  # Remove last item

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]

# Slicing
numbers = [0, 1, 2, 3, 4, 5]
subset = numbers[1:4]  # [1, 2, 3]
reversed_list = numbers[::-1]  # [5, 4, 3, 2, 1, 0]""",
                        explanation = "Lists are versatile with many built-in methods. List comprehensions provide concise syntax."
                    ),
                    CodeExample(
                        title = "Dictionaries",
                        code = """# Creating dictionaries
student = {
    "name": "Alice",
    "age": 20,
    "grade": "A"
}

# Accessing and modifying
print(student["name"])  # Alice
student["age"] = 21  # Update
student["email"] = "alice@example.com"  # Add new

# Safe access with get()
phone = student.get("phone", "Not provided")

# Iterating
for key, value in student.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squared = {x: x**2 for x in range(5)}""",
                        explanation = "Dictionaries store key-value pairs. get() method prevents KeyError for missing keys."
                    ),
                    CodeExample(
                        title = "Sets",
                        code = """# Creating sets
colors = {"red", "green", "blue"}
colors.add("yellow")
colors.remove("red")

# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

union = set1 | set2  # {1, 2, 3, 4, 5, 6}
intersection = set1 & set2  # {3, 4}
difference = set1 - set2  # {1, 2}

# Remove duplicates from list
numbers = [1, 2, 2, 3, 3, 3]
unique = list(set(numbers))  # [1, 2, 3]""",
                        explanation = "Sets automatically handle unique elements and support mathematical set operations."
                    )
                ),
                commonApplications = listOf(
                    "Data storage and manipulation",
                    "Configuration settings (dictionaries)",
                    "Removing duplicates (sets)",
                    "Fixed data that shouldn't change (tuples)",
                    "Complex data filtering (list comprehensions)"
                )
            )
        ),
        PythonTopic(
            id = "python_oop",
            title = "Object-Oriented Programming",
            description = "Learn classes, objects, inheritance, and encapsulation.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFFFD43B),
            icon = Icons.Rounded.IntegrationInstructions,
            detail = PythonTopicDetail(
                summary = "Object-Oriented Programming (OOP) organizes code into reusable classes and objects.",
                definition = "OOP is a programming paradigm based on objects that contain data (attributes) and code (methods). Python supports encapsulation, inheritance, and polymorphism.",
                keyCharacteristics = listOf(
                    "Classes define blueprints for objects",
                    "Objects are instances of classes",
                    "Inheritance allows code reuse",
                    "Encapsulation protects data with private attributes"
                ),
                concepts = listOf(
                    InfoItem("Classes and Objects", "class ClassName: defines class, obj = ClassName() creates object"),
                    InfoItem("__init__ Method", "Constructor that initializes object attributes"),
                    InfoItem("Inheritance", "Child class inherits from parent with class Child(Parent):"),
                    InfoItem("Polymorphism", "Same method name, different implementations in different classes")
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "Class Definition",
                        code = """class Person:
    def __init__(self, name, age):
        self.name = name  # Public attribute
        self.age = age
        self.__id = 12345  # Private attribute
    
    def introduce(self):
        return f"Hi, I'm {self.name}, {self.age} years old"
    
    def birthday(self):
        self.age += 1

# Creating objects
alice = Person("Alice", 25)
print(alice.introduce())  # Hi, I'm Alice, 25 years old
alice.birthday()
print(alice.age)  # 26""",
                        explanation = "Classes bundle data and methods. self refers to the instance. __ prefix makes attributes private."
                    ),
                    CodeExample(
                        title = "Inheritance",
                        code = """class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass  # To be overridden

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Polymorphism in action
animals = [Dog("Buddy"), Cat("Whiskers")]
for animal in animals:
    print(animal.speak())""",
                        explanation = "Child classes inherit from parent and can override methods. Polymorphism allows treating different classes uniformly."
                    )
                ),
                commonApplications = listOf(
                    "Building complex software systems",
                    "Game development (player, enemy, item classes)",
                    "GUI applications (window, button, textbox classes)",
                    "Data modeling (user, product, order classes)"
                )
            )
        ),
        PythonTopic(
            id = "python_file_handling",
            title = "File Handling & Exceptions",
            description = "Read/write files and handle errors gracefully.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF306998),
            icon = Icons.Rounded.Memory,
            detail = PythonTopicDetail(
                summary = "Learn to work with files and handle errors without crashing your program.",
                definition = "File handling allows reading from and writing to files. Exception handling catches and manages errors gracefully using try-except blocks.",
                keyCharacteristics = listOf(
                    "open() function with modes: 'r' (read), 'w' (write), 'a' (append)",
                    "with statement ensures files are properly closed",
                    "try-except blocks catch specific errors",
                    "finally block runs cleanup code"
                ),
                concepts = listOf(
                    InfoItem("File Modes", "r=read, w=write (overwrite), a=append, r+=read/write"),
                    InfoItem("Context Manager", "with open() as f: automatically closes file"),
                    InfoItem("Exception Types", "ValueError, TypeError, FileNotFoundError, ZeroDivisionError"),
                    InfoItem("Custom Exceptions", "class MyError(Exception): for domain-specific errors")
                ),
                codeExamples = listOf(
                    CodeExample(
                        title = "File Operations",
                        code = """# Writing to file
with open("data.txt", "w") as file:
    file.write("Hello World\\n")
    file.write("Python is awesome!\\n")

# Reading entire file
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())

# Appending to file
with open("data.txt", "a") as file:
    file.write("New line\\n")""",
                        explanation = "with statement automatically closes files. Different modes control read/write/append behavior."
                    ),
                    CodeExample(
                        title = "Exception Handling",
                        code = """# Basic try-except
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("Invalid input! Please enter a number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    print("Cleanup code runs always")

# Raising exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age""",
                        explanation = "try-except catches specific errors. finally runs cleanup. raise creates exceptions."
                    )
                ),
                commonApplications = listOf(
                    "Reading configuration files",
                    "Data processing from CSV/JSON files",
                    "Logging application events",
                    "User input validation",
                    "Network error handling"
                )
            )
        )
    )
}
