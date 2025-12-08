package com.sunset.ictstudy.ui.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
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
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

enum class BottomNavItem(
    val route: String,
    val icon: ImageVector,
    val label: String
) {
    HOME("home", Icons.Default.Home, "Home"),
    COURSE("course", Icons.Default.Book, "Course"),
    GAME("game", Icons.Default.SportsEsports, "Game"),
    ME("me", Icons.Default.Person, "Me")
}

@Composable
fun BottomNavBar(
    currentRoute: String,
    onNavigate: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val items = BottomNavItem.values()
    val selectedIndex = items.indexOfFirst { it.route == currentRoute }.takeIf { it >= 0 } ?: 0

    Surface(
        modifier = modifier.fillMaxWidth(),
        color = MaterialTheme.colorScheme.surface,
        tonalElevation = 8.dp,
        shape = RoundedCornerShape(topStart = 24.dp, topEnd = 24.dp)
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(80.dp)
                .padding(horizontal = 16.dp, vertical = 12.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            items.forEachIndexed { index, item ->
                BottomNavBarItem(
                    item = item,
                    isSelected = index == selectedIndex,
                    onClick = { onNavigate(item.route) }
                )
            }
        }
    }
}

@Composable
fun BottomNavBarItem(
    item: BottomNavItem,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val backgroundColor by animateColorAsState(
        targetValue = if (isSelected) 
            MaterialTheme.colorScheme.primary 
        else 
            Color.Transparent,
        animationSpec = tween(300),
        label = "background_color"
    )
    
    val iconColor by animateColorAsState(
        targetValue = if (isSelected) 
            MaterialTheme.colorScheme.onPrimary 
        else 
            MaterialTheme.colorScheme.onSurfaceVariant,
        animationSpec = tween(300),
        label = "icon_color"
    )

    val elevation by animateDpAsState(
        targetValue = if (isSelected) 8.dp else 0.dp,
        animationSpec = tween(300),
        label = "elevation"
    )

    val offsetY by animateDpAsState(
        targetValue = if (isSelected) (-16).dp else 0.dp,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessMedium
        ),
        label = "offset_y"
    )

    IconButton(
        onClick = onClick,
        modifier = modifier
            .offset(y = offsetY)
            .size(56.dp)
    ) {
        Box(
            modifier = Modifier
                .size(56.dp)
                .shadow(elevation, CircleShape)
                .clip(CircleShape)
                .background(backgroundColor),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = item.icon,
                contentDescription = item.label,
                tint = iconColor,
                modifier = Modifier.size(24.dp)
            )
        }
    }
}
