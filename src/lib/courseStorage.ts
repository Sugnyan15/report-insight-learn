export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  students?: number;
  duration: string;
  progress?: number;
  rating?: number;
  category: string;
  level: string;
  tags?: string[];
  thumbnail?: string;
  createdAt?: string;
  updatedAt?: string;
}

const STORAGE_KEY = 'courses_db';

// Initialize with default courses if storage is empty
const defaultCourses: Course[] = [
  {
    id: 1,
    title: 'Annual Report Analysis 2024',
    description: 'Comprehensive analysis of institutional performance metrics and financial data',
    instructor: 'Dr. Sarah Johnson',
    students: 156,
    duration: '8 weeks',
    progress: 75,
    rating: 4.8,
    category: 'Analytics',
    level: 'Intermediate',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Data Visualization for Reports',
    description: 'Learn to create compelling visual representations of institutional data',
    instructor: 'Prof. Michael Chen',
    students: 89,
    duration: '6 weeks',
    progress: 45,
    rating: 4.9,
    category: 'Visualization',
    level: 'Beginner',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Strategic Planning with Analytics',
    description: 'Using annual report insights for institutional strategic planning',
    instructor: 'Dr. Emily Rodriguez',
    students: 67,
    duration: '10 weeks',
    progress: 30,
    rating: 4.7,
    category: 'Strategy',
    level: 'Advanced',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Financial Performance Metrics',
    description: 'Deep dive into financial analysis and performance indicators',
    instructor: 'Prof. David Wilson',
    students: 124,
    duration: '12 weeks',
    progress: 60,
    rating: 4.6,
    category: 'Finance',
    level: 'Advanced',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Get all courses from localStorage
export const getCourses = (): Course[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Initialize with default courses
      setCourses(defaultCourses);
      return defaultCourses;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading courses from localStorage:', error);
    return defaultCourses;
  }
};

// Save all courses to localStorage
export const setCourses = (courses: Course[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  } catch (error) {
    console.error('Error saving courses to localStorage:', error);
  }
};

// Get a single course by ID
export const getCourseById = (id: number): Course | null => {
  const courses = getCourses();
  return courses.find(course => course.id === id) || null;
};

// Add a new course
export const addCourse = (courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
  const courses = getCourses();
  const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
  const newCourse: Course = {
    ...courseData,
    id: newId,
    students: courseData.students || 0,
    progress: courseData.progress || 0,
    rating: courseData.rating || 0,
    tags: courseData.tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  courses.push(newCourse);
  setCourses(courses);
  return newCourse;
};

// Update an existing course
export const updateCourse = (id: number, courseData: Partial<Course>): Course | null => {
  const courses = getCourses();
  const index = courses.findIndex(course => course.id === id);
  if (index === -1) {
    return null;
  }
  courses[index] = {
    ...courses[index],
    ...courseData,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  };
  setCourses(courses);
  return courses[index];
};

// Delete a course
export const deleteCourse = (id: number): boolean => {
  const courses = getCourses();
  const filtered = courses.filter(course => course.id !== id);
  if (filtered.length === courses.length) {
    return false; // Course not found
  }
  setCourses(filtered);
  return true;
};

