import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        resources: "Resources",
        login: "Login"
      },
      // Hero Section
      hero: {
        title: "In Memory of the Tai Po Fire",
        subtitle: "We mourn the lives lost in the Hong Kong Tai Po fire and choose to keep learning with compassion and resilience.",
        beta: "Please keep the victims, survivors, and their families in your thoughts.",
        download: "Support & Learn Together"
      },
      // Common UI
      common: {
        loading: "Loading...",
        error: "Error",
        retry: "Retry",
        cancel: "Cancel",
        save: "Save",
        next: "Next",
        previous: "Previous",
        close: "Close",
        search: "Search",
        filter: "Filter",
        reset: "Reset",
        submit: "Submit",
        continue: "Continue",
        back: "Back",
        progress: "Progress"
      },
      // About Page
      about: {
        title: "About",
        heroTitle: "Empowering ICT Education",
        heroSubtitle: "Comprehensive learning platform designed to help students excel in Information and Communication Technology",
        whatIOffer: "What I Offer",
        features: {
          educational: {
            title: "Educational Excellence",
            description: "Comprehensive ICT curriculum designed for DSE preparation and beyond."
          },
          interactive: {
            title: "Interactive Learning",
            description: "Hands-on practice with real-time feedback and interactive exercises."
          },
          focused: {
            title: "Focused Content",
            description: "Targeted resources covering all essential ICT topics and concepts."
          },
          results: {
            title: "Proven Results",
            description: "Track record of helping students excel in ICT examinations."
          }
        },
        team: {
          title: "Meet the Team",
          developer: {
            name: "Only Me",
            role: "Your Humble Developer",
            description: "Passionate about education technology and helping students succeed in ICT."
          }
        }
      },
      // DSE Page
      dse: {
        title: "DSE ICT",
        overview: "DSE ICT Overview",
        practice: "Practice Questions",
        preparation: "Exam Preparation",
        syllabus: "Syllabus Coverage",
        examFormat: "Exam Format",
        papers: "2 Papers",
        papersDesc: "Compulsory + Elective",
        sbaWeight: "20%",
        sbaDesc: "SBA weighting",
        level4: "Level 4",
        level4Desc: "University entry requirement",
        topics: {
          systems: "Systems & Architecture",
          software: "Software Development", 
          database: "Database Systems",
          networks: "Networks & Internet",
          security: "Information Security",
          multimedia: "Multimedia Systems"
        }
      },
      // Authentication
      auth: {
        username: "Username",
        password: "Password",
        confirmPassword: "Confirm Password",
        signin: "Sign In",
        signup: "Sign Up",
        logout: "Logout",
        welcome: "Welcome back!",
        createAccount: "Create your account",
        forgotPassword: "Forgot Password?",
        alreadyHaveAccount: "Already have an account?",
        dontHaveAccount: "Don't have an account?",
        signInHere: "Sign in here",
        signUpHere: "Sign up here"
      },
      // Learning Pages
      learning: {
        lessonsCompleted: "lessons completed",
        currentLesson: "Current Lesson",
        nextLesson: "Next Lesson",
        previousLesson: "Previous Lesson",
        startLearning: "Start Learning",
        tryCode: "Try the Code",
        runCode: "Run Code",
        resetCode: "Reset Code"
      },
      // Content Pages
      content: {
        examStructure: "Exam Structure",
        studyTips: "Study Tips",
        commonTopics: "Common Topics to Focus On",
        examFormat: "Exam Format",
        timeAllocation: "Time Allocation",
        practiceQuestions: "Practice Questions",
        selectTopic: "Select a topic to practice",
        checkAnswer: "Check Answer",
        nextQuestion: "Next Question",
        score: "Score",
        correct: "Correct",
        incorrect: "Incorrect"
      }
    }
  },
  zh: {
    translation: {
      // Navigation
      nav: {
        home: "首頁",
        about: "關於",
        resources: "資源",
        login: "登入"
      },
      // Hero Section  
      hero: {
        title: "悼念大埔火災罹難者",
        subtitle: "我們哀悼在香港大埔火災中逝去的生命，願以溫柔與堅毅繼續學習。",
        beta: "請將罹難者、傷者與家人放在心中。",
        download: "一起支持與學習"
      },
      // Common UI
      common: {
        loading: "載入中...",
        error: "錯誤",
        retry: "重試",
        cancel: "取消",
        save: "儲存",
        next: "下一步",
        previous: "上一步",
        close: "關閉",
        search: "搜尋",
        filter: "篩選",
        reset: "重設",
        submit: "提交",
        continue: "繼續",
        back: "返回",
        progress: "進度",
        example: "範例",
        preview: "預覽",
        edit: "編輯",
        copy: "複製",
        copied: "已複製"
      },
      // About Page
      about: {
        title: "關於",
        heroTitle: "賦能 ICT 教育",
        heroSubtitle: "全面的學習平台，專為幫助學生在資訊與通訊技術方面取得優異成績而設計",
        whatIOffer: "我提供的服務",
        features: {
          educational: {
            title: "教育卓越",
            description: "為 DSE 準備及更多內容而設計的全面 ICT 課程。"
          },
          interactive: {
            title: "互動學習",
            description: "透過即時回饋和互動練習進行實踐操作。"
          },
          focused: {
            title: "專注內容",
            description: "涵蓋所有基本 ICT 主題和概念的針對性資源。"
          },
          results: {
            title: "驗證成果",
            description: "幫助學生在 ICT 考試中取得優異成績的成功記錄。"
          }
        },
        team: {
          title: "認識團隊",
          developer: {
            name: "只有我",
            role: "您謙遜的開發者",
            description: "熱愛教育技術，致力於幫助學生在 ICT 方面取得成功。"
          }
        }
      },
      // DSE Page
      dse: {
        title: "DSE ICT",
        overview: "DSE ICT 概覽",
        practice: "練習題",
        preparation: "考試準備",
        syllabus: "課程覆蓋",
        examFormat: "考試形式",
        papers: "2 張試卷",
        papersDesc: "必修 + 選修",
        sbaWeight: "20%",
        sbaDesc: "SBA 權重",
        level4: "等級 4",
        level4Desc: "大學入學要求",
        topics: {
          systems: "系統與架構",
          software: "軟件開發",
          database: "Database 系統",
          networks: "網絡與 Internet",
          security: "資訊安全",
          multimedia: "多媒體系統"
        }
      },
      // Authentication
      auth: {
        username: "用戶名",
        password: "密碼",
        confirmPassword: "確認密碼",
        signin: "登入",
        signup: "註冊",
        logout: "登出",
        welcome: "歡迎回來！",
        createAccount: "創建您的帳戶",
        forgotPassword: "忘記密碼？",
        alreadyHaveAccount: "已有帳戶？",
        dontHaveAccount: "沒有帳戶？",
        signInHere: "在此登入",
        signUpHere: "在此註冊"
      },
      // Learning Pages
      learning: {
        lessonsCompleted: "課程已完成",
        currentLesson: "當前課程",
        nextLesson: "下一課程",
        previousLesson: "上一課程",
        startLearning: "開始學習",
        tryCode: "試試 Code",
        runCode: "運行 Code",
        resetCode: "重設 Code"
      },
      // Content Pages
      content: {
        examStructure: "考試結構",
        studyTips: "學習技巧",
        commonTopics: "重點關注話題",
        examFormat: "考試形式",
        timeAllocation: "時間分配",
        practiceQuestions: "練習題",
        selectTopic: "選擇練習話題",
        checkAnswer: "檢查答案",
        nextQuestion: "下一題",
        score: "分數",
        correct: "正確",
        incorrect: "錯誤"
      },
      // Course Pages
      courses: {
        html: {
          title: "HTML 學習",
          subtitle: "學習網頁標記語言的基礎知識",
          description: "HTML (HyperText Markup Language) 是創建網頁的標準標記語言。",
          basics: "HTML 基礎",
          structure: "HTML 結構",
          elements: "HTML 元素",
          attributes: "HTML 屬性",
          forms: "HTML 表單",
          multimedia: "多媒體元素",
          semantics: "語義化 HTML",
          accessibility: "可存取性",
          keypoints: {
            elements: "元素：HTML 的構建塊",
            tags: "標籤：定義元素的標記",
            attributes: "屬性：為元素提供額外資訊",
            nesting: "嵌套：元素可以包含其他元素",
            semantic: "語義化：使用有意義的標籤"
          },
          liveEditor: "即時編輯器",
          quickActions: "快速操作",
          addHeading: "新增標題",
          createLink: "建立連結",
          insertImage: "插入圖片",
          makeList: "建立清單",
          addButton: "新增按鈕",
          createTable: "建立表格"
        },
        javascript: {
          title: "JavaScript 學習",
          subtitle: "掌握網頁程式設計的核心語言",
          description: "JavaScript 是一種高階、直譯式程式語言，為網頁增加互動性。",
          basics: "JavaScript 基礎",
          variables: "變數和資料類型",
          functions: "函數",
          objects: "物件",
          arrays: "陣列",
          events: "事件處理",
          dom: "DOM 操作",
          async: "非同步程式設計",
          navigation: "課程導覽",
          interactive: "互動式學習",
          codeEditor: "程式碼編輯器"
        },
        python: {
          title: "Python 演算法",
          subtitle: "透過視覺化學習演算法",
          description: "探索排序和搜尋演算法的互動式視覺化。",
          algorithms: "演算法",
          sorting: "排序演算法",
          searching: "搜尋演算法",
          visualization: "視覺化",
          stepByStep: "逐步執行",
          runAlgorithm: "執行演算法",
          bubbleSort: "氣泡排序",
          selectionSort: "選擇排序",
          insertionSort: "插入排序",
          mergeSort: "合併排序",
          quickSort: "快速排序",
          linearSearch: "線性搜尋",
          binarySearch: "二元搜尋",
          generateArray: "產生陣列",
          arraySize: "陣列大小",
          speed: "執行速度"
        },
        sql: {
          title: "SQL 學習",
          subtitle: "掌握資料庫查詢語言",
          description: "SQL (Structured Query Language) 是管理關聯式資料庫的標準語言。",
          basics: "SQL 基礎",
          queries: "查詢語句",
          joins: "表格連接",
          functions: "函數",
          advanced: "進階 SQL",
          practice: "實作練習",
          select: "SELECT 查詢",
          insert: "INSERT 新增",
          update: "UPDATE 更新",
          delete: "DELETE 刪除",
          where: "WHERE 條件",
          orderBy: "ORDER BY 排序",
          groupBy: "GROUP BY 分組",
          having: "HAVING 條件"
        },
        hardware: {
          title: "電腦硬體",
          subtitle: "了解電腦系統的物理組件",
          description: "學習電腦硬體組件及其功能。",
          components: "硬體組件",
          cpu: "中央處理器 (CPU)",
          memory: "記憶體",
          storage: "儲存裝置",
          motherboard: "主機板",
          inputOutput: "輸入/輸出裝置",
          performance: "效能考量"
        },
        software: {
          title: "電腦軟體",
          subtitle: "探索軟體開發和系統",
          description: "了解軟體類型、開發流程和系統管理。",
          types: "軟體類型",
          development: "軟體開發",
          lifecycle: "開發生命週期",
          testing: "軟體測試",
          maintenance: "維護"
        },
        processing: {
          title: "處理模式",
          subtitle: "了解不同的資料處理方法",
          description: "探索批次處理、即時處理和分散式處理。",
          batch: "批次處理",
          realTime: "即時處理",
          interactive: "互動式處理",
          distributed: "分散式處理",
          comparison: "模式比較"
        }
      }
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  })

export default i18n