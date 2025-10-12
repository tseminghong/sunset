# Quick Reference: Adding Interactive Elements

## 🎯 Quick Syntax Guide

### In Lesson Content (Markdown)

```markdown
# Main Heading
Regular paragraph text here.

## Section Heading
More text with **bold** and `inline code`.

[TIP] Helpful tip for students!

[WARNING] Important warning about common mistakes!

[INFO] Interesting additional context!

### Subsection
- Bullet point one
- Bullet point two
- Bullet point three

**Algorithm Steps:**
1. First step
2. Second step  
3. Third step

```python
# Code blocks are automatically styled
def example():
    return "Hello World"
```
```

### In Lesson Data Model (Kotlin)

```kotlin
Lesson(
    id = "lesson-id",
    title = "Lesson Title",
    description = "Short description",
    content = """
        # Your Content Here
        
        Use markdown formatting...
        
        [TIP] Add tips inline!
    """,
    duration = "30 min",
    isCompleted = false,
    order = 1,
    quiz = Quiz(
        question = "What is...?",
        options = listOf("A", "B", "C", "D"),
        correctAnswer = 2, // Index 0-3
        explanation = "Because..."
    )
)
```

## 📝 Examples by Subject

### Python/Algorithm Lessons

```kotlin
Lesson(
    id = "py-merge-sort",
    title = "Merge Sort",
    description = "Divide and conquer sorting algorithm",
    content = """
# Merge Sort

Merge sort divides the array into halves, sorts them recursively, then merges.

[TIP] Merge sort is stable - it preserves the relative order of equal elements!

**Algorithm:**
1. Divide array into two halves
2. Recursively sort each half
3. Merge the sorted halves

[WARNING] Merge sort requires O(n) extra space for the merge operation.

**Time Complexity:** O(n log n) in all cases

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

[INFO] Merge sort was invented by John von Neumann in 1945!
    """,
    duration = "50 min",
    isCompleted = false,
    order = 4,
    quiz = Quiz(
        question = "What is the space complexity of Merge Sort?",
        options = listOf(
            "O(1)",
            "O(log n)",
            "O(n)",
            "O(n log n)"
        ),
        correctAnswer = 2,
        explanation = "Merge sort requires O(n) additional space for temporary arrays during the merge process. This is the main trade-off compared to in-place algorithms like Quick Sort."
    )
)
```

### JavaScript Lessons

