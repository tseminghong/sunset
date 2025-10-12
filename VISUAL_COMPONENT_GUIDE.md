# Visual Component Guide - Interactive Lesson Elements

## 🎨 Component Showcase

### 1. Quiz Question Component

```
┌─────────────────────────────────────────────────────────┐
│  🎯 Quick Check                                         │
│ ─────────────────────────────────────────────────────── │
│                                                          │
│  What is the time complexity of Selection Sort?         │
│                                                          │
│  ○  O(n)                                                │
│  ◉  O(n²)                            [Selected]         │
│  ○  O(n log n)                                          │
│  ○  O(log n)                                            │
│                                                          │
│  [ ✓  Submit Answer ]                                   │
└─────────────────────────────────────────────────────────┘

After submission:

┌─────────────────────────────────────────────────────────┐
│  🎯 Quick Check                                         │
│ ─────────────────────────────────────────────────────── │
│                                                          │
│  What is the time complexity of Selection Sort?         │
│                                                          │
│  ○  O(n)                                                │
│  ✓  O(n²)                            [CORRECT! 🎉]      │
│  ○  O(n log n)                                          │
│  ○  O(log n)                                            │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ✓ Correct! 🎉                                   │   │
│  │ Selection sort always has O(n²) time complexity │   │
│  │ because it uses nested loops...                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  [ ↻  Try Again ]                                       │
└─────────────────────────────────────────────────────────┘
```

**Features**:
- Purple/tertiary background
- Large, clear question text
- Radio buttons for single choice
- Visual feedback: Green (correct) / Red (incorrect)
- Explanation card after submission
- Try Again button to reset

---

### 2. Tip Box Component

```
┌─────────────────────────────────────────────────────────┐
│  💡 Tip                                                 │
│                                                          │
│  Always use `const` by default when declaring           │
│  variables. Only use `let` when you need to reassign!   │
└─────────────────────────────────────────────────────────┘
```

**Styling**:
- Light blue/primary background
- Lightbulb icon (💡)
- "Tip" label in bold
- Border for emphasis
- Perfect for best practices

---

### 3. Warning Box Component

```
┌─────────────────────────────────────────────────────────┐
│  ⚠️ Important                                           │
│                                                          │
│  Avoid using selection sort for arrays with more        │
│  than 1000 elements as performance degrades             │
│  significantly.                                          │
└─────────────────────────────────────────────────────────┘
```

**Styling**:
- Light red/error background
- Warning icon (⚠️)
- "Important" label in bold
- Red border for emphasis
- Perfect for common mistakes

---

### 4. Info Box Component (Expandable)

**Collapsed State**:
```
┌─────────────────────────────────────────────────────────┐
│  ℹ️  Did you know?                              ⌄      │
└─────────────────────────────────────────────────────────┘
```

**Expanded State**:
```
┌─────────────────────────────────────────────────────────┐
│  ℹ️  Did you know?                              ⌃      │
│                                                          │
│  Selection sort makes the minimum number of swaps       │
│  (n-1 maximum), making it useful when writing to        │
│  memory is expensive.                                    │
└─────────────────────────────────────────────────────────┘
```

**Features**:
- Clickable header
- Expand/collapse animation
- Info icon (ℹ️)
- Secondary container background
- Perfect for extra context

---

### 5. Section Divider Component

```
───────────────  LESSON CONTENT  ───────────────

───────────────  TEST YOUR KNOWLEDGE  ───────────────
```

**Styling**:
- Horizontal lines on both sides
- Centered bold label
- Primary color accent
- Clear visual separation

---

### 6. Enhanced Code Blocks

```
┌─────────────────────────────────────────────────────────┐
│  PYTHON                                                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  def selection_sort(arr):                               │
│      n = len(arr)                                       │
│      for i in range(n):                                 │
│          min_idx = i                                    │
│          for j in range(i + 1, n):                      │
│              if arr[j] < arr[min_idx]:                  │
│                  min_idx = j                            │
│          arr[i], arr[min_idx] = arr[min_idx], arr[i]   │
│      return arr                                         │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Features**:
- Language badge at top (color coded)
- Rounded corners
- Monospace font
- Gray background
- Proper padding

---

### 7. Formatted Text Elements

#### Headings
```
# Heading 1
═════════════════════════  (Blue underline)

