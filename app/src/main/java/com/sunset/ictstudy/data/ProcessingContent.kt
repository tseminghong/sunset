package com.sunset.ictstudy.data

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.rounded.DataUsage
import androidx.compose.material.icons.rounded.Hub
import androidx.compose.material.icons.rounded.SettingsEthernet
import androidx.compose.material.icons.rounded.Storage
import androidx.compose.material.icons.rounded.Timelapse
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector

/** Data model describing a processing mode card. */
data class ProcessingMode(
    val id: String,
    val title: String,
    val description: String,
    val progressPercent: Int,
    val isCompleted: Boolean,
    val accent: Color,
    val icon: ImageVector,
    val detail: ProcessingModeDetail
)

enum class DetailTone { Positive, Caution, Neutral }

data class InfoItem(
    val title: String,
    val description: String,
    val tone: DetailTone = DetailTone.Neutral
)

data class ProcessingModeDetail(
    val summary: String,
    val definition: String,
    val keyCharacteristics: List<String> = emptyList(),
    val types: List<InfoItem> = emptyList(),
    val advantages: List<InfoItem> = emptyList(),
    val challenges: List<InfoItem> = emptyList(),
    val commonApplications: List<String> = emptyList(),
    val examples: List<String> = emptyList()
)

object ProcessingModesRepository {
    val processingModes: List<ProcessingMode> = listOf(
        ProcessingMode(
            id = "batch",
            title = "Batch Processing",
            description = "Processing large volumes of data offline in groups or batches.",
            progressPercent = 75,
            isCompleted = false,
            accent = Color(0xFF5E7BFF),
            icon = Icons.Rounded.Storage,
            detail = ProcessingModeDetail(
                summary = "Great for repetitive, high-volume jobs that can wait until off-peak hours like overnight runs.",
                definition = "Batch processing runs high-volume, repetitive data jobs together as a group. Tasks are queued and executed without further user interaction, usually when compute resources are underutilized.",
                keyCharacteristics = listOf(
                    "Non-interactive once the batch starts",
                    "Works best for repetitive, scheduled operations",
                    "Optimized for very high data volumes",
                    "Uses off-peak compute capacity"
                ),
                commonApplications = listOf(
                    "Payroll systems that calculate salaries at the end of each pay period",
                    "Billing systems that generate thousands of invoices overnight",
                    "Data warehousing ETL jobs that consolidate daily sales data",
                    "Weather forecasting models that crunch atmospheric readings"
                ),
                advantages = listOf(
                    InfoItem("Efficiency", "Handles huge data workloads with minimal supervision.", DetailTone.Positive),
                    InfoItem("Cost Saving", "Runs when infrastructure is cheaper or idle.", DetailTone.Positive),
                    InfoItem("Simplicity", "Straightforward to schedule and monitor compared to complex real-time systems.", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Processing Delay", "Results arrive after the batch finishes, so it is not fit for urgent data.", DetailTone.Caution),
                    InfoItem("Debug Difficulty", "Failures can be hard to trace because so much work is bundled together.", DetailTone.Caution),
                    InfoItem("Resource Usage", "Long-running jobs can monopolize compute resources.", DetailTone.Caution)
                ),
                examples = listOf(
                    "Banks run nightly settlement batches to reconcile the day’s transactions.",
                    "Universities generate semester grade reports over the weekend.",
                    "Retailers refresh inventory dashboards once the daily sales batch completes."
                )
            )
        ),
        ProcessingMode(
            id = "online",
            title = "Online Processing",
            description = "Processing data transactions immediately as they occur.",
            progressPercent = 100,
            isCompleted = true,
            accent = Color(0xFF2BD9DF),
            icon = Icons.Rounded.DataUsage,
            detail = ProcessingModeDetail(
                summary = "Ideal for interactive systems that confirm actions instantly, like banking apps or ticketing platforms.",
                definition = "Online processing handles each transaction the moment data is entered. Users receive instant feedback, unlike batch systems where requests are queued for later.",
                keyCharacteristics = listOf(
                    "Real-time or near real-time response",
                    "Requires active user interaction",
                    "Immediate validation and confirmation for every transaction"
                ),
                commonApplications = listOf(
                    "ATM withdrawals and balance checks",
                    "E-commerce carts, checkout, and payment authorization",
                    "Airline or event ticket reservations",
                    "Bank transfers with instant confirmation"
                ),
                types = listOf(
                    InfoItem("Real-Time Processing", "Strict timing guarantees; used in industrial or safety systems."),
                    InfoItem("Near Real-Time", "Small acceptable delay for analytics or fraud detection."),
                    InfoItem("Interactive Processing", "Continuous dialogue between the user and the system, e.g., online forms." )
                ),
                advantages = listOf(
                    InfoItem("Customer Experience", "Users trust systems that respond immediately.", DetailTone.Positive),
                    InfoItem("Data Freshness", "Databases always reflect the latest information.", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Infrastructure Cost", "Requires resilient networks and servers to stay online 24/7.", DetailTone.Caution),
                    InfoItem("Complexity", "Needs locking, concurrency control, and graceful failure handling.", DetailTone.Caution)
                ),
                examples = listOf(
                    "Ride-hailing apps confirm driver assignments instantly.",
                    "Stock-trading platforms execute orders and update holdings in real time." 
                )
            )
        ),
        ProcessingMode(
            id = "realtime",
            title = "Real-Time Processing",
            description = "Continuous and immediate processing with instant output.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFFFFB347),
            icon = Icons.Rounded.Timelapse,
            detail = ProcessingModeDetail(
                summary = "Used when every millisecond counts—think medical monitors, air-traffic control, or industrial automation.",
                definition = "Real-time processing guarantees that inputs are captured, processed, and responded to within a tightly bounded timeframe. Missing the deadline can cause safety or financial risks.",
                keyCharacteristics = listOf(
                    "Deterministic response time",
                    "Often uses specialized real-time operating systems",
                    "Requires prioritized scheduling of critical tasks"
                ),
                commonApplications = listOf(
                    "Heart-rate monitoring equipment",
                    "Autonomous vehicle control loops",
                    "Air-traffic management and radar tracking",
                    "High-frequency trading algorithms"
                ),
                advantages = listOf(
                    InfoItem("Safety", "Keeps humans and machines safe by reacting immediately.", DetailTone.Positive),
                    InfoItem("Precision", "Maintains tight control over physical processes.", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Engineering Cost", "Requires carefully tuned hardware and software.", DetailTone.Caution),
                    InfoItem("Testing Difficulty", "Every code path must be validated against timing deadlines.", DetailTone.Caution)
                ),
                examples = listOf(
                    "Industrial robots stop instantly if sensors detect an obstacle.",
                    "Smart grids adjust power delivery every few milliseconds."
                )
            )
        ),
        ProcessingMode(
            id = "distributed",
            title = "Distributed Processing",
            description = "Tasks are split and run on multiple computers in a network.",
            progressPercent = 35,
            isCompleted = false,
            accent = Color(0xFF8A5EFF),
            icon = Icons.Rounded.Hub,
            detail = ProcessingModeDetail(
                summary = "A collaborative model where many interconnected computers share the workload for improved scale and resilience.",
                definition = "Distributed processing breaks a large problem into subtasks that run across multiple networked machines. Each node works on a piece of the job and exchanges results with the rest of the system.",
                types = listOf(
                    InfoItem("Client-Server", "Clients request services from a powerful central server."),
                    InfoItem("Peer-to-Peer", "All peers act as both client and server with equal capability."),
                    InfoItem("Grid Computing", "Loosely coupled computers join for very large computational tasks."),
                    InfoItem("Cloud Computing", "Elastic cloud services deliver compute, storage, and networking over the internet.")
                ),
                advantages = listOf(
                    InfoItem("Scalability", "Add more machines to handle more work.", DetailTone.Positive),
                    InfoItem("Reliability", "If one node fails, others keep the system alive.", DetailTone.Positive),
                    InfoItem("Performance", "Different parts of the job run in parallel.", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Complexity", "Coordinating state and communication across nodes is difficult.", DetailTone.Caution),
                    InfoItem("Security", "Data moves across many machines and must stay protected.", DetailTone.Caution),
                    InfoItem("Synchronization", "Nodes need a consistent view of shared data.", DetailTone.Caution)
                ),
                examples = listOf(
                    "The global internet, the world’s largest distributed system.",
                    "Blockchain networks such as Bitcoin and Ethereum.",
                    "Scientific projects like SETI@home that borrow compute cycles from volunteers."
                )
            )
        ),
        ProcessingMode(
            id = "parallel",
            title = "Parallel Processing",
            description = "Executing multiple tasks simultaneously on a single system.",
            progressPercent = 0,
            isCompleted = false,
            accent = Color(0xFF49D7C0),
            icon = Icons.Rounded.SettingsEthernet,
            detail = ProcessingModeDetail(
                summary = "Multiple CPU cores or GPUs collaborate inside one machine to crunch data faster.",
                definition = "Parallel processing splits a program into smaller sub-tasks that execute concurrently on separate processors sharing memory or interconnects.",
                keyCharacteristics = listOf(
                    "Requires algorithms that can be divided into independent chunks",
                    "Benefits from high-throughput shared memory or interconnects",
                    "Often relies on SIMD, multi-threading, or GPU kernels"
                ),
                advantages = listOf(
                    InfoItem("Speed", "Large jobs finish far faster than on a single core.", DetailTone.Positive),
                    InfoItem("Hardware Utilization", "Keeps modern multi-core chips busy.", DetailTone.Positive)
                ),
                challenges = listOf(
                    InfoItem("Data Dependency", "Some problems cannot be decomposed easily.", DetailTone.Caution),
                    InfoItem("Synchronization Overhead", "Threads must coordinate access to shared data.", DetailTone.Caution)
                ),
                examples = listOf(
                    "Rendering movie frames on GPU clusters.",
                    "Training neural networks using hundreds of GPU cores.",
                    "Scientific simulations like weather or molecular modeling."
                )
            )
        )
    )

    fun getMode(id: String): ProcessingMode? = processingModes.firstOrNull { it.id == id }
}