```kotlin
Lesson(
    id = "js-async",
    title = "Async/Await",
    description = "Modern asynchronous JavaScript",
    content = """
# Async/Await

Async/await provides a cleaner syntax for working with Promises.

[TIP] Always use try/catch with async/await to handle errors gracefully!

**Basic Syntax:**

```javascript
async function fetchData() {
    try {
        const response = await fetch('api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

**Key Points:**
- `async` functions always return a Promise
- `await` can only be used inside `async` functions
- Error handling with try/catch

[WARNING] Don't forget to handle rejected Promises with try/catch!

[INFO] Async/await was introduced in ES2017 (ES8) as syntactic sugar over Promises.
    """,
    duration = "35 min",
    isCompleted = false,
    order = 8,
    quiz = Quiz(
        question = "What does an async function always return?",
        options = listOf(
            "A value",
            "Nothing (undefined)",
            "A Promise",
            "An error"
        ),
        correctAnswer = 2,
        explanation = "An async function always returns a Promise, even if you return a plain value. The returned value is automatically wrapped in a resolved Promise."
    )
)
```

### SQL Lessons

```kotlin
Lesson(
    id = "sql-joins",
    title = "SQL Joins",
    description = "Combining data from multiple tables",
    content = """
# SQL Joins

Joins combine rows from two or more tables based on related columns.

[TIP] Draw Venn diagrams to visualize different join types!

## Types of Joins

**INNER JOIN**: Returns matching rows
**LEFT JOIN**: All from left + matching from right
**RIGHT JOIN**: All from right + matching from left
**FULL JOIN**: All rows from both tables

**Example:**

```sql
SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.total > 100;
```

[WARNING] Joins without proper indexes can be very slow on large tables!

**Common Pitfalls:**
- Forgetting the ON clause
- Creating Cartesian products (no join condition)
- Not considering NULL values

[INFO] The term "JOIN" comes from relational algebra, introduced by Edgar F. Codd in 1970!
    """,
    duration = "45 min",
    isCompleted = false,
    order = 3,
    quiz = Quiz(
        question = "Which JOIN returns all rows from both tables?",
        options = listOf(
            "INNER JOIN",
            "LEFT JOIN",
            "RIGHT JOIN",
            "FULL OUTER JOIN"
        ),
        correctAnswer = 3,
        explanation = "FULL OUTER JOIN (or FULL JOIN) returns all rows from both tables, with NULL values where there's no match. This is essentially a combination of LEFT JOIN and RIGHT JOIN."
    )
)
```

### HTML/Web Lessons

```kotlin
Lesson(
    id = "html-semantic",
    title = "Semantic HTML",
    description = "Using meaningful HTML elements",
    content = """
# Semantic HTML

Semantic HTML uses elements that clearly describe their meaning to both browsers and developers.

[TIP] Use semantic elements for better SEO and accessibility!

## Common Semantic Elements

**Structure:**
- `<header>` - Page or section header
- `<nav>` - Navigation links
- `<main>` - Main content
- `<article>` - Self-contained content
- `<section>` - Thematic grouping
- `<aside>` - Side content
- `<footer>` - Page or section footer

**Example:**

```html
<article>
    <header>
        <h1>Article Title</h1>
        <time datetime="2024-01-15">January 15, 2024</time>
    </header>
    <section>
        <h2>Introduction</h2>
        <p>Article content here...</p>
    </section>
    <footer>
        <p>Author: John Doe</p>
    </footer>
</article>
```

[WARNING] Don't use `<div>` for everything! Use semantic elements when appropriate.

**Benefits:**
- Better accessibility for screen readers
- Improved SEO
- Clearer code structure
- Easier maintenance

[INFO] The HTML5 specification introduced many semantic elements to replace generic `<div>` elements!
    """,
    duration = "30 min",
    isCompleted = false,
    order = 3,
    quiz = Quiz(
        question = "Which element should contain the main content of your page?",
        options = listOf(
            "<div id='main'>",
            "<section>",
            "<main>",
            "<article>"
        ),
        correctAnswer = 2,
        explanation = "The <main> element should contain the main content of your page. There should only be one <main> element per page, and it shouldn't be nested inside <article>, <aside>, <footer>, <header>, or <nav> elements."
    )
)
```

## 🎨 Visual Element Combinations

### Example: Rich Lesson with Multiple Elements

```kotlin
content = """
# Data Structures: Binary Search Trees

A Binary Search Tree (BST) is a tree data structure where each node has at most two children.

[TIP] BSTs provide O(log n) search time when balanced!

## Properties

1. Left subtree contains only nodes with keys less than parent
2. Right subtree contains only nodes with keys greater than parent
3. Both subtrees are also BSTs

[INFO] The binary search tree property enables efficient searching, insertion, and deletion operations.

## Implementation

```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        if not self.root:
            self.root = Node(value)
        else:
            self._insert_recursive(self.root, value)
```

[WARNING] Without balancing, a BST can degenerate into a linked list with O(n) operations!

## Time Complexity

**Average Case:**
- Search: O(log n)
- Insert: O(log n)
- Delete: O(log n)

**Worst Case (Unbalanced):**
- All operations: O(n)

[TIP] Use AVL or Red-Black trees for guaranteed O(log n) operations!

## Common Operations

1. **Search**: Compare with root, go left or right
2. **Insert**: Find position, add new node
3. **Delete**: Three cases (no children, one child, two children)
4. **Traversal**: Inorder, Preorder, Postorder

[INFO] Self-balancing BSTs like AVL trees rotate nodes to maintain balance after insertions and deletions.
"""
```

## 📋 Checklist for Great Interactive Lessons

### Content Quality
- [ ] Clear heading structure (H1, H2, H3)
- [ ] Concise paragraphs (3-4 sentences max)
- [ ] Code examples with proper syntax
- [ ] Real-world applications mentioned

### Visual Elements
- [ ] At least 1 tip per lesson
- [ ] At least 1 warning about common mistakes
- [ ] 1-2 info boxes for extra context
- [ ] Code blocks with language specified

### Quiz Design
- [ ] Clear, specific question
- [ ] 4 plausible options
- [ ] Correct answer identified
- [ ] Detailed explanation (2-3 sentences)

### Formatting
- [ ] Bold for emphasis: `**important**`
- [ ] Inline code: `` `variable` ``
- [ ] Bullet points for lists
- [ ] Numbers for sequential steps

## 🚀 Pro Tips

### Tip Placement
✅ Place tips right before or after the concept they reference
✅ Use for best practices and optimization techniques
✅ Keep tips positive and actionable

### Warning Placement
✅ Place warnings before code examples that could go wrong
✅ Use for security concerns and performance pitfalls
✅ Make warnings specific and solution-oriented

### Info Box Usage
✅ Add historical context or origin stories
✅ Explain "why" things work the way they do
✅ Link related concepts
✅ Keep expandable - don't interrupt main flow

### Quiz Strategy
✅ Focus on the most important concept from the lesson
✅ Test understanding, not memorization
✅ Include one clearly wrong option, two plausible options, one correct
✅ Explanation should reinforce the lesson

## 🎯 Common Patterns

### Algorithm Lesson Template
```
1. Introduction with [TIP] about when to use it
2. Algorithm description with numbered steps
3. [WARNING] about performance considerations
4. Code implementation
5. Time/Space complexity analysis
6. [INFO] about history or variations
7. Quiz on complexity or key concept
```

### Programming Concept Template
```
1. Definition and purpose
2. [TIP] about best practices
3. Basic syntax with code example
4. Common use cases (bullet points)
5. [WARNING] about common mistakes
6. Advanced example
7. [INFO] about language feature history
8. Quiz on syntax or usage
```

### Database/Query Template
```
1. Concept introduction
2. [TIP] for optimization
3. Syntax and examples
4. Multiple scenarios (numbered)
5. [WARNING] about performance
6. Best practices (bullet points)
7. [INFO] about SQL standards
8. Quiz on query writing or concepts
```

## 📊 Quality Metrics

### Great Lesson Checklist
- ✅ 5-10 minutes reading time
- ✅ 2-3 code examples
- ✅ 2-3 tips/warnings/info boxes
- ✅ 1 comprehensive quiz
- ✅ Clear visual hierarchy
- ✅ Actionable takeaways

### Great Quiz Checklist
- ✅ Tests the main concept
- ✅ 4 options (1 correct, 2-3 plausible, 1 clearly wrong)
- ✅ Explanation teaches something new
- ✅ Takes 30-60 seconds to answer
- ✅ Builds confidence when correct

## 🎓 Remember

**The goal is to create engaging, interactive lessons that:**
1. Teach concepts clearly
2. Provide visual variety
3. Test understanding
4. Build confidence
5. Make learning fun!

Happy lesson creating! 🚀
