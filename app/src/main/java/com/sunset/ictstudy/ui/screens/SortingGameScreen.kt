package com.sunset.ictstudy.ui.screens

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import kotlin.random.Random

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SortingGameScreen(
    onBack: () -> Unit,
    modifier: Modifier = Modifier
) {
    var currentAlgorithm by remember { mutableStateOf<SortingAlgorithm?>(null) }
    var arrayToSort by remember { mutableStateOf(generateRandomArray()) }
    var sortedIndices by remember { mutableStateOf(emptyList<Int>()) }
    var currentStep by remember { mutableIntStateOf(0) }
    var isPlaying by remember { mutableStateOf(false) }
    var comparingIndices by remember { mutableStateOf<Pair<Int, Int>?>(null) }
    val scope = rememberCoroutineScope()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Sorting Algorithms") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, "Back")
                    }
                },
                actions = {
                    IconButton(onClick = { arrayToSort = generateRandomArray(); currentStep = 0; sortedIndices = emptyList(); comparingIndices = null }) {
                        Icon(Icons.Default.Refresh, "Shuffle")
                    }
                }
            )
        }
    ) { paddingValues ->
        Column(
            modifier = modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp)
        ) {
            // Algorithm Selection
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                AlgorithmButton(
                    name = "Bubble Sort",
                    isSelected = currentAlgorithm is BubbleSort,
                    onClick = { 
                        currentAlgorithm = BubbleSort()
                        currentStep = 0
                        sortedIndices = emptyList()
                        comparingIndices = null
                        isPlaying = false
                    },
                    modifier = Modifier.weight(1f)
                )
                AlgorithmButton(
                    name = "Selection Sort",
                    isSelected = currentAlgorithm is SelectionSort,
                    onClick = { 
                        currentAlgorithm = SelectionSort()
                        currentStep = 0
                        sortedIndices = emptyList()
                        comparingIndices = null
                        isPlaying = false
                    },
                    modifier = Modifier.weight(1f)
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Visual Array Display
            ArrayVisualizer(
                array = arrayToSort,
                sortedIndices = sortedIndices,
                comparingIndices = comparingIndices,
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Controls
            if (currentAlgorithm != null) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = {
                            if (isPlaying) {
                                isPlaying = false
                            } else {
                                isPlaying = true
                                scope.launch {
                                    when (val algo = currentAlgorithm) {
                                        is BubbleSort -> {
                                            animateBubbleSort(
                                                array = arrayToSort.toMutableList(),
                                                onStep = { arr, comparing, sorted ->
                                                    arrayToSort = arr
                                                    comparingIndices = comparing
                                                    sortedIndices = sorted
                                                },
                                                onComplete = { isPlaying = false }
                                            )
                                        }
                                        is SelectionSort -> {
                                            animateSelectionSort(
                                                array = arrayToSort.toMutableList(),
                                                onStep = { arr, comparing, sorted ->
                                                    arrayToSort = arr
                                                    comparingIndices = comparing
                                                    sortedIndices = sorted
                                                },
                                                onComplete = { isPlaying = false }
                                            )
                                        }
                                        else -> {}
                                    }
                                }
                            }
                        },
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(
                            if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                            contentDescription = if (isPlaying) "Pause" else "Play"
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(if (isPlaying) "Pause" else "Start")
                    }

                    Button(
                        onClick = {
                            arrayToSort = generateRandomArray()
                            currentStep = 0
                            sortedIndices = emptyList()
                            comparingIndices = null
                            isPlaying = false
                        },
                        modifier = Modifier.weight(1f)
                    ) {
                        Icon(Icons.Default.Refresh, "Reset")
                        Spacer(modifier = Modifier.width(8.dp))
                        Text("Reset")
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Algorithm Explanation
            currentAlgorithm?.let { algo ->
                AlgorithmExplanation(algo)
            }
        }
    }
}

@Composable
fun AlgorithmButton(
    name: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        colors = ButtonDefaults.buttonColors(
            containerColor = if (isSelected) 
                MaterialTheme.colorScheme.primary 
            else 
                MaterialTheme.colorScheme.surfaceVariant
        )
    ) {
        Text(name)
    }
}

