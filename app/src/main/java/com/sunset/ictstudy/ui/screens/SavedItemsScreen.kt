package com.sunset.ictstudy.ui.screens

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.sunset.ictstudy.data.database.FavoriteLesson
import com.sunset.ictstudy.ui.theme.NightSurface
import com.sunset.ictstudy.ui.theme.NightMuted
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun SavedItemsScreen(
    favorites: List<FavoriteLesson>,
    onBack: () -> Unit,
    onRemoveFavorite: (String) -> Unit,
    onItemClick: (FavoriteLesson) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(NightSurface)
            .statusBarsPadding()
    ) {
        SavedItemsTopBar(
            title = "Saved Items",
            itemCount = favorites.size,
            onBack = onBack
        )
        Divider(color = Color.White.copy(alpha = 0.08f))
        
        if (favorites.isEmpty()) {
            EmptyFavoritesState()
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(horizontal = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                contentPadding = PaddingValues(vertical = 16.dp)
            ) {
                items(favorites, key = { it.itemId }) { favorite ->
                    FavoriteItemCard(
                        favorite = favorite,
                        onRemove = { onRemoveFavorite(favorite.itemId) },
                        onClick = { onItemClick(favorite) }
                    )
                }
            }
        }
    }
}

@Composable
private fun SavedItemsTopBar(
    title: String,
    itemCount: Int,
    onBack: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 12.dp, vertical = 12.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        IconButton(onClick = onBack) {
            Icon(
                imageVector = Icons.Rounded.ArrowBack,
                contentDescription = "Back",
                tint = Color.White
            )
        }
        Spacer(modifier = Modifier.width(8.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleLarge,
                color = Color.White,
                fontWeight = FontWeight.Bold
            )
            Text(
                text = "$itemCount item${if (itemCount != 1) "s" else ""} saved",
                style = MaterialTheme.typography.bodySmall,
                color = NightMuted
            )
        }
    }
}

@Composable
private fun FavoriteItemCard(
    favorite: FavoriteLesson,
    onRemove: () -> Unit,
    onClick: () -> Unit
) {
    val dateFormat = remember { SimpleDateFormat("MMM dd, yyyy", Locale.getDefault()) }
    val savedDate = remember(favorite.savedAt) {
        dateFormat.format(Date(favorite.savedAt))
    }
    
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        colors = CardDefaults.cardColors(containerColor = Color.White.copy(alpha = 0.05f)),
        shape = RoundedCornerShape(16.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(CircleShape)
                    .background(Color(0xFF6366F1).copy(alpha = 0.2f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Rounded.Bookmark,
                    contentDescription = null,
                    tint = Color(0xFF6366F1),
                    modifier = Modifier.size(24.dp)
                )
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = favorite.title,
                    style = MaterialTheme.typography.titleMedium,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = favorite.subtitle,
                    style = MaterialTheme.typography.bodySmall,
                    color = NightMuted,
                    maxLines = 2
                )
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Saved on $savedDate",
                    style = MaterialTheme.typography.labelSmall,
                    color = NightMuted.copy(alpha = 0.7f)
                )
            }
            
            Spacer(modifier = Modifier.width(12.dp))
            
            IconButton(
                onClick = onRemove,
                modifier = Modifier.size(40.dp)
            ) {
                Icon(
                    imageVector = Icons.Rounded.Delete,
                    contentDescription = "Remove from saved",
                    tint = Color(0xFFEF4444)
                )
            }
        }
    }
}

@Composable
private fun EmptyFavoritesState() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape)
                    .background(Color.White.copy(alpha = 0.05f)),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Rounded.BookmarkBorder,
                    contentDescription = null,
                    tint = NightMuted,
                    modifier = Modifier.size(40.dp)
                )
            }
            Text(
                text = "No saved items yet",
                style = MaterialTheme.typography.titleMedium,
                color = Color.White,
                fontWeight = FontWeight.SemiBold
            )
            Text(
                text = "Bookmark lessons to save them here",
                style = MaterialTheme.typography.bodyMedium,
                color = NightMuted
            )
        }
    }
}