## Heading 2

### Heading 3
```

#### Lists
```
Bullet Points:
  •  First point
  •  Second point
  •  Third point

Numbered Lists:
  1.  First step
  2.  Second step
  3.  Third step
```

#### Inline Formatting
```
Regular text with **bold text** and `inline code`.
```

**Renders as**:
Regular text with **bold text** and `inline code`.

---

## 🎭 Animation Behaviors

### Quiz Selection Animation
```
State 1: Unselected     State 2: Hover          State 3: Selected
┌───────────┐           ┌───────────┐           ┌───────────┐
│ ○ Option  │    →      │ ◎ Option  │    →      │ ◉ Option  │
└───────────┘           └───────────┘           └───────────┘
Scale: 1.0              Scale: 1.0              Scale: 0.98
Gray                    Light Gray              Colored

Animation: Spring (medium stiffness)
Duration: ~300ms
```

### Result Feedback Animation
```
Submit Click    →    Expand Animation    →    Show Result
┌──────────┐         ┌──────────────┐         ┌──────────────────┐
│ Submit   │    →    │              │    →    │ ✓ Correct! 🎉   │
└──────────┘         │ Expanding... │         │ Explanation...   │
                     └──────────────┘         └──────────────────┘

Animation: expandVertically() + fadeIn()
Duration: ~400ms
```

### Info Box Toggle Animation
```
Collapsed              Expanding                Expanded
┌────────────┐        ┌────────────┐           ┌────────────────┐
│ Title  ⌄   │   →    │ Title  ⌃   │    →      │ Title  ⌃       │
└────────────┘        │ Content... │           │ Full content   │
                      └────────────┘           │ visible here   │
                                               └────────────────┘

Animation: expandVertically() + fadeIn()
Duration: ~300ms
```

---

## 📐 Layout Structure

### Lesson Page Flow
```
┌─────────────────────────────────────────────┐
│  ← [Back]  Lesson Title                     │  [Header Section]
├─────────────────────────────────────────────┤
│  🕐 45 min          ✓ Completed             │  [Metadata Card]
├─────────────────────────────────────────────┤
│  ℹ️  Lesson description text here...        │  [Description Card]
├─────────────────────────────────────────────┤
│  ─────────  LESSON CONTENT  ─────────       │  [Section Divider]
├─────────────────────────────────────────────┤
│  # Main Heading                             │
│  ═══════════════════════════                │
│                                             │
│  Regular paragraph text...                  │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  💡 Tip                               │ │  [Tip Box]
│  │  Helpful tip here...                  │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ## Section Header                          │
│                                             │
│  **Bold text** and `inline code`            │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  PYTHON                               │ │  [Code Block]
│  │  ───────────────────────────────────  │ │
│  │  def function():                      │ │
│  │      return True                      │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  ⚠️ Important                         │ │  [Warning Box]
│  │  Important warning...                 │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ─────  TEST YOUR KNOWLEDGE  ─────         │  [Section Divider]
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  🎯 Quick Check                       │ │
│  │  ───────────────────────────────────  │ │
│  │  Question text here?                  │ │  [Quiz Component]
│  │  ○  Option A                          │ │
│  │  ○  Option B                          │ │
│  │  ○  Option C                          │ │
│  │  ○  Option D                          │ │
│  │  [ Submit Answer ]                    │ │
│  └───────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│  [ ✓ Mark Complete ]  [ Next Lesson → ]    │  [Bottom Actions]
└─────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

### Component Colors (Light Theme)
```
Quiz Card:          Tertiary Container (#E8DEF8)
Tip Box:            Primary Container   (#D0BCFF)
Warning Box:        Error Container     (#F2B8B5)
Info Box:           Secondary Container (#CCC2DC)
Code Block:         Surface Variant     (#E7E0EC)
Section Divider:    Primary             (#6750A4)
```

