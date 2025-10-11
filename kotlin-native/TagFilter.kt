package com.hpccss.ict.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

/**
 * Tag Filter Component
 * 
 * Replaces: src/components/TagFilter.tsx
 * 
 * Mobile-optimized features:
 * - Horizontal scroll with chips
 * - Large touch targets (48dp height)
 * - Clear visual states (selected/unselected)
 * - Smooth color transitions
 * - "All" chip to clear filters
 */
@Composable
fun TagFilter(
    tags: List<String>,
    selectedTags: List<String>,
    onTagToggle: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val scrollState = rememberScrollState()

    Row(
        modifier = modifier
            .fillMaxWidth()
            .horizontalScroll(scrollState)
            .padding(vertical = 8.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        // "All" chip to clear all filters
        FilterChip(
            tag = "All",
            isSelected = selectedTags.isEmpty(),
            onClick = {
                // Clear all selections
                selectedTags.forEach { onTagToggle(it) }
            }
        )

        // Individual tag chips
        tags.forEach { tag ->
            FilterChip(
                tag = tag,
                isSelected = selectedTags.contains(tag),
                onClick = { onTagToggle(tag) }
            )
        }
    }
}

@Composable
private fun FilterChip(
    tag: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    // Animate colors and elevation
    val backgroundColor by animateColorAsState(
        targetValue = if (isSelected) 
            MaterialTheme.colorScheme.primary
        else 
            MaterialTheme.colorScheme.surfaceVariant,
        animationSpec = spring(),
        label = "chip_background"
    )

    val contentColor by animateColorAsState(
        targetValue = if (isSelected) 
            MaterialTheme.colorScheme.onPrimary
        else 
            MaterialTheme.colorScheme.onSurfaceVariant,
        animationSpec = spring(),
        label = "chip_content"
    )

    val elevation by animateDpAsState(
        targetValue = if (isSelected) 4.dp else 1.dp,
        animationSpec = spring(),
        label = "chip_elevation"
    )

    Surface(
        onClick = onClick,
        modifier = modifier.height(48.dp),
        shape = RoundedCornerShape(24.dp),
        color = backgroundColor,
        tonalElevation = elevation
    ) {
        Row(
            modifier = Modifier.padding(horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = tag,
                style = MaterialTheme.typography.labelLarge,
                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                color = contentColor
            )
        }
    }
}