@Composable
fun ArrayVisualizer(
    array: List<Int>,
    sortedIndices: List<Int>,
    comparingIndices: Pair<Int, Int>?,
    modifier: Modifier = Modifier
) {
    Column(modifier = modifier) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(4.dp)
        ) {
            array.forEachIndexed { index, value ->
                val isSorted = index in sortedIndices
                val isComparing = comparingIndices?.let { index == it.first || index == it.second } ?: false
                
                val scale by animateFloatAsState(
                    targetValue = if (isComparing) 1.1f else 1.0f,
                    animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy),
                    label = "scale"
                )

                val backgroundColor by animateColorAsState(
                    targetValue = when {
                        isSorted -> Color(0xFF4CAF50)
                        isComparing -> Color(0xFFFF9800)
                        else -> MaterialTheme.colorScheme.primaryContainer
                    },
                    animationSpec = tween(300),
                    label = "background"
                )

                Column(
                    modifier = Modifier
                        .weight(1f)
                        .scale(scale),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height((value * 3).dp)
                            .clip(RoundedCornerShape(topStart = 8.dp, topEnd = 8.dp))
                            .background(backgroundColor),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(
                            text = value.toString(),
                            color = Color.White,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun AlgorithmExplanation(algorithm: SortingAlgorithm) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = when (algorithm) {
                    is BubbleSort -> "Bubble Sort"
                    is SelectionSort -> "Selection Sort"
                },
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = when (algorithm) {
                    is BubbleSort -> """
                        How it works:
                        1. Compare adjacent elements
                        2. Swap if they're in wrong order
                        3. Repeat until no swaps needed
                        
                        Time Complexity: O(n²)
                        Best for: Small datasets, nearly sorted arrays
                    """.trimIndent()
                    is SelectionSort -> """
                        How it works:
                        1. Find minimum element in unsorted portion
                        2. Swap it with first unsorted element
                        3. Move boundary of sorted portion
                        
                        Time Complexity: O(n²)
                        Best for: Small datasets, minimal swaps needed
                    """.trimIndent()
                },
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}

sealed class SortingAlgorithm
class BubbleSort : SortingAlgorithm()
class SelectionSort : SortingAlgorithm()

fun generateRandomArray(): List<Int> {
    return List(8) { Random.nextInt(10, 50) }
}

suspend fun animateBubbleSort(
    array: MutableList<Int>,
    onStep: (List<Int>, Pair<Int, Int>?, List<Int>) -> Unit,
    onComplete: () -> Unit
) {
    val n = array.size
    val sorted = mutableListOf<Int>()
    
    for (i in 0 until n - 1) {
        var swapped = false
        for (j in 0 until n - i - 1) {
            onStep(array.toList(), Pair(j, j + 1), sorted)
            delay(500)
            
            if (array[j] > array[j + 1]) {
                val temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
                swapped = true
                onStep(array.toList(), Pair(j, j + 1), sorted)
                delay(500)
            }
        }
        sorted.add(n - i - 1)
        if (!swapped) break
    }
    sorted.add(0)
    onStep(array.toList(), null, (0 until n).toList())
    onComplete()
}

suspend fun animateSelectionSort(
    array: MutableList<Int>,
    onStep: (List<Int>, Pair<Int, Int>?, List<Int>) -> Unit,
    onComplete: () -> Unit
) {
    val n = array.size
    val sorted = mutableListOf<Int>()
    
    for (i in 0 until n - 1) {
        var minIdx = i
        
        for (j in i + 1 until n) {
            onStep(array.toList(), Pair(minIdx, j), sorted)
            delay(500)
            
            if (array[j] < array[minIdx]) {
                minIdx = j
            }
        }
        
        if (minIdx != i) {
            val temp = array[i]
            array[i] = array[minIdx]
            array[minIdx] = temp
            onStep(array.toList(), Pair(i, minIdx), sorted)
            delay(500)
        }
        
        sorted.add(i)
    }
    sorted.add(n - 1)
    onStep(array.toList(), null, (0 until n).toList())
    onComplete()
}
