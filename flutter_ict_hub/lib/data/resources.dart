import '../models/resource.dart';

const String dbIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>';
const String softwareIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>';
const String hardwareIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.125C8.25 5.004 9.004 5.25 9.75 5.25h4.5c.746 0 1.5-.246 1.5-1.125V3M3.75 7.5h16.5v12a2.25 2.25 0 01-2.25 2.25h-12A2.25 2.25 0 015.25 19.5v-12z" /></svg>';
const String processingIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" /></svg>';
const String examIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
const String htmlIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>';
const String algorithmIcon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>';

final List<Resource> resourcesData = [
  Resource(
    href: '/sql',
    tags: 'Database,SQL',
    icon: dbIcon,
    title: 'SQL Database Guide',
    description: 'Interactive SQL tutorial with live query editor and practical examples.',
    linkText: 'Start Learning',
  ),
  Resource(
    href: '/software',
    tags: 'Software,Theory',
    icon: softwareIcon,
    title: 'Software Engineering',
    description: 'Comprehensive guide to software development methodologies and best practices.',
    linkText: 'Explore Concepts',
  ),
  Resource(
    href: '/hardware',
    tags: 'Hardware,Theory',
    icon: hardwareIcon,
    title: 'Computer Hardware',
    description: 'Essential guide to computer components, architecture, and how they work together.',
    linkText: 'Learn Hardware',
  ),
  Resource(
    href: '/processing-modes',
    tags: 'Theory,Processing',
    icon: processingIcon,
    title: 'Data Processing Modes',
    description: 'Learn about batch, online, distributed, and parallel processing methods.',
    linkText: 'Explore Modes',
  ),
  Resource(
    href: '/dse',
    tags: 'Exam,Practice',
    icon: examIcon,
    title: 'DSE ICT Exam Prep',
    description: 'Practice questions, study tips, and comprehensive exam preparation resources.',
    linkText: 'Start Practice',
  ),
  Resource(
    href: '/html-learning',
    tags: 'Web,HTML,Interactive',
    icon: htmlIcon,
    title: 'HTML Learning Tool',
    description: 'Interactive HTML editor with live preview and comprehensive web development guide.',
    linkText: 'Try Editor',
  ),
  Resource(
    href: 's4python.html',
    tags: 'Algorithms,Visualization',
    icon: algorithmIcon,
    title: 'Python Algorithm Visualizer',
    description: 'Interactive visualizations of searching and sorting algorithms with step-by-step explanations.',
    linkText: 'Explore Visualization',
  ),
  Resource(
    href: 'javascript.html',
    tags: 'JavaScript,Visualization',
    icon: algorithmIcon,
    title: 'JavaScript Interactive Course',
    description: 'Step-by-step interactive JS lessons with built-in code editor.',
    linkText: 'Start Learning',
    progressKey: 'learnjs_current_lesson_v1',
    totalLessons: 10,
  ),
];

final List<String> allTags = [
  'all',
  'Database',
  'SQL',
  'Software',
  'Theory',
  'Hardware',
  'Processing',
  'Exam',
  'Practice',
  'Web',
  'HTML',
  'Interactive',
  'Algorithms',
  'Visualization',
  'JavaScript',
];