### Feedback Colors
```
Correct Answer:     Green (#4CAF50)
Incorrect Answer:   Red   (#F44336)
Selected:           Primary (#6750A4)
Unselected:         Gray  (#79747E)
```

---

## 📱 Responsive Behavior

### Mobile (< 600dp)
- Full-width components
- Stacked layouts
- Larger touch targets (48dp minimum)
- Single column for quiz options

### Tablet (≥ 600dp)
- Maintained full-width for readability
- Increased padding
- Same layout structure

---

## 🔍 Usage Patterns

### When to Use Each Component

**Quiz Question**: 
- ✅ At the end of each lesson
- ✅ To test understanding of key concepts
- ✅ For knowledge checks

**Tip Box**:
- ✅ Best practices
- ✅ Helpful hints
- ✅ Pro tips
- ✅ Shortcuts

**Warning Box**:
- ✅ Common mistakes
- ✅ Performance pitfalls
- ✅ Security concerns
- ✅ Deprecated features

**Info Box**:
- ✅ Extra context
- ✅ Historical information
- ✅ Related concepts
- ✅ Optional deep dives

**Section Divider**:
- ✅ Between major sections
- ✅ Before quizzes
- ✅ Topic transitions

---

## 🎯 Content Author Guidelines

### Writing Quiz Questions

✅ **Good Quiz Question**:
```markdown
Question: What is the time complexity of Bubble Sort in the best case?

Options:
- O(n²)
- O(n log n)
- O(n)      ← Correct
- O(1)

Explanation: In the best case (already sorted array), Bubble Sort 
with the swapped flag optimization only needs one pass through the 
array to confirm it's sorted, resulting in O(n) time complexity.
```

❌ **Poor Quiz Question**:
```markdown
Question: Is Bubble Sort good?

Options:
- Yes
- No
- Maybe
- Sometimes

Explanation: It depends.
```

### Writing Tips

✅ **Good Tip**:
```markdown
[TIP] Use `const` by default when declaring variables. Only switch 
to `let` when you actually need to reassign the variable later.
```

❌ **Poor Tip**:
```markdown
[TIP] Variables are important.
```

### Writing Warnings

✅ **Good Warning**:
```markdown
[WARNING] Avoid using `var` in modern JavaScript. It has confusing 
function-scope behavior and can lead to bugs. Use `let` or `const` instead.
```

❌ **Poor Warning**:
```markdown
[WARNING] Be careful with code.
```

---

## 📊 Impact Summary

### Before Interactive Features
```
Plain text lesson
↓
User reads passively
↓
No knowledge check
↓
Mark complete (no validation)
```

### After Interactive Features
```
Enhanced lesson with visual elements
↓
User engages with tips, warnings, info boxes
↓
User encounters quiz
↓
Active testing of knowledge
↓
Instant feedback with explanations
↓
Option to retry
↓
Confident completion with validated understanding
```

### Learning Engagement Metrics

**Visual Appeal**: 
- Before: Plain text only
- After: Color-coded, structured, visually appealing

**Interactivity**:
- Before: Read-only
- After: Clickable quizzes, expandable sections

**Knowledge Validation**:
- Before: None
- After: Quiz-based testing with feedback

**Retention Aids**:
- Before: None
- After: Tips, warnings, and highlighted key points

---

## 🚀 Quick Start for Content Creators

### Adding a Quiz to Your Lesson

1. Find your lesson in `ResourceRepository.kt`
2. Add quiz parameter:
```kotlin
quiz = Quiz(
    question = "Your question?",
    options = listOf("A", "B", "C", "D"),
    correctAnswer = 2, // Index 0-3
    explanation = "Why it's correct..."
)
```

### Adding Tips/Warnings to Content

Just add these markers in your lesson content:
```markdown
# Your Lesson Title

Regular content here...

[TIP] This is a helpful tip!

More content...

[WARNING] This is an important warning!

Even more content...

[INFO] This is extra context!
```

That's it! The components will automatically render. 🎉
