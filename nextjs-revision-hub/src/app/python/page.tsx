'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, RotateCcw, ChevronDown, ChevronUp, Smartphone, Menu } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'

interface StepData {
  array: number[]
  highlightIndices?: number[]
  compareIndices?: number[]
  swapIndices?: number[]
  minIndex?: number
  currentIndex?: number
  sortedIndices?: number[]
  message: string
  lineNumbers?: number[]
  explanation?: string
}

interface SearchStepData {
  array: number[]
  currentIndex?: number
  foundIndex?: number
  searchRange?: [number, number]
  midIndex?: number
  eliminatedIndices?: number[]
  message: string
  lineNumbers?: number[]
  explanation?: string
}

interface MergeStepData {
  arrayA: number[]
  arrayB: number[]
  arrayC: number[]
  indexA: number
  indexB: number
  indexC: number
  message: string
  lineNumbers?: number[]
  explanation?: string
}

export default function PythonPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeMainTab, setActiveMainTab] = useState<'sorting' | 'searching' | 'merge'>('sorting')
  const [activeSortTab, setActiveSortTab] = useState<'selection' | 'bubble'>('selection')
  const [activeSearchTab, setActiveSearchTab] = useState<'linear' | 'binary' | 'comparison'>('linear')
  
  // Mobile responsiveness state
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Device detection effect
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (showMobileMenu && isMobile) {
        const target = event.target as HTMLElement
        if (!target.closest('.mobile-menu-container')) {
          setShowMobileMenu(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showMobileMenu, isMobile])
  
  // Selection Sort State
  const [selectionInput, setSelectionInput] = useState('64,34,25,12,22,11,90')
  const [selectionSteps, setSelectionSteps] = useState<StepData[]>([])
  const [selectionCurrentStep, setSelectionCurrentStep] = useState(0)
  const [selectionRunning, setSelectionRunning] = useState(false)
  
  // Bubble Sort State
  const [bubbleInput, setBubbleInput] = useState('64,34,25,12,22,11,90')
  const [bubbleSteps, setBubbleSteps] = useState<StepData[]>([])
  const [bubbleCurrentStep, setBubbleCurrentStep] = useState(0)
  const [bubbleRunning, setBubbleRunning] = useState(false)

  // Linear Search State
  const [linearInput, setLinearInput] = useState('2,5,8,12,16,23,38,56,67,78')
  const [linearTarget, setLinearTarget] = useState('23')
  const [linearSteps, setLinearSteps] = useState<SearchStepData[]>([])
  const [linearCurrentStep, setLinearCurrentStep] = useState(0)
  const [linearRunning, setLinearRunning] = useState(false)

  // Binary Search State
  const [binaryInput, setBinaryInput] = useState('2,5,8,12,16,23,38,56,67,78')
  const [binaryTarget, setBinaryTarget] = useState('23')
  const [binarySteps, setBinarySteps] = useState<SearchStepData[]>([])
  const [binaryCurrentStep, setBinaryCurrentStep] = useState(0)
  const [binaryRunning, setBinaryRunning] = useState(false)

  // Merge State
  const [arrayAInput, setArrayAInput] = useState('1,3,5,7')
  const [arrayBInput, setArrayBInput] = useState('2,4,6,8')
  const [mergeSteps, setMergeSteps] = useState<MergeStepData[]>([])
  const [mergeCurrentStep, setMergeCurrentStep] = useState(0)
  const [mergeRunning, setMergeRunning] = useState(false)

  // Code visibility
  const [showCode, setShowCode] = useState(true)

  // Utility function to parse input
  const parseInput = (input: string): number[] => {
    return input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
  }

  // Selection Sort Algorithm
  const generateSelectionSortSteps = (arr: number[]): StepData[] => {
    const steps: StepData[] = []
    const workingArray = [...arr]
    const n = workingArray.length

    steps.push({
      array: [...workingArray],
      message: 'Starting Selection Sort',
      lineNumbers: [0],
      explanation: 'Initialize the selection sort algorithm'
    })

    for (let i = 0; i < n; i++) {
      let minIndex = i
      steps.push({
        array: [...workingArray],
        currentIndex: i,
        minIndex: minIndex,
        message: `Pass ${i + 1}: Finding minimum in unsorted portion`,
        lineNumbers: [3, 5],
        explanation: `Starting pass ${i + 1}, assume element at index ${i} is minimum`
      })

      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...workingArray],
          currentIndex: i,
          minIndex: minIndex,
          compareIndices: [j, minIndex],
          message: `Comparing elements at positions ${j} and ${minIndex}`,
          lineNumbers: [6, 7],
          explanation: `Comparing ${workingArray[j]} with current minimum ${workingArray[minIndex]}`
        })

        if (workingArray[j] < workingArray[minIndex]) {
          minIndex = j
          steps.push({
            array: [...workingArray],
            currentIndex: i,
            minIndex: minIndex,
            highlightIndices: [minIndex],
            message: `New minimum found at position ${minIndex}`,
            lineNumbers: [8],
            explanation: `${workingArray[minIndex]} is smaller, update minimum index`
          })
        }
      }

      if (minIndex !== i) {
        [workingArray[i], workingArray[minIndex]] = [workingArray[minIndex], workingArray[i]]
        steps.push({
          array: [...workingArray],
          swapIndices: [i, minIndex],
          sortedIndices: Array.from({length: i + 1}, (_, idx) => idx),
          message: `Swapped elements at positions ${i} and ${minIndex}`,
          lineNumbers: [11],
          explanation: `Place minimum element in its correct position`
        })
      } else {
        steps.push({
          array: [...workingArray],
          sortedIndices: Array.from({length: i + 1}, (_, idx) => idx),
          message: `Element already in correct position`,
          lineNumbers: [11],
          explanation: `No swap needed, element is already in place`
        })
      }
    }

    steps.push({
      array: [...workingArray],
      sortedIndices: Array.from({length: n}, (_, idx) => idx),
      message: 'Selection Sort Complete!',
      lineNumbers: [12],
      explanation: 'Array is now fully sorted'
    })

    return steps
  }

  // Bubble Sort Algorithm
  const generateBubbleSortSteps = (arr: number[]): StepData[] => {
    const steps: StepData[] = []
    const workingArray = [...arr]
    const n = workingArray.length

    steps.push({
      array: [...workingArray],
      message: 'Starting Bubble Sort',
      lineNumbers: [0],
      explanation: 'Initialize the bubble sort algorithm'
    })

    for (let i = 0; i < n - 1; i++) {
      let swapped = false
      
      steps.push({
        array: [...workingArray],
        message: `Pass ${i + 1}: Bubbling largest element to position ${n - i - 1}`,
        lineNumbers: [3, 4],
        explanation: `Starting pass ${i + 1}, last ${i} elements are already sorted`
      })

      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...workingArray],
          compareIndices: [j, j + 1],
          sortedIndices: Array.from({length: i}, (_, idx) => n - 1 - idx),
          message: `Comparing elements at positions ${j} and ${j + 1}`,
          lineNumbers: [6, 9],
          explanation: `Comparing ${workingArray[j]} and ${workingArray[j + 1]}`
        })

        if (workingArray[j] > workingArray[j + 1]) {
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]]
          swapped = true
          
          steps.push({
            array: [...workingArray],
            swapIndices: [j, j + 1],
            sortedIndices: Array.from({length: i}, (_, idx) => n - 1 - idx),
            message: `Swapped ${workingArray[j + 1]} and ${workingArray[j]}`,
            lineNumbers: [10, 11],
            explanation: `${workingArray[j + 1]} > ${workingArray[j]}, so swap them`
          })
        }
      }

      if (!swapped) {
        steps.push({
          array: [...workingArray],
          sortedIndices: Array.from({length: n}, (_, idx) => idx),
          message: 'No swaps needed - array is sorted!',
          lineNumbers: [13, 14],
          explanation: 'Early termination: array is already sorted'
        })
        break
      }
    }

    steps.push({
      array: [...workingArray],
      sortedIndices: Array.from({length: n}, (_, idx) => idx),
      message: 'Bubble Sort Complete!',
      lineNumbers: [15],
      explanation: 'Array is now fully sorted'
    })

    return steps
  }

  // Linear Search Algorithm
  const generateLinearSearchSteps = (arr: number[], target: number): SearchStepData[] => {
    const steps: SearchStepData[] = []

    steps.push({
      array: [...arr],
      message: `Starting Linear Search for ${target}`,
      lineNumbers: [0],
      explanation: 'Initialize linear search algorithm'
    })

    for (let i = 0; i < arr.length; i++) {
      steps.push({
        array: [...arr],
        currentIndex: i,
        message: `Checking position ${i}: ${arr[i]}`,
        lineNumbers: [1, 2],
        explanation: `Comparing ${arr[i]} with target ${target}`
      })

      if (arr[i] === target) {
        steps.push({
          array: [...arr],
          foundIndex: i,
          message: `Target ${target} found at position ${i}!`,
          lineNumbers: [3],
          explanation: `Match found! Returning index ${i}`
        })
        return steps
      }
    }

    steps.push({
      array: [...arr],
      message: `Target ${target} not found in array`,
      lineNumbers: [4],
      explanation: 'Searched entire array, target not found. Return -1'
    })

    return steps
  }

  // Binary Search Algorithm
  const generateBinarySearchSteps = (arr: number[], target: number): SearchStepData[] => {
    const steps: SearchStepData[] = []
    let first = 0
    let last = arr.length - 1
    let location = -1

    steps.push({
      array: [...arr],
      searchRange: [first, last],
      message: `Starting Binary Search for ${target}`,
      lineNumbers: [0, 1, 2, 3],
      explanation: 'Initialize binary search with full array range'
    })

    while (first <= last && location === -1) {
      const mid = Math.floor((first + last) / 2)

      steps.push({
        array: [...arr],
        searchRange: [first, last],
        midIndex: mid,
        message: `Checking middle position ${mid}: ${arr[mid]}`,
        lineNumbers: [4, 5, 6],
        explanation: `Calculate middle index: (${first} + ${last}) // 2 = ${mid}`
      })

      if (target === arr[mid]) {
        location = mid
        steps.push({
          array: [...arr],
          foundIndex: mid,
          message: `Target ${target} found at position ${mid}!`,
          lineNumbers: [7],
          explanation: `Match found! Target equals middle element`
        })
      } else if (target < arr[mid]) {
        const eliminatedIndices = Array.from({length: arr.length - mid}, (_, i) => mid + i)
        last = mid - 1
        steps.push({
          array: [...arr],
          searchRange: [first, last],
          eliminatedIndices,
          message: `Target ${target} < ${arr[mid]}, search left half`,
          lineNumbers: [8, 9],
          explanation: `Target is smaller, eliminate right half of search range`
        })
      } else {
        const eliminatedIndices = Array.from({length: mid + 1}, (_, i) => i)
        first = mid + 1
        steps.push({
          array: [...arr],
          searchRange: [first, last],
          eliminatedIndices,
          message: `Target ${target} > ${arr[mid]}, search right half`,
          lineNumbers: [10, 11],
          explanation: `Target is larger, eliminate left half of search range`
        })
      }
    }

    if (location === -1) {
      steps.push({
        array: [...arr],
        message: `Target ${target} not found in array`,
        lineNumbers: [12],
        explanation: 'Search range exhausted, target not found. Return -1'
      })
    }

    return steps
  }

  // Merge Algorithm
  const generateMergeSteps = (arrA: number[], arrB: number[]): MergeStepData[] => {
    const steps: MergeStepData[] = []
    const C: number[] = []
    let i = 0, j = 0

    steps.push({
      arrayA: [...arrA],
      arrayB: [...arrB],
      arrayC: [...C],
      indexA: i,
      indexB: j,
      indexC: C.length,
      message: 'Starting merge of two sorted arrays',
      lineNumbers: [0, 1, 2, 3],
      explanation: 'Initialize pointers and result array'
    })

    while (i < arrA.length && j < arrB.length) {
      steps.push({
        arrayA: [...arrA],
        arrayB: [...arrB],
        arrayC: [...C],
        indexA: i,
        indexB: j,
        indexC: C.length,
        message: `Comparing A[${i}]=${arrA[i]} with B[${j}]=${arrB[j]}`,
        lineNumbers: [4, 5],
        explanation: `Compare current elements from both arrays`
      })

      if (arrA[i] < arrB[j]) {
        C.push(arrA[i])
        i++
        steps.push({
          arrayA: [...arrA],
          arrayB: [...arrB],
          arrayC: [...C],
          indexA: i,
          indexB: j,
          indexC: C.length,
          message: `Added ${arrA[i-1]} from array A to result`,
          lineNumbers: [6, 7],
          explanation: `A[${i-1}] is smaller, add it to result and advance pointer`
        })
      } else {
        C.push(arrB[j])
        j++
        steps.push({
          arrayA: [...arrA],
          arrayB: [...arrB],
          arrayC: [...C],
          indexA: i,
          indexB: j,
          indexC: C.length,
          message: `Added ${arrB[j-1]} from array B to result`,
          lineNumbers: [8, 9, 10],
          explanation: `B[${j-1}] is smaller or equal, add it to result and advance pointer`
        })
      }
    }

    while (i < arrA.length) {
      C.push(arrA[i])
      i++
      steps.push({
        arrayA: [...arrA],
        arrayB: [...arrB],
        arrayC: [...C],
        indexA: i,
        indexB: j,
        indexC: C.length,
        message: `Added remaining element ${arrA[i-1]} from array A`,
        lineNumbers: [11, 12, 13],
        explanation: `Array B is exhausted, add remaining elements from A`
      })
    }

    while (j < arrB.length) {
      C.push(arrB[j])
      j++
      steps.push({
        arrayA: [...arrA],
        arrayB: [...arrB],
        arrayC: [...C],
        indexA: i,
        indexB: j,
        indexC: C.length,
        message: `Added remaining element ${arrB[j-1]} from array B`,
        lineNumbers: [14, 15, 16],
        explanation: `Array A is exhausted, add remaining elements from B`
      })
    }

    steps.push({
      arrayA: [...arrA],
      arrayB: [...arrB],
      arrayC: [...C],
      indexA: i,
      indexB: j,
      indexC: C.length,
      message: 'Merge complete!',
      lineNumbers: [17],
      explanation: 'Both arrays merged into sorted result array'
    })

    return steps
  }

  // Code blocks for each algorithm
  const codeBlocks = {
    selectionSort: [
      "def selection_sort(arr):",
      "    n = len(arr)",
      "    # Traverse through all array elements",
      "    for i in range(n):",
      "        # Find the minimum element",
      "        min_idx = i",
      "        for j in range(i + 1, n):",
      "            if arr[j] < arr[min_idx]:",
      "                min_idx = j",
      "        # Swap the found minimum element",
      "        arr[i], arr[min_idx] = arr[min_idx], arr[i]",
      "    return arr"
    ],
    bubbleSort: [
      "def bubble_sort(arr):",
      "    n = len(arr)",
      "    # Traverse through all array elements",
      "    for i in range(n - 1):",
      "        swapped = False",
      "        # Last i elements are already in place",
      "        for j in range(0, n - i - 1):",
      "            # Traverse the array from 0 to n-i-1",
      "            # Swap if the element found is greater",
      "            if arr[j] > arr[j + 1]:",
      "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",
      "                swapped = True",
      "        # If no two elements were swapped",
      "        if not swapped:",
      "            break",
      "    return arr"
    ],
    linearSearch: [
      "def LinearSearch(list, target):",
      "    for i in range(len(list)):",
      "        if list[i] == target:",
      "            return i",
      "    return -1"
    ],
    binarySearch: [
      "def BinarySearch(list, target):",
      "    first = 0",
      "    last = len(list) - 1",
      "    location = -1",
      "    while first <= last and location == -1:",
      "        mid = (first + last) // 2",
      "        if target == list[mid]:",
      "            location = mid",
      "        elif target < list[mid]:",
      "            last = mid - 1",
      "        else:",
      "            first = mid + 1",
      "    return location"
    ],
    merge: [
      "def merge(A, B):",
      "    C = []",
      "    i = 0",
      "    j = 0",
      "    while i < len(A) and j < len(B):",
      "        if A[i] < B[j]:",
      "            C.append(A[i])",
      "            i += 1",
      "        else:",
      "            C.append(B[j])",
      "            j += 1",
      "    while i < len(A):",
      "        C.append(A[i])",
      "        i += 1",
      "    while j < len(B):",
      "        C.append(B[j])",
      "        j += 1",
      "    return C"
    ]
  }

  // Array visualization component
  const ArrayVisualization = ({ 
    array, 
    highlightIndices = [], 
    compareIndices = [], 
    swapIndices = [], 
    sortedIndices = [], 
    currentIndex, 
    minIndex,
    foundIndex,
    searchRange,
    midIndex,
    eliminatedIndices = []
  }: {
    array: number[]
    highlightIndices?: number[]
    compareIndices?: number[]
    swapIndices?: number[]
    sortedIndices?: number[]
    currentIndex?: number
    minIndex?: number
    foundIndex?: number
    searchRange?: [number, number]
    midIndex?: number
    eliminatedIndices?: number[]
  }) => {
    const maxValue = Math.max(...array, 1)
    
    return (
      <div className="flex flex-wrap items-end justify-center gap-2 p-4 min-h-32">
        {array.map((value, index) => {
          let className = "relative bg-blue-500 text-white text-xs font-bold flex items-end justify-center transition-all duration-300 rounded-t"
          let height = Math.max((value / maxValue) * 120, 20)
          
          // Apply different styling based on state
          if (eliminatedIndices.includes(index)) {
            className = className.replace('bg-blue-500', 'bg-gray-300 opacity-50')
          } else if (foundIndex === index) {
            className = className.replace('bg-blue-500', 'bg-green-500')
          } else if (sortedIndices.includes(index)) {
            className = className.replace('bg-blue-500', 'bg-green-400')
          } else if (swapIndices.includes(index)) {
            className = className.replace('bg-blue-500', 'bg-pink-500')
          } else if (compareIndices.includes(index)) {
            className = className.replace('bg-blue-500', 'bg-amber-500')
          } else if (midIndex === index) {
            className = className.replace('bg-blue-500', 'bg-purple-500')
          } else if (searchRange && index >= searchRange[0] && index <= searchRange[1]) {
            className = className.replace('bg-blue-500', 'bg-blue-300')
          } else if (highlightIndices.includes(index)) {
            className = className.replace('bg-blue-500', 'bg-orange-500')
          }
          
          // Add border for special indices
          if (currentIndex === index) {
            className += ' ring-4 ring-indigo-500'
          }
          if (minIndex === index) {
            className += ' ring-4 ring-orange-600'
          }
          
          return (
            <motion.div
              key={index}
              className={className}
              style={{ 
                height: `${height}px`, 
                minWidth: '40px',
                width: `${Math.max(40, 300 / array.length)}px`
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <span className="p-1">{value}</span>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-secondary">
                {index}
              </div>
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Merge visualization component
  const MergeVisualization = ({ stepData }: { stepData: MergeStepData }) => {
    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-primary mb-2">Array A:</h4>
          <div className="flex items-center gap-2">
            {stepData.arrayA.map((value, index) => (
              <div
                key={index}
                className={`w-12 h-12 flex items-center justify-center rounded font-bold text-sm transition-all ${
                  index === stepData.indexA ? 'bg-blue-500 text-white ring-2 ring-blue-600' : 
                  index < stepData.indexA ? 'bg-gray-300 text-gray-500' : 'bg-blue-100 text-blue-800'
                }`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-primary mb-2">Array B:</h4>
          <div className="flex items-center gap-2">
            {stepData.arrayB.map((value, index) => (
              <div
                key={index}
                className={`w-12 h-12 flex items-center justify-center rounded font-bold text-sm transition-all ${
                  index === stepData.indexB ? 'bg-green-500 text-white ring-2 ring-green-600' : 
                  index < stepData.indexB ? 'bg-gray-300 text-gray-500' : 'bg-green-100 text-green-800'
                }`}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-primary mb-2">Result Array C:</h4>
          <div className="flex items-center gap-2">
            {stepData.arrayC.map((value, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-12 h-12 flex items-center justify-center rounded font-bold text-sm bg-purple-500 text-white"
              >
                {value}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Code display component
  const CodeDisplay = ({ 
    code, 
    highlightedLines = [] 
  }: { 
    code: string[], 
    highlightedLines?: number[] 
  }) => {
    return (
      <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
        {code.map((line, index) => (
          <div
            key={index}
            className={`py-1 px-2 rounded transition-colors ${
              highlightedLines.includes(index) 
                ? 'bg-yellow-400 bg-opacity-20 text-yellow-200' 
                : 'text-green-400'
            }`}
          >
            <span className="text-gray-500 mr-4 select-none">{index + 1}</span>
            {line}
          </div>
        ))}
      </div>
    )
  }

  // Control buttons component
  const ControlButtons = ({ 
    onStart, 
    onNext, 
    onReset, 
    isRunning, 
    hasSteps, 
    isComplete 
  }: {
    onStart: () => void
    onNext: () => void
    onReset: () => void
    isRunning: boolean
    hasSteps: boolean
    isComplete: boolean
  }) => {
    return (
      <div className={`flex gap-2 ${isMobile ? 'flex-col w-full' : 'flex-wrap'}`}>
        <button
          onClick={onStart}
          disabled={isRunning}
          className={`primary-btn flex items-center gap-2 disabled:opacity-50 ${
            isMobile ? 'w-full py-3 px-4 text-sm justify-center' : 'px-4 py-2'
          }`}
        >
          <Play className="h-4 w-4" />
          Visualize
        </button>
        <button
          onClick={onNext}
          disabled={!isRunning || isComplete}
          className={`bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 ${
            isMobile ? 'w-full py-3 px-4 text-sm justify-center' : 'px-4 py-2'
          }`}
        >
          <Square className="h-4 w-4" />
          Next Step
        </button>
        <button
          onClick={onReset}
          disabled={!hasSteps}
          className={`bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 ${
            isMobile ? 'w-full py-3 px-4 text-sm justify-center' : 'px-4 py-2'
          }`}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className={`container mx-auto py-8 ${isMobile ? 'px-2' : 'px-4 sm:px-6 lg:px-8'}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className={`font-bold text-primary mb-4 ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
            Python Algorithms Visualizer
          </h1>
          <p className={`text-secondary ${isMobile ? 'text-sm px-4' : ''}`}>
            Interactive visualizations of sorting, searching, and merging algorithms
          </p>
        </motion.div>

        {/* Main Tabs */}
        <div className="flex justify-center mb-8">
          {isMobile ? (
            <div className="relative mobile-menu-container">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="flex items-center gap-2 bg-secondary px-4 py-3 rounded-xl text-primary font-medium min-w-[140px] justify-between"
              >
                <span className="capitalize">{activeMainTab}</span>
                <Menu className="h-4 w-4" />
              </button>
              
              {showMobileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-secondary rounded-xl shadow-lg z-10 overflow-hidden"
                >
                  {(['sorting', 'searching', 'merge'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveMainTab(tab)
                        setShowMobileMenu(false)
                      }}
                      className={`w-full px-4 py-3 text-left font-medium transition-colors capitalize ${
                        activeMainTab === tab
                          ? 'bg-primary text-primary'
                          : 'text-secondary hover:text-primary hover:bg-background'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex bg-secondary rounded-xl p-1">
              {(['sorting', 'searching', 'merge'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMainTab(tab)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                    activeMainTab === tab
                      ? 'bg-primary text-primary shadow-md'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Code Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors ${
              isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'
            }`}
          >
            {showCode ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* Sorting Tab */}
          {activeMainTab === 'sorting' && (
            <motion.div
              key="sorting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Sorting Sub-tabs */}
              <div className="flex justify-center">
                <div className={`flex bg-secondary rounded-xl p-1 ${isMobile ? 'w-full max-w-sm' : ''}`}>
                  {(['selection', 'bubble'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSortTab(tab)}
                      className={`rounded-lg font-medium transition-colors capitalize ${
                        isMobile ? 'flex-1 py-2 px-2 text-sm' : 'px-4 py-2'
                      } ${
                        activeSortTab === tab
                          ? 'bg-primary text-primary shadow-md'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {tab} Sort
                    </button>
                  ))}
                </div>
              </div>

              {/* Selection Sort */}
              {activeSortTab === 'selection' && (
                <div className={`bg-secondary rounded-xl ${isMobile ? 'p-3' : 'p-6'}`}>
                  <h3 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Selection Sort</h3>
                  
                  {showCode && (
                    <div className="mb-6">
                      <CodeDisplay 
                        code={codeBlocks.selectionSort} 
                        highlightedLines={selectionSteps[selectionCurrentStep]?.lineNumbers || []}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`${isMobile ? 'space-y-2' : 'flex gap-4 items-center flex-wrap'}`}>
                      <div className="flex items-center gap-2">
                        <label htmlFor="selection-input" className="text-sm font-medium text-primary">
                          Array:
                        </label>
                        <input
                          id="selection-input"
                          type="text"
                          value={selectionInput}
                          onChange={(e) => setSelectionInput(e.target.value)}
                          disabled={selectionRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'w-full px-2 py-2 text-sm' : 'px-3 py-2'
                          }`}
                          placeholder="64,34,25,12,22,11,90"
                        />
                      </div>
                    </div>

                    <ControlButtons
                      onStart={() => {
                        const arr = parseInput(selectionInput)
                        if (arr.length > 0) {
                          const steps = generateSelectionSortSteps(arr)
                          setSelectionSteps(steps)
                          setSelectionCurrentStep(0)
                          setSelectionRunning(true)
                        }
                      }}
                      onNext={() => {
                        if (selectionCurrentStep < selectionSteps.length - 1) {
                          setSelectionCurrentStep(selectionCurrentStep + 1)
                        }
                      }}
                      onReset={() => {
                        setSelectionSteps([])
                        setSelectionCurrentStep(0)
                        setSelectionRunning(false)
                      }}
                      isRunning={selectionRunning}
                      hasSteps={selectionSteps.length > 0}
                      isComplete={selectionCurrentStep >= selectionSteps.length - 1}
                    />

                    {selectionSteps.length > 0 && (
                      <div className="space-y-4">
                        <ArrayVisualization {...selectionSteps[selectionCurrentStep]} />
                        <div className="text-center">
                          <p className="text-primary font-medium">
                            {selectionSteps[selectionCurrentStep]?.message}
                          </p>
                          {selectionSteps[selectionCurrentStep]?.explanation && (
                            <p className="text-secondary text-sm mt-2">
                              {selectionSteps[selectionCurrentStep].explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bubble Sort */}
              {activeSortTab === 'bubble' && (
                <div className={`bg-secondary rounded-xl ${isMobile ? 'p-3' : 'p-6'}`}>
                  <h3 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Bubble Sort</h3>
                  
                  {showCode && (
                    <div className="mb-6">
                      <CodeDisplay 
                        code={codeBlocks.bubbleSort} 
                        highlightedLines={bubbleSteps[bubbleCurrentStep]?.lineNumbers || []}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`${isMobile ? 'space-y-2' : 'flex gap-4 items-center flex-wrap'}`}>
                      <div className="flex items-center gap-2">
                        <label htmlFor="bubble-input" className="text-sm font-medium text-primary">
                          Array:
                        </label>
                        <input
                          id="bubble-input"
                          type="text"
                          value={bubbleInput}
                          onChange={(e) => setBubbleInput(e.target.value)}
                          disabled={bubbleRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'w-full px-2 py-2 text-sm' : 'px-3 py-2'
                          }`}
                          placeholder="64,34,25,12,22,11,90"
                        />
                      </div>
                    </div>

                    <ControlButtons
                      onStart={() => {
                        const arr = parseInput(bubbleInput)
                        if (arr.length > 0) {
                          const steps = generateBubbleSortSteps(arr)
                          setBubbleSteps(steps)
                          setBubbleCurrentStep(0)
                          setBubbleRunning(true)
                        }
                      }}
                      onNext={() => {
                        if (bubbleCurrentStep < bubbleSteps.length - 1) {
                          setBubbleCurrentStep(bubbleCurrentStep + 1)
                        }
                      }}
                      onReset={() => {
                        setBubbleSteps([])
                        setBubbleCurrentStep(0)
                        setBubbleRunning(false)
                      }}
                      isRunning={bubbleRunning}
                      hasSteps={bubbleSteps.length > 0}
                      isComplete={bubbleCurrentStep >= bubbleSteps.length - 1}
                    />

                    {bubbleSteps.length > 0 && (
                      <div className="space-y-4">
                        <ArrayVisualization {...bubbleSteps[bubbleCurrentStep]} />
                        <div className="text-center">
                          <p className="text-primary font-medium">
                            {bubbleSteps[bubbleCurrentStep]?.message}
                          </p>
                          {bubbleSteps[bubbleCurrentStep]?.explanation && (
                            <p className="text-secondary text-sm mt-2">
                              {bubbleSteps[bubbleCurrentStep].explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Searching Tab */}
          {activeMainTab === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Searching Sub-tabs */}
              <div className="flex justify-center">
                <div className={`flex bg-secondary rounded-xl p-1 ${isMobile ? 'w-full max-w-sm' : ''}`}>
                  {(['linear', 'binary'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSearchTab(tab)}
                      className={`rounded-lg font-medium transition-colors capitalize ${
                        isMobile ? 'flex-1 py-2 px-2 text-sm' : 'px-4 py-2'
                      } ${
                        activeSearchTab === tab
                          ? 'bg-primary text-primary shadow-md'
                          : 'text-secondary hover:text-primary'
                      }`}
                    >
                      {tab} Search
                    </button>
                  ))}
                </div>
              </div>

              {/* Linear Search */}
              {activeSearchTab === 'linear' && (
                <div className={`bg-secondary rounded-xl ${isMobile ? 'p-3' : 'p-6'}`}>
                  <h3 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Linear Search</h3>
                  
                  {showCode && (
                    <div className="mb-6">
                      <CodeDisplay 
                        code={codeBlocks.linearSearch} 
                        highlightedLines={linearSteps[linearCurrentStep]?.lineNumbers || []}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`${isMobile ? 'space-y-3' : 'flex gap-4 items-center flex-wrap'}`}>
                      <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <label htmlFor="linear-input" className="text-sm font-medium text-primary">
                          Array:
                        </label>
                        <input
                          id="linear-input"
                          type="text"
                          value={linearInput}
                          onChange={(e) => setLinearInput(e.target.value)}
                          disabled={linearRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2'
                          }`}
                          placeholder="2,5,8,12,16,23,38,56,67,78"
                        />
                      </div>
                      <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <label htmlFor="linear-target" className="text-sm font-medium text-primary">
                          Target:
                        </label>
                        <input
                          id="linear-target"
                          type="text"
                          value={linearTarget}
                          onChange={(e) => setLinearTarget(e.target.value)}
                          disabled={linearRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2 w-20'
                          }`}
                          placeholder="23"
                        />
                      </div>
                    </div>

                    <ControlButtons
                      onStart={() => {
                        const arr = parseInput(linearInput)
                        const target = parseInt(linearTarget)
                        if (arr.length > 0 && !isNaN(target)) {
                          const steps = generateLinearSearchSteps(arr, target)
                          setLinearSteps(steps)
                          setLinearCurrentStep(0)
                          setLinearRunning(true)
                        }
                      }}
                      onNext={() => {
                        if (linearCurrentStep < linearSteps.length - 1) {
                          setLinearCurrentStep(linearCurrentStep + 1)
                        }
                      }}
                      onReset={() => {
                        setLinearSteps([])
                        setLinearCurrentStep(0)
                        setLinearRunning(false)
                      }}
                      isRunning={linearRunning}
                      hasSteps={linearSteps.length > 0}
                      isComplete={linearCurrentStep >= linearSteps.length - 1}
                    />

                    {linearSteps.length > 0 && (
                      <div className="space-y-4">
                        <ArrayVisualization {...linearSteps[linearCurrentStep]} />
                        <div className="text-center">
                          <p className="text-primary font-medium">
                            {linearSteps[linearCurrentStep]?.message}
                          </p>
                          {linearSteps[linearCurrentStep]?.explanation && (
                            <p className="text-secondary text-sm mt-2">
                              {linearSteps[linearCurrentStep].explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Binary Search */}
              {activeSearchTab === 'binary' && (
                <div className={`bg-secondary rounded-xl ${isMobile ? 'p-3' : 'p-6'}`}>
                  <h3 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Binary Search</h3>
                  
                  {showCode && (
                    <div className="mb-6">
                      <CodeDisplay 
                        code={codeBlocks.binarySearch} 
                        highlightedLines={binarySteps[binaryCurrentStep]?.lineNumbers || []}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className={`${isMobile ? 'space-y-3' : 'flex gap-4 items-center flex-wrap'}`}>
                      <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <label htmlFor="binary-input" className="text-sm font-medium text-primary">
                          Sorted Array:
                        </label>
                        <input
                          id="binary-input"
                          type="text"
                          value={binaryInput}
                          onChange={(e) => setBinaryInput(e.target.value)}
                          disabled={binaryRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2'
                          }`}
                          placeholder="2,5,8,12,16,23,38,56,67,78"
                        />
                      </div>
                      <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                        <label htmlFor="binary-target" className="text-sm font-medium text-primary">
                          Target:
                        </label>
                        <input
                          id="binary-target"
                          type="text"
                          value={binaryTarget}
                          onChange={(e) => setBinaryTarget(e.target.value)}
                          disabled={binaryRunning}
                          className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2 w-20'
                          }`}
                          placeholder="23"
                        />
                      </div>
                    </div>

                    <ControlButtons
                      onStart={() => {
                        const arr = parseInput(binaryInput)
                        const target = parseInt(binaryTarget)
                        if (arr.length > 0 && !isNaN(target)) {
                          const steps = generateBinarySearchSteps(arr, target)
                          setBinarySteps(steps)
                          setBinaryCurrentStep(0)
                          setBinaryRunning(true)
                        }
                      }}
                      onNext={() => {
                        if (binaryCurrentStep < binarySteps.length - 1) {
                          setBinaryCurrentStep(binaryCurrentStep + 1)
                        }
                      }}
                      onReset={() => {
                        setBinarySteps([])
                        setBinaryCurrentStep(0)
                        setBinaryRunning(false)
                      }}
                      isRunning={binaryRunning}
                      hasSteps={binarySteps.length > 0}
                      isComplete={binaryCurrentStep >= binarySteps.length - 1}
                    />

                    {binarySteps.length > 0 && (
                      <div className="space-y-4">
                        <ArrayVisualization {...binarySteps[binaryCurrentStep]} />
                        <div className="text-center">
                          <p className="text-primary font-medium">
                            {binarySteps[binaryCurrentStep]?.message}
                          </p>
                          {binarySteps[binaryCurrentStep]?.explanation && (
                            <p className="text-secondary text-sm mt-2">
                              {binarySteps[binaryCurrentStep].explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Merge Tab */}
          {activeMainTab === 'merge' && (
            <motion.div
              key="merge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className={`bg-secondary rounded-xl ${isMobile ? 'p-3' : 'p-6'}`}>
                <h3 className={`font-bold text-primary mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Merge Two Sorted Arrays</h3>
                
                {showCode && (
                  <div className="mb-6">
                    <CodeDisplay 
                      code={codeBlocks.merge} 
                      highlightedLines={mergeSteps[mergeCurrentStep]?.lineNumbers || []}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div className={`${isMobile ? 'space-y-3' : 'flex gap-4 items-center flex-wrap'}`}>
                    <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                      <label htmlFor="array-a" className="text-sm font-medium text-primary">
                        Array A:
                      </label>
                      <input
                        id="array-a"
                        type="text"
                        value={arrayAInput}
                        onChange={(e) => setArrayAInput(e.target.value)}
                        disabled={mergeRunning}
                        className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2'
                        }`}
                        placeholder="1,3,5,7"
                      />
                    </div>
                    <div className={`flex items-center gap-2 ${isMobile ? 'w-full' : ''}`}>
                      <label htmlFor="array-b" className="text-sm font-medium text-primary">
                        Array B:
                      </label>
                      <input
                        id="array-b"
                        type="text"
                        value={arrayBInput}
                        onChange={(e) => setArrayBInput(e.target.value)}
                        disabled={mergeRunning}
                        className={`border border-secondary rounded-lg bg-tertiary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isMobile ? 'flex-1 px-2 py-2 text-sm' : 'px-3 py-2'
                        }`}
                        placeholder="2,4,6,8"
                      />
                    </div>
                  </div>

                  <ControlButtons
                    onStart={() => {
                      const arrA = parseInput(arrayAInput)
                      const arrB = parseInput(arrayBInput)
                      if (arrA.length > 0 && arrB.length > 0) {
                        const steps = generateMergeSteps(arrA, arrB)
                        setMergeSteps(steps)
                        setMergeCurrentStep(0)
                        setMergeRunning(true)
                      }
                    }}
                    onNext={() => {
                      if (mergeCurrentStep < mergeSteps.length - 1) {
                        setMergeCurrentStep(mergeCurrentStep + 1)
                      }
                    }}
                    onReset={() => {
                      setMergeSteps([])
                      setMergeCurrentStep(0)
                      setMergeRunning(false)
                    }}
                    isRunning={mergeRunning}
                    hasSteps={mergeSteps.length > 0}
                    isComplete={mergeCurrentStep >= mergeSteps.length - 1}
                  />

                  {mergeSteps.length > 0 && (
                    <div className="space-y-4">
                      <MergeVisualization stepData={mergeSteps[mergeCurrentStep]} />
                      <div className="text-center">
                        <p className="text-primary font-medium">
                          {mergeSteps[mergeCurrentStep]?.message}
                        </p>
                        {mergeSteps[mergeCurrentStep]?.explanation && (
                          <p className="text-secondary text-sm mt-2">
                            {mergeSteps[mergeCurrentStep].explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}