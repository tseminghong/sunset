package com.hpccss.ict.ui.screens

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.slideInVertically
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.hpccss.ict.data.model.Resource
import com.hpccss.ict.ui.components.HeroSection
import com.hpccss.ict.ui.components.ResourceCard
import com.hpccss.ict.ui.components.SearchBar
import com.hpccss.ict.ui.components.TagFilter
import com.hpccss.ict.viewmodel.HomeViewModel

/**
 * Home Screen - Main landing page
 * 
 * Replaces: src/app/page.tsx
 * 
 * Features:
 * - Hero section with download button
 * - Search functionality
 * - Resource cards grid
 * - Tag filtering
 * - Optimized for mobile with bottom navigation
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    viewModel: HomeViewModel,
    onNavigateToResource: (String) -> Unit,
    onNavigateToSearch: () -> Unit,
    modifier: Modifier = Modifier
) {
    val resources by viewModel.resources.collectAsState()
    val selectedTags by viewModel.selectedTags.collectAsState()
    val searchQuery by viewModel.searchQuery.collectAsState()
    var isSearchVisible by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            // Compact header for mobile
            TopAppBar(
                title = {
                    Text(
                        "ICT Revision Hub",
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.Bold
                    )
                },
                actions = {
                    IconButton(onClick = { isSearchVisible = !isSearchVisible }) {
                        Icon(Icons.Filled.Search, contentDescription = "Search")
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.primaryContainer,
                    titleContentColor = MaterialTheme.colorScheme.onPrimaryContainer
                )
            )
        },
        modifier = modifier
    ) { paddingValues ->
        Box(modifier = Modifier.padding(paddingValues)) {
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Hero Section - Animated entrance
                item {
                    AnimatedVisibility(
                        visible = true,
                        enter = slideInVertically() + fadeIn()
                    ) {
                        HeroSection(
                            onDownloadClick = { /* Handle APK download */ }
                        )
                    }
                }

                // Tag Filter
                item {
                    TagFilter(
                        selectedTags = selectedTags,
                        onTagSelected = { tag ->
                            viewModel.toggleTag(tag)
                        }
                    )
                }

                // Resource Cards - Optimized for mobile
                items(
                    items = resources,
                    key = { it.id }
                ) { resource ->
                    ResourceCard(
                        resource = resource,
                        onClick = { onNavigateToResource(resource.id) },
                        modifier = Modifier
                            .fillMaxWidth()
                            .animateItemPlacement() // Smooth reordering
                    )
                }

                // Empty state
                if (resources.isEmpty()) {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(200.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(
                                "No resources found",
                                style = MaterialTheme.typography.bodyLarge,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                        }
                    }
                }
            }

            // Floating Search Bar - Mobile optimized
            AnimatedVisibility(
                visible = isSearchVisible,
                enter = slideInVertically() + fadeIn(),
                exit = fadeOut(),
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 80.dp) // Above bottom nav
            ) {
                SearchBar(
                    query = searchQuery,
                    onQueryChange = { viewModel.updateSearchQuery(it) },
                    onClose = { isSearchVisible = false },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 16.dp)
                )
            }
        }
    }
}
